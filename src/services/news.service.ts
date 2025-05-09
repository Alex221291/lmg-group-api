import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { GetNewsDto } from '../dto/news/get-news.dto';
import { $Enums, Picture } from '@prisma/client';
import { CreateNewsDto } from '../dto/news/create-news.dto';
import { createReadStream } from 'fs';
import { FileService } from './file.service';
import { UpdateNewsDto } from '../dto/news/update-news.dto';
import { UpdateNewsStatusDto } from 'src/dto/news/update-news-status.dto';
import { TransliterateService } from 'src/engine/transliterate.service';

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
      pictureId: answer.pictureId,
      time: answer.time,
      videoId: answer.videoId,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
      status: answer.status,
      list: answer.list ? JSON.parse(answer.list as unknown as string) : [],
      contentItems: answer.newsItem.map((item) => ({
        text: item.text,
        pictureId: item.pictureId,
        list: item.list ? JSON.parse(item.list as unknown as string) : null,
      })),
      urlTitle: new TransliterateService().transliterateText(answer.title),
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
        pictureId: item.pictureId,
        time: item.time,
        videoId: item.videoId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        list: item.list ? JSON.parse(item.list as unknown as string) : [],
        status: item.status,
        contentItems: item.newsItem.map((item) => ({
          text: item.text,
          pictureId: item.pictureId,
          list: item.list ? JSON.parse(item.list as unknown as string) : null,
        })),
        urlTitle: new TransliterateService().transliterateText(item.title),
      }
    })
  }

  async createNews(filesInfo?: {path?: string, name?: string, type?: string}[], videoInfo?: {filename?: string, originalname?: string, path?: string}, data?: CreateNewsDto): Promise<GetNewsDto> {
    const mainFile = filesInfo?.find(f => data.pictureName && data.pictureName !== null && f.name === data.pictureName) || null;
    const mainPicture = await this.addPicture(mainFile);
    const video = await this.addVideo(videoInfo);
    const news = await this.prisma.news.create({
      data: {
        title: data?.title,
        subtitle: data?.subtitle,
        status: data?.status ?? $Enums.ContentSatus.DRAFT,
        time: data?.time,
        videoId: video?.id || null,
        list: data?.list ? JSON.stringify(data.list) : null,
        pictureId: mainPicture?.id || null,
      },
    });

    if(!data?.contentItems) {
      await this.fileService.deleteFiles(filesInfo);
      return await this.getById(news.id);
    }

    for (const item of data?.contentItems) {
      let picture: Picture;
      if (item?.pictureName) {
        const file = filesInfo?.find(f => f.name === item?.pictureName);
        picture = await this.addPicture(file);
      }
      await this.prisma.newsItem.create({
        data: {
          newsId: news?.id,
          text: item?.text,
          pictureId: picture?.id || null,
          list: item?.list ? JSON.stringify(item.list) : null,
        }});
    }
    await this.fileService.deleteFiles(filesInfo);
    return await this.getById(news.id);
  }

  async updateNews(filesInfo?: {path?: string, name?: string, type?: string}[], videoInfo?: {filename?: string, originalname?: string, path?: string}, data?: UpdateNewsDto): Promise<GetNewsDto> {

    const currentNews = await this.getById(data?.id);
    if(!currentNews) return null;

    const mainFile = filesInfo?.find(f => data.pictureName && data.pictureName !== null && f.name === data.pictureName) || null;
    
    let pictureId = data?.pictureId;
    if(mainFile?.path){
      const mainPicture = await this.addPicture(mainFile);
      pictureId = mainPicture?.id;
      await this.prisma.picture.deleteMany({
        where : {
          id: currentNews?.pictureId || ''
        }
      });
    }

    let videoId = data?.videoId;
    if(videoInfo?.path)
    {
      const video = await this.addVideo(videoInfo);
      videoId = video?.id;
      await this.prisma.video.deleteMany({
        where : {
          id: currentNews?.videoId || ''
        }
      });
    }
    const updateNews = await this.prisma.news.update({
      where:{
        id: data.id,
      },
      data: {
        title: data?.title,
        subtitle: data?.subtitle,
        status: data?.status ?? $Enums.ContentSatus.DRAFT,
        time: data?.time,
        videoId: videoId || null,
        list: data?.list ? JSON.stringify(data.list) : null,
        pictureId: pictureId || null,
      },
    });

    await this.prisma.newsItem.deleteMany({where: {newsId: data.id}});

    if(!data?.contentItems) {
      await this.fileService.deleteFiles(filesInfo);
      return await this.getById(updateNews.id);
    }

    for (const item of data?.contentItems) {
      let itemPictureId = item?.pictureId;
      if (item?.pictureName) {
        const file = filesInfo?.find(f => f.name == item?.pictureName);
        const picture = await this.addPicture(file);
        itemPictureId = picture?.id;
        await this.prisma.picture.deleteMany({
          where : {
            id: item?.pictureId || ''
          }
        });
      }
      await this.prisma.newsItem.create({
        data: {
          newsId: data?.id,
          text: item?.text,
          pictureId: itemPictureId || null,
          list: item?.list ? JSON.stringify(item.list) : null,
        }});
    }
    
    await this.fileService.deleteFiles(filesInfo);
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

  private async addPicture(file?: {path?: string, name?: string, type?: string}){
    let fileData: Buffer;
    let picture;

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

    }
    console.log(picture);
    return picture || null;
  }

  private async addVideo(videoInfo?: {filename?: string, originalname?: string, path?: string}){
    let video;
    if(videoInfo?.path){
      video = await this.prisma.video.create({
        data: videoInfo,
      });
    }
    return video || null;
  }
}