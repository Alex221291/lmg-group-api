import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateCategoryAreaDto } from '../dto/category-area/create-category-area.dto';
import { UpdateCategoryAreaDto } from 'src/dto/category-area/update-category-area.dto';
import { UpdateCategoryAreaStatusDto } from 'src/dto/category-area/update-category-area-status.dto';
import { FileService } from './file.service';
import { createReadStream } from 'fs';
import { buildMessage } from 'class-validator';
import { GetCategoryAreaDto } from 'src/dto/category-area/get-category-area.dto';

@Injectable()
export class CategoryAreaService {
  constructor(private prisma: PrismaService,  
    private fileService: FileService) {}

  async findAllold(categoryId?: string): Promise<any> { //GetCategoryAreaDto[]
      let params: any = {
        include: {
          area: {},
          build: {
            select: {
              id: true,
              name: true,
              coordinates: true,
              list: true
            }
          }
        },
        orderBy: {
          createdAt: 'asc',
        }
      };
      if (categoryId) {
        params = { ...params, where: { categoryId } };
      }
      
      let result : any[] = await this.prisma.categoryArea.findMany(params);

      return result?.map(item => {
          // Группировка и суммирование значений list из build
          const parseList = item?.build?.list ? JSON.parse(item?.build?.list as unknown as string) : [];
          console.log(parseList);
          const groupedList = parseList?.reduce((acc, curr) => {
              if (!acc[curr.title]) {
                  acc[curr.title] = { title: curr.title, value: 0 };
              }
              acc[curr.title].value += parseFloat(curr.value) || 0;
              return acc;
          }, {});

          console.log(groupedList);
          const summedList = Object.values(groupedList);

          return {
              ...item,
              list: summedList
          };
      });
  }

    async findAll(categoryId?: string): Promise<GetCategoryAreaDto[]> {
      let params: any = {
          include: {
              area: {},
              build: {
                  select: {
                      id: true,
                      name: true,
                      coordinates: true,
                      list: true
                  }
              }
          },
          orderBy: {
              createdAt: 'asc',
          }
      };
      
      if (categoryId) {
          params = { ...params, where: { categoryId } };
      }

      let result : any[] = await this.prisma.categoryArea.findMany(params);

      return result?.map(item => {
          // Объединение и суммирование значений list из всех build
        const combinedList = item.build?.reduce((acc, buildItem) => {
          const parseList = buildItem?.list ? JSON.parse(buildItem?.list as unknown as string) : [];
          if(buildItem?.list) buildItem.list = parseList;
          if(buildItem?.coordinates) buildItem.coordinates = buildItem?.coordinates ? JSON.parse(buildItem?.coordinates as unknown as string) : [];
          if (parseList) {
            parseList?.forEach(curr => {
                  if (curr.title) {
                      if (!acc[curr.title]) {
                          acc[curr.title] = { title: curr.title, value: 0 };
                      }
                      acc[curr.title].value += parseFloat(curr.value) || 0;
                  }
              });
          }
          return acc;
        }, {});

          // Преобразование combinedList в массив
          const summedList = Object.values(combinedList);

          return {
              ...item,
              list: summedList
          };
      });
  }

  async findOne(id: string) {
    return await this.prisma.categoryArea.findUnique({ where: { id },
      include: {
        area: {},
      }, });
  }

  async create(fileInfo?: {path?: string, name?: string, type?: string}, data?: CreateCategoryAreaDto) {
    const picture = await this.addPicture(fileInfo);
    return await this.prisma.categoryArea.create({ data :{...data, pictureId: picture?.id || null }});
  }

  async update(fileInfo?: {path?: string, name?: string, type?: string}, data?: UpdateCategoryAreaDto) {
    const updateItem = await this.findOne(data?.id);

    const picture = await this.addPicture(fileInfo);
    
    await this.prisma.picture.deleteMany({
      where : {
        id: updateItem?.pictureId || ''
      }
    });
    return await this.prisma.categoryArea.update({ where: { id: data.id }, data:{
      ...data, pictureId: picture?.id || null,
    } });
  }

  async remove(id: string) {
    return await this.prisma.categoryArea.delete({ where: { id } });
  }

  async updateStatus(data: UpdateCategoryAreaStatusDto): Promise<any> {
    const currentItem = await this.findOne(data?.categoryAreaId);
    if(!currentItem) return null;
    await this.prisma.categoryArea.update({
      where:{
        id: data.categoryAreaId,
      },
      data: {
        status: data?.status ?? currentItem.status,
      },
    });

    return await this.findOne(currentItem.id);
  }

  private async addPicture(file?: {path?: string, name?: string, type?: string}){
    let fileData: Buffer;
    let picture;

    if(file?.path){
      const fileStream = createReadStream(file.path);
      const chunks = [];
  
      for await (const chunk of fileStream) {
        chunks.push(chunk);
      }
  
      fileData = Buffer.concat(chunks);
      picture = await this.prisma.picture.create({
        data: {
          picture: fileData,
          name: file.name,
          type: file.type || 'image/png',
        },
      });

      await this.fileService.deleteFile(file?.path);
    }
    console.log(picture);
    return picture || null;
  }
}
