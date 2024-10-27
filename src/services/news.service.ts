import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { GetNewsDto } from '../dto/news/get-news.dto';
import { $Enums, News, Picture } from '@prisma/client';
import { CreateNewsDto } from '../dto/news/create-news.dto';
import { createReadStream } from 'fs';
import { FileService } from './file.service';
import { UpdateNewsDto } from '../dto/news/update-news.dto';
import { UpdateNewsStatusDto } from 'src/dto/news/update-news-status.dto';
@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService, 
    private fileService: FileService
  ) {}

  async getById(id: string): Promise<GetNewsDto | null> {
    const answer = await this.prisma.news.findUnique({
      where: { id },
      include: {
        newsItem: {
          orderBy: {
            createdAt: 'asc',
          }
        },
      },
    });

    if (!answer) return null;

    const getNewsDto: GetNewsDto = {
      id: answer.id,
      number: answer.number,
      title: answer.title,
      subtitle: answer.subtitle,
      time: answer.time,
      video: answer.video,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
      status: answer.status,
      contentItems: answer.newsItem.map((item) => ({
        text: item.text,
        pictureId: item.pictureId,
        list: item.list ? JSON.parse(item.list as unknown as string) : undefined,
      })),
    };

    return getNewsDto;
  }

  async getAll(): Promise<GetNewsDto[]> {
    const news =  await this.prisma.news.findMany({
      orderBy: {
        number: 'asc',
      },
      include: {
        newsItem: {
          orderBy: {
            createdAt: 'asc',
          }
        },
      },
    });

    return news?.map(item => {
      return  {
        id: item.id,
        number: item.number,
        title: item.title,
        subtitle: item.subtitle,
        time: item.time,
        video: item.video,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        status: item.status,
        newsItems: item.newsItem.map((item) => ({
          text: item.text,
          pictureId: item.pictureId,
          list: item.list ? JSON.parse(item.list as unknown as string) : undefined,
        })),
      }
    })
  }

  async createNews(filesInfo?: {path: string, name: string, type: string}[], data?: CreateNewsDto): Promise<GetNewsDto> {

    const news = await this.prisma.news.create({
      data: {
        title: data?.title,
        subtitle: data?.subtitle,
        status: data?.status ?? $Enums.ContentSatus.DRAFT,
        time: data?.time,
        video: data?.video,
      },
    });

    if(!data?.contentItems) return await this.getById(news.id);

    for (const item of data?.contentItems) {
      let picture: Picture;
      if (item?.pictureName) {
        let fileData: Buffer;
        const file = filesInfo.find(f => f.name === item?.pictureName);
        console.log(file);
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
      }
      console.log(item?.list);
      await this.prisma.newsItem.create({
        data: {
          newsId: news?.id,
          text: item?.text,
          pictureId: picture?.id || null,
          list: item?.list ? JSON.stringify(item.list) : undefined,
        }});
    }
    
    return await this.getById(news.id);
  }

  async updateNews(filesInfo?: {path: string, name: string, type: string}[], data?: UpdateNewsDto): Promise<GetNewsDto> {

    const currentNews = await this.getById(data?.id);
    if(!currentNews) return null;
    console.log(filesInfo[0]);
    console.log(data);
    const updateNews = await this.prisma.news.update({
      where:{
        id: data.id,
      },
      data: {
        title: data?.title,
        subtitle: data?.subtitle,
        status: data?.status ?? $Enums.ContentSatus.DRAFT,
        time: data?.time,
        video: data?.video,
      },
    });

    await this.prisma.newsItem.deleteMany({where: {newsId: data.id}});

    if(!data?.contentItems) return await this.getById(updateNews.id);

    for (const item of data?.contentItems) {
      let picture: Picture;
      if (item?.pictureName) {
        let fileData: Buffer;
        const file = filesInfo.find(f => f.name == item?.pictureName);
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
      }
      await this.prisma.newsItem.create({
        data: {
          newsId: data?.id,
          text: item?.text,
          pictureId: picture?.id || null,
          list: item?.list ? JSON.stringify(item.list) : undefined,
        }});
    }
    
    return await this.getById(updateNews.id);
  }

  async deleteNews(id: string): Promise<any> {
    return await this.prisma.news.deleteMany({
      where: {id},
    });
  }

  async updateStatus(data: UpdateNewsStatusDto): Promise<GetNewsDto> {
    const currentNews = await this.getById(data?.newsId);
    if(!currentNews) return null;
    await this.prisma.news.update({
      where:{
        id: data.newsId,
      },
      data: {
        status: data?.status ?? currentNews.status,
      },
    });

    return await this.getById(currentNews.id);
  }
}