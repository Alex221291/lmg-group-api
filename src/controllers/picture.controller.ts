import {
    Controller,
    Get,
    StreamableFile,
    Header,
    Param,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PictureService } from 'src/services/picrute.service';
import { Readable } from 'stream';
  
  @ApiTags('Picture')
  @Controller('picture')
  export class PictureController {
    constructor(
      private readonly pictureService: PictureService
    ) {}

    
    @Get('/:id')
    @Header('Cache-Control', 'none')
    async get(@Param('id') pictureId: string): Promise<StreamableFile> {
      try {
        const picture = await this.pictureService.getPicture(pictureId); // Здесь получите изображение из базы данных или другого источника
        if(!picture?.picture)
          throw new HttpException('Изображение не найдено', HttpStatus.BAD_REQUEST);

        const readableStream = new Readable();
        readableStream.push(picture.picture);
        readableStream.push(null);

        return new StreamableFile(readableStream, { type: picture.type });
      } catch (error) {
        throw new HttpException('Ошибка при получении изображения', HttpStatus.BAD_REQUEST);
      }
    }
  }

  