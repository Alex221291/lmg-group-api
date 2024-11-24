import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { $Enums, Picture } from '@prisma/client';
import { createReadStream } from 'fs';
import { FileService } from './file.service';
import { GetArticleDto } from 'src/dto/article/get-article.dto';
import { CreateArticleDto } from 'src/dto/article/create-article.dto';
import { UpdateArticleDto } from 'src/dto/article/update-article.dto';
import { UpdateArticleStatusDto } from 'src/dto/article/update-article-status.dto';
@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService, 
    private fileService: FileService
  ) {}

  async getById(id: string): Promise<GetArticleDto | null> {
    const answer = await this.prisma.article.findUnique({
      where: { id },
      include: {
        articleItem: {
          orderBy: {
            createdAt: 'asc',
          }
        },
      },
    });

    if (!answer) return null;

    const getArticleDto: GetArticleDto = {
      id: answer.id,
      number: answer.number,
      title: answer.title,
      subtitle: answer.subtitle,
      pictureId: answer.pictureId,
      time: answer.time,
      videoId: answer.videoId,
      list: answer.list ? JSON.parse(answer.list as unknown as string) : [],
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
      status: answer.status,
      contentItems: answer.articleItem.map((item) => ({
        text: item.text,
        pictureId: item.pictureId,
        list: item.list ? JSON.parse(item.list as unknown as string) : null,
      })),
    };

    return getArticleDto;
  }

  async getAll(): Promise<GetArticleDto[]> {
    const article =  await this.prisma.article.findMany({
      orderBy: {
        number: 'asc',
      },
      include: {
        articleItem: {
          orderBy: {
            createdAt: 'asc',
          }
        },
      },
    });

    return article?.map(item => {
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
        contentItems: item.articleItem.map((item) => ({
          text: item.text,
          pictureId: item.pictureId,
          list: item.list ? JSON.parse(item.list as unknown as string) : undefined,
        })),
      }
    })
  }

  async createArticle(filesInfo?: {path: string, name: string, type: string}[], data?: CreateArticleDto): Promise<GetArticleDto> {
    const mainFile = filesInfo.find(f => data.pictureName && data.pictureName !== null && f.name === data.pictureName) || null;
    const mainPicture = await this.addPicture(mainFile);

    const article = await this.prisma.article.create({
      data: {
        title: data?.title,
        subtitle: data?.subtitle,
        status: data?.status ?? $Enums.ContentSatus.DRAFT,
        time: data?.time,
        videoId: null, //TODO
        list: data?.list ? JSON.stringify(data.list) : undefined,
        pictureId:mainPicture?.id || null,
      },
    });

    if(!data?.contentItems) {
      await this.fileService.deleteFiles(filesInfo);
      return await this.getById(article.id);
    }

    for (const item of data?.contentItems) {
      let picture: Picture;
      if (item?.pictureName) {
        const file = filesInfo.find(f => f.name === item?.pictureName);
        picture = await this.addPicture(file);
      }
      await this.prisma.articleItem.create({
        data: {
          articleId: article?.id,
          text: item?.text,
          pictureId: picture?.id || null,
          list: item?.list ? JSON.stringify(item.list) : undefined,
        }});
    }
    await this.fileService.deleteFiles(filesInfo);
    return await this.getById(article.id);
  }

  async updateArticle(filesInfo?: {path: string, name: string, type: string}[], data?: UpdateArticleDto): Promise<GetArticleDto> {

    const currentArticle = await this.getById(data?.id);
    if(!currentArticle) return null;;

    await this.prisma.picture.deleteMany({where: {id: currentArticle?.pictureId || ''}});
    const mainFile = filesInfo.find(f => data.pictureName && data.pictureName !== null && f.name === data.pictureName) || null;
    const mainPicture = await this.addPicture(mainFile);

    const updateArticle = await this.prisma.article.update({
      where:{
        id: data.id,
      },
      data: {
        title: data?.title,
        subtitle: data?.subtitle,
        status: data?.status ?? $Enums.ContentSatus.DRAFT,
        time: data?.time,
        videoId: null, //TODO
        list: data?.list ? JSON.stringify(data.list) : undefined,
        pictureId: mainPicture?.id || null,
      },
    });

    await this.prisma.articleItem.deleteMany({where: {articleId: data.id}});

    if(!data?.contentItems) {
      await this.fileService.deleteFiles(filesInfo);
      return await this.getById(updateArticle.id);
    }

    for (const item of data?.contentItems) {
      let picture: Picture;
      if (item?.pictureName) {
        const file = filesInfo.find(f => f.name == item?.pictureName);
        picture = await this.addPicture(file);
      }
      await this.prisma.articleItem.create({
        data: {
          articleId: data?.id,
          text: item?.text,
          pictureId: picture?.id || null,
          list: item?.list ? JSON.stringify(item.list) : undefined,
        }});
    }

    await this.fileService.deleteFiles(filesInfo);
    return await this.getById(updateArticle.id);
  }

  async deleteArticle(id: string): Promise<any> {
    return await this.prisma.article.deleteMany({
      where: {id},
    });
  }

  async updateStatus(data: UpdateArticleStatusDto): Promise<GetArticleDto> {
    const currentArticle = await this.getById(data?.articleId);
    if(!currentArticle) return null;
    await this.prisma.article.update({
      where:{
        id: data.articleId,
      },
      data: {
        status: data?.status ?? currentArticle.status,
      },
    });

    return await this.getById(currentArticle.id);
  }

  private async addPicture(file?: {path: string, name: string, type: string}){
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
    return picture || null;
  }
}