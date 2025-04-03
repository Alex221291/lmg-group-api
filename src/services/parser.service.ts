import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { ParserDto } from 'src/dto/parser/parser.dto';
import { GroupParserDto } from 'src/dto/parser/group-parser.dto';
import { PrismaService } from './prisma.service';
import { ApiError } from 'src/engine/api-error';
import { $Enums } from '@prisma/client';
import fetch from 'node-fetch';
import { FileService } from './file.service';
import { contains } from 'class-validator';

@Injectable()
export class ParserService {

  constructor(private prisma: PrismaService, private fileService: FileService) {}

  async parser(fileInfo?: {path?: string, name?: string, type?: string}): Promise<any> {
    // parser
    const { headers, data } = await this.parserFile(fileInfo?.path);
    //valid
    const validationErrors = await this.validateData(headers, data);
    if (validationErrors.length > 0) {
      await this.fileService.deleteFile(fileInfo?.path);
      throw new ApiError({errors: validationErrors});
    }

    const groupData = await this.transformData(headers, data);
    
    let updatedCount = 0;
    let addedCount = 0;
    const processedBuildIds: Set<string> = new Set();
    //create/update
    for (const item of groupData) {
      const { section, category, area, build } = item;

      const existingData = await this.findAndUpsert(section, category, area, build, item);

      if (existingData.buildId) {
        await this.updateBuild(existingData.buildId, item);
        updatedCount++;
        processedBuildIds.add(existingData.buildId);
      } else {
        const createdBuild = await this.createBuild(existingData.categoryAreaId, item);
        addedCount++;
        processedBuildIds.add(createdBuild.id);
      }
    }
    
    //const archivedCount = await this.archiveOldBuilds(processedBuildIds);

    // Получение текущей даты в формате ddmmyyyy
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getFullYear()}`;

    // Путь к файлу с датой
    const destinationPath = `./uploads/current-LMG-${formattedDate}.xlsx`;

    // Удаление старых файлов
    await this.deleteOldFiles('./uploads', /^current-LMG-\d{8}\.xlsx$/);

    // Переименование и сохранение файла
    await this.renameAndSaveFile(fileInfo?.path, destinationPath);

    return {message: `Данные успешно загружены\nДобавлено: ${addedCount}\n Обновлено: ${updatedCount}`}; //\n Архив: ${archivedCount}
  }

  async parserFile(filePath: string): Promise<any> {
    const fileBuffer = fs.readFileSync(filePath); // Читаем файл как буфер
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const worksheet = workbook.Sheets['Юниты'];
  
    if (!worksheet) {
      throw new ApiError({ error: 'Лист "Юниты" не найден в файле.' });
    }
  
    // Парсим данные, включая заголовки
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });
  
    if (jsonData.length <= 1) {
      throw new ApiError({ error: 'Лист "Юниты" пустой.' });
    }
  
    // Первая строка будет заголовками
    const headers = jsonData[0];
  
    const columnNames = [
      "section",
      "category",
      "area",
      "build",
      "street",
      "house",
      "lat",
      "lon",
      "buildAreaCoordinates",
      "wDescription",
      "advertisingType",
      "itemCount",
      "audienceReach",
      "gPictureLink",
      "gTitle",
      "gDescription",
      "iconLink",
      "seoTitle",
      "seoDescription",
    ];
  
    // Пропускаем первую строку с заголовками
    const parsedData = jsonData.slice(1).map((row: any[]) => {
      const parsedRow: any = {};
      row.forEach((cell, index) => {
        parsedRow[columnNames[index]] = cell !== null ? String(cell).trim().replace(/\s+/g, ' ') : cell;
      });
  
      // Преобразование buildAreaCoordinates к формату [number, number][]
      if (parsedRow.buildAreaCoordinates && parsedRow.buildAreaCoordinates.length > 0) {
        parsedRow.buildAreaCoordinates = parsedRow.buildAreaCoordinates.split('][')
          .map((coord: string) => {
            const [lat, lon] = coord.replace(/[\[\]]/g, '').split(';').map(Number);
            return [lat, lon];
          });
      }
  
      // Фильтрация: если все значения в parsedRow равны null или пустые строки, то исключаем эту запись
      const hasValidData = Object.values(parsedRow).some(value => value !== null && value !== '');
  
      return hasValidData ? parsedRow : null; // Возвращаем только непустые строки
    }).filter(row => row !== null); // Убираем все null записи
  
    return {
      headers,
      data: parsedData
    };
  }  

  async validateData(headers: any, data: any[]): Promise<string[]> {
    const errors: string[] = [];
    
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const { section, category, area, build, gPictureLink, iconLink, buildAreaCoordinates } = row;

      if (!build) {
        errors.push(`Строка ${i + 2}: Не заполнено название'.`);
      }

      // Проверка URL
      if (gPictureLink != null && gPictureLink.length < 1 && !await this.isValidUrl(gPictureLink)) {
        errors.push(`Строка ${i + 2}: некорректный URL '${gPictureLink}'.`);
      }
      if (iconLink != null && iconLink.length < 1 && !await this.isValidUrl(iconLink)) {
        errors.push(`Строка ${i + 2}: некорректный URL '${iconLink}'.`);
      }

      // Проверка цепочек
      const sectionRecord = await this.prisma.section.findFirst({ where: { title: section } });
      if (!sectionRecord) {
        errors.push(`Строка ${i + 2}: Раздел '${section}' не найден.`);
        continue;
      }

      const categoryRecord = await this.prisma.category.findFirst({ where: { title: category, sectionId: sectionRecord.id } });
      if (!categoryRecord) {
        errors.push(`Строка ${i + 2}: Категория '${category}' не найдена.`);
        continue;
      }

      const areaRecord = await this.prisma.area.findFirst({ where: { name: area } });
      if (!areaRecord) {
        errors.push(`Строка ${i + 2}: Район '${area}' не найден.`);
        continue;
      }

      const categoryAreaRecord = await this.prisma.categoryArea.findFirst({ where: { categoryId: categoryRecord.id, areaId: areaRecord.id } });
      if (!categoryAreaRecord) {
        errors.push(`Строка ${i + 2}: В категории '${category}' не найден район '${area}'.`);
        continue;
      }

      //Проверка координат
      if (buildAreaCoordinates && buildAreaCoordinates.length > 0) {
        for (const coord of buildAreaCoordinates) {
          if (isNaN(coord[0]) || isNaN(coord[1])) {
            errors.push(`Строка ${i + 2}: Некорректно заполнены координаты '${buildAreaCoordinates}'.`);
          }
        }
      }
    }

    return errors;
  }

  async isValidUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      return response.ok;
    } catch {
      return false;
    }
  }

  async archiveOldBuilds(processedBuildIds: Set<string>): Promise<number> {
    const result = await this.prisma.build.updateMany({
      where: {
        id: { notIn: Array.from(processedBuildIds) }
      },
      data: {
        status: $Enums.ContentSatus.ARCHIVE
      }
    });
    return result.count;
  }

  async transformData(headers: any, data: any[]): Promise<GroupParserDto[]> {
    const result: GroupParserDto[] = [];
    const groupedData: { [key: string]: any } = {};

    data.forEach(row => {
      const key = `${row.section}-${row.category}-${row.area}-${row.build}`;
      
      if (!groupedData[key]) {
        groupedData[key] = {
          section: row.section,
          category: row.category,
          area: row.area,
          build: row.build,
          list: [],
          coordinates: []
        };
      }
      if (row.advertisingType && row.itemCount && row.audienceReach && groupedData[key].list.length < 3) {
        groupedData[key].list.push({ 
          title: headers[10],
          value: row?.advertisingType 
        });
      
        groupedData[key].list.push({ 
          title: headers[11],
          value: row?.itemCount ? Math.ceil(row.itemCount) : row?.itemCount  // Округляем itemCount
        });
      
        groupedData[key].list.push({ 
          title: headers[12],
          value: row?.audienceReach ? Math.ceil(row.audienceReach) : row?.audienceReach  // Округляем audienceReach
        });
      }      
      if(row.lat && row.lon)
        groupedData[key].coordinates.push([row.lat, row.lon]);

      // Заполняем дополнительные свойства из объекта, где они заполнены
      if (row.wDescription && row.advertisingType && row.itemCount && row.audienceReach) {
        groupedData[key].buildAreaCoordinates = row.buildAreaCoordinates;
        groupedData[key].wDescription = row.wDescription;
        groupedData[key].gPictureLink = row.gPictureLink;
        groupedData[key].gTitle = row.gTitle;
        groupedData[key].gDescription = row.gDescription;
        groupedData[key].iconLink = row.iconLink;
      }

      if (row.seoTitle && row.seoDescription) {
        groupedData[key].seoTitle = row.seoTitle;
        groupedData[key].seoDescription = row.seoDescription;
      }
    });

    // Преобразуем groupedData в массив
    for (const key in groupedData) {
      result.push(groupedData[key]);
    }

    return result;
  }

  async findAndUpsert(section: string, category: string, area: string, build: string, item: GroupParserDto): Promise<any> {
    // Найти раздел
    const sectionRecord = await this.prisma.section.findFirst({
      where: { title: section }
    });

    if (!sectionRecord) {
      return null; // Пропустить если не найдено
    }

    // Найти категорию
    const categoryRecord = await this.prisma.category.findFirst({
      where: { title: category, sectionId: sectionRecord.id }
    });

    if (!categoryRecord) {
      return null; // Пропустить если не найдено
    }

    if(item.iconLink){
      const iconPictureId = await this.downloadAndSaveImage(item.iconLink);
      
      await this.prisma.picture.deleteMany({
        where: {
          id: categoryRecord.iconPictureId || ''
        }
      });

      await this.prisma.category.update({
        where:{
          id: categoryRecord.id
        },
        data:{
          iconPictureId: iconPictureId,
        }
      });
    }

    // Найти область
    const areaRecord = await this.prisma.area.findFirst({
      where: { name: area }
    });

    if (!areaRecord) {
      return null; // Пропустить если не найдено
    }

    // Найти или создать CategoryArea
    let categoryAreaRecord = await this.prisma.categoryArea.findFirst({
      where: { categoryId: categoryRecord.id, areaId: areaRecord.id }
    });

    if (!categoryAreaRecord) {
      return null; // Пропустить если не найдено
    }

    // Найти или создать Build
    const buildRecord = await this.prisma.build.findFirst({
      where: { categoryAreaId: categoryAreaRecord.id, name: build }
    });
    return buildRecord
      ? { buildId: buildRecord.id, categoryAreaId: null }
      : { buildId: null, categoryAreaId: categoryAreaRecord.id };
  }

  async updateBuild(buildId: string, item: GroupParserDto): Promise<any> {

    const updateItem = await this.prisma.build.findFirst({where: {id: buildId }});
    await this.prisma.picture.deleteMany({
      where : {
        id: updateItem?.pictureId || ''
      }
    });

    await this.prisma.picture.deleteMany({
      where : {
        id: updateItem?.iconPictureId || ''
      }
    });

    const pictureId = await this.downloadAndSaveImage(item.gPictureLink);
    const iconPictureId = await this.downloadAndSaveImage(item.iconLink);

    return this.prisma.build.update({
      where: { id: buildId },
      data: {
        wDescription: item.wDescription,
        gTitle: item.gTitle,
        gSubTitle: item.gDescription,
        coordinates: item?.coordinates ? JSON.stringify(item.coordinates) : null,
        buildAreaCoordinates: item?.buildAreaCoordinates ? JSON.stringify(item.buildAreaCoordinates) : null,
        list: item?.list ? JSON.stringify(item.list) : null,
        pictureId: pictureId,
        iconPictureId: iconPictureId,
        status: $Enums.ContentSatus.PUBLISHED,
        seoTitle: item.seoTitle,
        seoDescription: item.seoDescription,
      }
    });
  }

  async createBuild(categoryAreaId: string, item: GroupParserDto): Promise<any> {

    const pictureId = await this.downloadAndSaveImage(item.gPictureLink);
    const iconPictureId = await this.downloadAndSaveImage(item.iconLink);

    return this.prisma.build.create({
      data: {
        categoryAreaId: categoryAreaId,
        name: item.build,
        wDescription: item.wDescription,
        gTitle: item.gTitle,
        gSubTitle: item.gDescription,
        coordinates: item?.coordinates ? JSON.stringify(item.coordinates) : null,
        buildAreaCoordinates: item?.buildAreaCoordinates ? JSON.stringify(item.buildAreaCoordinates) : null,
        list: item?.list ? JSON.stringify(item.list) : null,
        pictureId: pictureId,
        iconPictureId: iconPictureId,
        status: $Enums.ContentSatus.PUBLISHED,
        seoTitle: item.seoTitle,
        seoDescription: item.seoDescription,
      }
    });
  }

  async downloadAndSaveImage(url: string): Promise<string | null> {
    if (!url) return null;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        return null;
      }
      const buffer = await response.buffer();

      const savedPicture = await this.prisma.picture.create({
        data: {
          picture: buffer,
          name: url,
          type: response.headers.get('content-type') || 'image/png',
        },
      });
      return savedPicture.id;
    } catch (error) {
      console.error(`Failed to download or save image from URL: ${url}`, error);
      return null;
    }
  }

  async renameAndSaveFile(sourcePath: string, destinationPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.rename(sourcePath, destinationPath, (err) => {
        if (err) {
          reject(`Failed to save file: ${err.message}`);
        } else {
          console.log(`File saved as ${destinationPath}`);
          resolve();
        }
      });
    });
  }

  async deleteOldFiles(directory: string, pattern: RegExp): Promise<void> {
    const files = await fs.promises.readdir(directory);
    for (const file of files) {
      if (pattern.test(file)) {
        await fs.promises.unlink(`${directory}/${file}`);
        console.log(`Deleted old file: ${file}`);
      }
    }
  }
}
