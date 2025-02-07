import { BadRequestException, Controller, Get, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParserService } from '../services/parser.service';
import { ParserDto } from 'src/dto/parser/parser.dto';
import * as path from 'path';
import * as fs from 'fs'
import { Response } from 'express';


@Controller('parser')
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // Сохраняет файл в папку uploads
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> { //Promise<ParserDto[] | []>
    if (!file) {
      throw new BadRequestException('Файл не был загружен.');
    }

    // Проверка на тип файла .xlsx
    if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      throw new BadRequestException('Неверный формат файла. Ожидается файл .xlsx');
    }

    return this.parserService.parser({ path: file.path, type: file.mimetype, name: file.originalname }); // Передаём путь к файлу в сервис
  }

  @Get('download-template')
  downloadTemplate(@Res() res: Response) {
    const filePath = path.resolve(__dirname, '..', '..', 'public', 'template-LMG.xlsx');
    console.log(filePath);
    res.download(filePath, 'template-LMG.xlsx', (err) => {
      if (err) {
        res.status(500).send('Ошибка при скачивании файла.');
      }
    });
  }

  @Get('download-current')
  async currentTemplate(@Res() res: Response) {
    try {
      const publicDir = './uploads';
      const files = await fs.promises.readdir(publicDir);
      const regex = /^current-LMG-\d{8}\.xlsx$/;
      const latestFile = files.filter(file => regex.test(file)).sort().reverse()[0];

      if (latestFile) {
        const filePath = path.join(publicDir, latestFile);
        console.log(`Downloading file: ${filePath}`);
        res.download(filePath, (err) => {
          if (err) {
            res.status(500).send('Ошибка при скачивании файла.');
          }
        });
      } else {
        res.status(404).send('Файл не найден.');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      res.status(500).send('Ошибка при скачивании файла.');
    }
  }
}
