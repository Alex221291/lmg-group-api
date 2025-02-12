import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
    Put,
  } from '@nestjs/common';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CreateNewsDto } from '../dto/news/create-news.dto';
import { GetNewsDto } from '../dto/news/get-news.dto';
import { UpdateNewsDto } from '../dto/news/update-news.dto';
import { NewsService } from '../services/news.service';
import { diskStorage } from 'multer';
import { UpdateNewsStatusDto } from 'src/dto/news/update-news-status.dto';
  
  @ApiTags('News')
  @Controller('news')
  export class NewsController {
    constructor(
      private readonly newsService: NewsService
    ) {}

    @Post('create')
    @UseInterceptors(
      FileFieldsInterceptor([
        { name: 'files[]'},
        { name: 'video', maxCount: 1 },
      ]),
    )
    async createNews(@UploadedFiles() files: { 'files[]'?: Express.Multer.File[]; video?: Express.Multer.File[] }, 
    @Body() data: CreateNewsDto): Promise<GetNewsDto | null> {
      console.log(data);
      if(data?.contentItems){
        data.contentItems = typeof data.contentItems === 'string' ? JSON.parse(data.contentItems) : data.contentItems;
      }
      if(data?.list){
        data.list = typeof data.list === 'string' ? JSON.parse(data.list) : data.list;
      }
      
      const filesInfo = files?.['files[]']?.map(file => {
        return {
          path: file?.path,
          name: file?.originalname,
          type: file?.mimetype
        }
      });
      const video = files?.video ? files?.video[0] : null;
      const videoInfo = {
        path: video?.path,
        filename: video?.filename,
        originalname: video?.originalname,
      };
      return await this.newsService.createNews(filesInfo, videoInfo, data);
    }

    @Post('update')
    @UseInterceptors(
      FileFieldsInterceptor([
        { name: 'files[]'},
        { name: 'video', maxCount: 1 },
      ]),
    )
    async updateNews(@UploadedFiles() files: { 'files[]'?: Express.Multer.File[]; video?: Express.Multer.File[] }, 
    @Body() data: UpdateNewsDto): Promise<GetNewsDto | null> {
      console.log(data);
      if(data?.contentItems){
        data.contentItems = typeof data.contentItems === 'string' ? JSON.parse(data.contentItems) : data.contentItems;
      }
      if(data?.list){
        data.list = typeof data.list === 'string' ? JSON.parse(data.list) : data.list;
      }

      const filesInfo = files?.['files[]']?.map(file => {
        return {
          path: file?.path,
          name: file?.originalname,
          type: file?.mimetype
        }
      });
      const video = files?.video ? files?.video[0] : null;
      const videoInfo = {
        path: video?.path,
        filename: video?.filename,
        originalname: video?.originalname,
      };
      const result = await this.newsService.updateNews(filesInfo, videoInfo, data);
      return result;
    }

    @Get('/:id')
    async getNewsById(@Param('id') id: string): Promise<GetNewsDto> {
      return this.newsService.getById(id);
    }
  
    @Get()
    async getAll(): Promise<GetNewsDto[]> {
      return this.newsService.getAll();
    }

    @Delete('/:id')
    async deleteNews(@Param('id') id: string): Promise<any> {
      return this.newsService.deleteNews(id);
    }

    @Put('status')
    async updateStatus(@Body() data: UpdateNewsStatusDto): Promise<GetNewsDto | null> {

      const result = await this.newsService.updateStatus(data);
      return result;
    }

}
