import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { GetNewsDto } from 'src/dto/news/get-news.dto';
import { News, Picture } from '@prisma/client';
import { CreateNewsDto } from 'src/dto/news/create-news.dto';
import { createReadStream } from 'fs';
import { FileService } from './file.service';
import { UpdateNewsDto } from 'src/dto/news/update-news.dto';
@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService, 
    private fileService: FileService
  ) {}

  async getById(id: string): Promise<GetNewsDto | null> {
    const answer =  await this.prisma.news.findUnique({
      where: {id},
    });
    if(!answer) return null;

    return {
      id: answer?.id,
      title: answer?.title,
      description: answer?.description,
      date: answer?.date.toLocaleDateString('ru-RU').replaceAll('.', '-'),
      subject: answer?.subject,
      time: answer?.time,
      pictureId: answer?.pictureId,
    };
  }

  async getAll(): Promise<GetNewsDto[]> {
    const news =  await this.prisma.news.findMany({orderBy: {
      date: 'desc'
    }});

    return news?.map(item => {
      return {
        id: item?.id,
        title: item?.title,
        description: item?.description,
        date: item?.date.toLocaleDateString('ru-RU').replaceAll('.', '-'),
        subject: item?.subject,
        time: item?.time,
        pictureId: item?.pictureId,
      }
    })
  }

  async createNews(fileInfo?: {path: string, type: string}, news?: CreateNewsDto): Promise<News> {

    let fileData: Buffer;
    let picture: Picture;
    if(fileInfo?.path){
      const fileStream = createReadStream(fileInfo?.path);
      const chunks = [];

      for await (const chunk of fileStream) {
        chunks.push(chunk);
      }

      fileData = Buffer.concat(chunks);
      picture = await this.prisma.picture.create({
        data: {
          picture: fileData,
          type: fileInfo?.type || 'image/png',
        },
      });

      await this.fileService.deleteFile(fileInfo?.path);
    }
    
    return await this.prisma.news.create({
      data: {
        title: news?.title,
        description: news?.description,
        subject: news?.subject,
        time: news?.time,
        pictureId: picture?.id
      },
    });
  }

  async updateNews(fileInfo?: {path: string, type: string}, news?: UpdateNewsDto): Promise<News> {
    let fileData: Buffer;
    let picture: Picture;

    const updateNews = await this.getById(news?.id);

    if(fileInfo?.path){
      const fileStream = createReadStream(fileInfo?.path);
      const chunks = [];

      for await (const chunk of fileStream) {
        chunks.push(chunk);
      }

      fileData = Buffer.concat(chunks);
      picture = await this.prisma.picture.create({
        data: {
          picture: fileData,
          type: fileInfo?.type || 'image/png',
        },
      });
      
      await this.fileService.deleteFile(fileInfo?.path);
    }

    await this.prisma.picture.deleteMany({
      where : {
        id: updateNews?.pictureId || ''
      }
    });
    
    return await this.prisma.news.update({
      where:{
        id: news.id,
      },
      data: {
        title: news?.title,
        description: news?.description,
        subject: news?.subject,
        time: news?.time,
        pictureId: picture?.id
      },
    });
  }

  async deleteNews(id: string): Promise<News> {
    const deleteNews = await this.getById(id);

    await this.prisma.picture.deleteMany({
      where : {
        id: deleteNews?.pictureId || ''
      }
    });

    return await this.prisma.news.delete({
      where: {id},
    });
  }
}