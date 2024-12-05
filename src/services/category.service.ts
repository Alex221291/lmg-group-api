import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { GetCategoryDto } from 'src/dto/category/get-category.dto';
import { FileService } from './file.service';
import { Category } from '@prisma/client';
import { UpdateCategoryDto } from 'src/dto/category/update-category.dto';
import { UpdateCategoryStatusDto } from 'src/dto/category/update-category-status.dto';
import { createReadStream } from 'fs';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService, private fileService: FileService) {}

  async getAll(sectionId: string):Promise<GetCategoryDto[]> {
    let params = {};
    if(sectionId){
      params = {...params, where:{sectionId}};
    }
    let answer = await this.prisma.category.findMany(params);

    return answer.map(item => {
      return {
        id: item.id,
        number: item.number,
        title: item.title,
        description: item.description,
        subtitle: item.subtitle,
        sectionId: item.sectionId,
        pictureId: item.pictureId,
        videoId: item.videoId,
        list: item.list ? JSON.parse(item.list as unknown as string) : {},
        status: item.status,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      };

    });
  }

  async getById(id: string): Promise<GetCategoryDto | null> {
    const answer =  await this.prisma.category.findUnique({
      where: {id},
    });
    if(!answer) return null;

    return {
      id: answer.id,
      number: answer.number,
      title: answer.title,
      description: answer.description,
      subtitle: answer.subtitle,
      sectionId: answer.sectionId,
      pictureId: answer.pictureId,
      videoId: answer.videoId,
      list: answer.list ? JSON.parse(answer.list as unknown as string) : {},
      status: answer.status,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt
    };
  }

  async create(fileInfo?: {path?: string, name?: string, type?: string}, 
    videoInfo?: {filename?: string, originalname?: string, path?: string}, data?: CreateCategoryDto): Promise<Category> {
    const picture = await this.addPicture(fileInfo);
    
    const video = await this.addVideo(videoInfo);

    return await this.prisma.category.create({
      data: {
        title: data?.title,
        description: data?.description,
        subtitle: data?.subtitle,
        sectionId: data?.sectionId || null,
        list: data?.list ? JSON.stringify(data.list) : undefined,
        status: data?.status,
        pictureId: picture?.id || null,
        videoId: video?.id || null,
      },
    });
  }

  async update(fileInfo?: {path: string, type: string, name: string}, videoInfo?: {filename: string, originalname: string, path: string}, data?: UpdateCategoryDto): Promise<Category> {
    const updateItem = await this.getById(data?.id);

    const picture = await this.addPicture(fileInfo);
    let videoId = data?.videoId;
    if(!videoId)
    {
      const video = await this.addVideo(videoInfo);
      videoId = video?.id;
      await this.prisma.video.deleteMany({
        where : {
          id: updateItem?.videoId || ''
        }
      });
    }
    
    return await this.prisma.category.update({
      where:{
        id: data.id,
      },
      data: {
        title: data?.title,
        description: data?.description,
        subtitle: data?.subtitle,
        sectionId: data?.sectionId || null,
        list: data?.list ? JSON.stringify(data.list) : undefined,
        status: data?.status,
        pictureId: picture?.id || null,
        videoId: videoId || null,
      },
    });
  }

  async delete(id: string): Promise<Category> {
    const deleteItem = await this.getById(id);

    await this.prisma.picture.deleteMany({
      where : {
        id: deleteItem?.pictureId || ''
      }
    });

    return await this.prisma.category.delete({
      where: {id},
    });
  }

  async updateStatus(data: UpdateCategoryStatusDto): Promise<GetCategoryDto> {
    const currentItem = await this.getById(data?.categoryId);
    if(!currentItem) return null;
    await this.prisma.category.update({
      where:{
        id: data.categoryId,
      },
      data: {
        status: data?.status ?? currentItem.status,
      },
    });

    return await this.getById(currentItem.id);
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

      await this.fileService.deleteFile(file?.path);
    }
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