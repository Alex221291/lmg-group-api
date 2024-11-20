import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Put,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CreateArticleDto } from 'src/dto/article/create-article.dto';
import { GetArticleDto } from 'src/dto/article/get-article.dto';
import { UpdateArticleStatusDto } from 'src/dto/article/update-article-status.dto';
import { UpdateArticleDto } from 'src/dto/article/update-article.dto';
import { ArticleService } from 'src/services/article.service';

@ApiTags('Article')
@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService
  ) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('files[]'))
  async createArticle(@UploadedFiles() files: Express.Multer.File[], @Body() data: CreateArticleDto): Promise<GetArticleDto | null> {
    if(data?.contentItems){
      data.contentItems = typeof data.contentItems === 'string' ? JSON.parse(data.contentItems) : data.contentItems;
    }
    if(data?.list){
      data.list = typeof data.list === 'string' ? JSON.parse(data.list) : data.list;
    }
    
    const filesInfo = files?.map(file => {
      return {
        path: file?.path,
        name: file?.originalname,
        type: file?.mimetype
      }
    });
    return await this.articleService.createArticle(filesInfo, data);
  }

  @Post('update')
  @UseInterceptors(FilesInterceptor('files[]'))
  async updateArticle(@UploadedFiles() files: Express.Multer.File[], @Body() data: UpdateArticleDto): Promise<GetArticleDto | null> {
    if(data?.contentItems){
      data.contentItems = typeof data.contentItems === 'string' ? JSON.parse(data.contentItems) : data.contentItems;
    }
    if(data?.list){
      data.list = typeof data.list === 'string' ? JSON.parse(data.list) : data.list;
    }

    const filesInfo = files?.map(file => {
      return {
        path: file?.path,
        name: file?.originalname,
        type: file?.mimetype
      }
    });
    const result = await this.articleService.updateArticle(filesInfo, data);
    return result;
  }

  @Get('/:id')
  async getArticleById(@Param('id') id: string): Promise<GetArticleDto> {
    return this.articleService.getById(id);
  }

  @Get()
  async getAll(): Promise<GetArticleDto[]> {
    return this.articleService.getAll();
  }

  @Delete('/:id')
  async deleteArticle(@Param('id') id: string): Promise<any> {
    return this.articleService.deleteArticle(id);
  }

  @Put('status')
  async updateStatus(@Body() data: UpdateArticleStatusDto): Promise<GetArticleDto | null> {

    const result = await this.articleService.updateStatus(data);
    return result;
  }

}
