import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParserService } from '../services/parser.service';

@Controller('parser')
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // Сохраняет файл в папку uploads
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('Файл не был загружен.');
    }
    return this.parserService.parseFile(file.path); // Передаём путь к файлу в сервис
  }
}
