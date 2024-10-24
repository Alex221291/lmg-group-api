import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Filming } from '@prisma/client';
import { CreateFilmingDto } from 'src/dto/filming/create-filming.dto';
import { GetFilmingDto } from 'src/dto/filming/get-filming.dto';
import { UpdateFilmingDto } from 'src/dto/filming/update-filming.dto';
import { FilmingService } from 'src/services/filming.service';
  
  @ApiTags('Filming')
  @Controller('filming')
  export class FilmingController {
    constructor(
      private readonly filmingService: FilmingService
    ) {}
  
    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async CreateFilming(@UploadedFile() file: Express.Multer.File, @Body() filming: CreateFilmingDto) {
      console.log(file);
      const result = await this.filmingService.createFilming({path: file?.path, type: file?.mimetype}, filming)
      return result;
    }

    @Post('update')
    @UseInterceptors(FileInterceptor('file'))
    async updateFilming(@UploadedFile() file: Express.Multer.File, @Body() filming: UpdateFilmingDto) {
      console.log(file);
      const result = await this.filmingService.updateFilming({path: file?.path, type: file?.mimetype}, filming);
      return result;
    }

    @Get('/:id')
    async getFilmingById(@Param('id') id: string): Promise<GetFilmingDto> {
      return this.filmingService.getById(id);
    }
  
    @Get()
    async getAll(): Promise<GetFilmingDto[]> {
      return this.filmingService.getAll();
    }

    @Delete('/:id')
    async deleteFilming(@Param('id') id: string): Promise<Filming> {
      return this.filmingService.deleteFilming(id);
    }

  }