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
import { Favor } from '@prisma/client';
import { CreateFavorDto } from 'src/dto/favor/create-favor.dto';
import { GetFavorDto } from 'src/dto/favor/get-favor.dto';
import { UpdateFavorDto } from 'src/dto/favor/update-favor.dto';
import { FavorService } from 'src/services/favor.service';
  
  @ApiTags('Favor')
  @Controller('favor')
  export class FavorController {
    constructor(
      private readonly favorService: FavorService
    ) {}
  
    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async CreateFavor(@UploadedFile() file: Express.Multer.File, @Body() favor: CreateFavorDto) {
      console.log(file);
      const result = await this.favorService.createFavor({path: file?.path, type: file?.mimetype}, favor)
      return result;
    }

    @Post('update')
    @UseInterceptors(FileInterceptor('file'))
    async updateFavor(@UploadedFile() file: Express.Multer.File, @Body() favor: UpdateFavorDto) {
      console.log(file);
      const result = await this.favorService.updateFavor({path: file?.path, type: file?.mimetype}, favor);
      return result;
    }

    @Get('/:id')
    async getFavorById(@Param('id') id: string): Promise<GetFavorDto> {
      return this.favorService.getById(id);
    }
  
    @Get()
    async getAll(): Promise<GetFavorDto[]> {
      return this.favorService.getAll();
    }

    @Delete('/:id')
    async deleteFavor(@Param('id') id: string): Promise<Favor> {
      return this.favorService.deleteFavor(id);
    }

  }