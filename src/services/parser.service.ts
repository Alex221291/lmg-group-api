import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import * as fs from 'fs';

@Injectable()
export class ParserService {
  parseFile(filePath: string): any {
    const fileBuffer = fs.readFileSync(filePath); // Читаем файл как буфер
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const worksheet = workbook.Sheets['Юниты'];
    
    if (!worksheet) {
      throw new Error('Лист "Юниты" не найден в файле.');
    }

    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });

    const columnNames = [
      "section",
      "category",
      "area",
      "build",
      "street",
      "house",
      "latitude",
      "longitude",
      "buildAreaCoordinates",
      "wDescription",
      "advertisingType",
      "itemCount",
      "audienceReach",
      "gPictureLink",
      "gTitle",
      "gDescription",
      "iconLink"
    ];

    const result = jsonData.map((row: any[]) => {
      const parsedRow: any = {};
      row.forEach((cell, index) => {
        parsedRow[columnNames[index]] = cell;
      });
      return parsedRow;
    });

    return result;
  }
}
