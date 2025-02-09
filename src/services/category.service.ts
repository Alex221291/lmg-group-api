import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { GetCategoryDto } from 'src/dto/category/get-category.dto';
import { FileService } from './file.service';
import { Category, Prisma } from '@prisma/client';
import { UpdateCategoryDto } from 'src/dto/category/update-category.dto';
import { UpdateCategoryStatusDto } from 'src/dto/category/update-category-status.dto';
import { createReadStream } from 'fs';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService, private fileService: FileService) {}

  async getAll(sectionId: string): Promise<GetCategoryDto[]> {
    let params: Prisma.CategoryFindManyArgs = {};
    if (sectionId) {
      params.where = { sectionId };
    }
  
    let answer = await this.prisma.category.findMany({
      where: sectionId ? { sectionId } : undefined,
      include: {
        categoryArea: {
          include: {
            build: true
          }
        }
      }
    });
  
    return answer.map(item => ({
      id: item.id,
      number: item.number,
      title: item.title,
      description: item.description,
      subtitle: item.subtitle,
      sectionId: item.sectionId,
      pictureId: item.pictureId,
      previewPictureId: item.previewPictureId,
      videoId: item.videoId,
      list: item.list ? JSON.parse(item.list as unknown as string) : {},
      status: item.status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      build: item.categoryArea?.flatMap(categoryArea => categoryArea.build.map(build => ({
        id: build.id,
        categoryId: item.id,
        categoryAreaId: build.categoryAreaId,
        number: build.number,
        coordinates: build.coordinates ? JSON.parse(build.coordinates as string) as [number, number][] : undefined,
        buildAreaCoordinates: build.buildAreaCoordinates ? JSON.parse(build.buildAreaCoordinates as string) as [number, number][] : undefined,
        iconPictureId: build.iconPictureId,
        name: build.name,
        wDescription: build.wDescription,
        pictureId: build.pictureId,
        gTitle: build.gTitle,
        gSubTitle: build.gSubTitle,
        list: build.list ? JSON.parse(build.list as string) as { title: string; value: string }[] : [],
        status: build.status,
        createdAt: build.createdAt,
        updatedAt: build.updatedAt
      }))) ?? []
    }));
  }
  
  async getById(id: string): Promise<GetCategoryDto | null> {
    const answer = await this.prisma.category.findUnique({
      where: { id },
      include: {
        categoryArea: {
          include: {
            build: true
          }
        }
      }
    });
    if (!answer) return null;
  
    return {
      id: answer.id,
      number: answer.number,
      title: answer.title,
      description: answer.description,
      subtitle: answer.subtitle,
      sectionId: answer.sectionId,
      pictureId: answer.pictureId,
      previewPictureId: answer.previewPictureId,
      videoId: answer.videoId,
      list: answer.list ? JSON.parse(answer.list as unknown as string) : {},
      status: answer.status,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
      build: answer.categoryArea.flatMap(categoryArea => categoryArea.build.map(build => ({
        id: build.id,
        categoryId: answer.id,
        categoryAreaId: build.categoryAreaId,
        number: build.number,
        coordinates: build.coordinates ? JSON.parse(build.coordinates as unknown as string) : undefined,
        buildAreaCoordinates: build.buildAreaCoordinates ? JSON.parse(build.buildAreaCoordinates as unknown as string) : undefined,
        iconPictureId: build.iconPictureId,
        name: build.name,
        wDescription: build.wDescription,
        pictureId: build.pictureId,
        gTitle: build.gTitle,
        gSubTitle: build.gSubTitle,
        list: build.list ? JSON.parse(build.list as unknown as string) : [],
        status: build.status,
        createdAt: build.createdAt,
        updatedAt: build.updatedAt
      })))
    };
  }

  async create(fileInfo?: {path?: string, name?: string, type?: string}, 
    videoInfo?: {filename?: string, originalname?: string, path?: string},
    previewPictureFileInfo?: {path?: string, name?: string, type?: string}, 
    data?: CreateCategoryDto): Promise<Category> {

    const picture = await this.addPicture(fileInfo);
    const previewPicture = await this.addPicture(previewPictureFileInfo);
    
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
        previewPictureId: previewPicture?.id || null,
      },
    });
  }

  async update(fileInfo?: {path: string, type: string, name: string}, 
    videoInfo?: {filename: string, originalname: string, path: string},
    previewPictureFileInfo?: {path?: string, name?: string, type?: string},
    data?: UpdateCategoryDto): Promise<Category> {

    const updateItem = await this.getById(data?.id);
    let pictureId = data?.pictureId;
    if(fileInfo?.path){
      const picture = await this.addPicture(fileInfo);
      pictureId = picture?.id;
      await this.prisma.picture.deleteMany({
        where : {
          id: updateItem?.pictureId || ''
        }
      });
    }

    let previewPictureId = data?.previewPictureId;
    if(previewPictureFileInfo?.path){
      const picture = await this.addPicture(previewPictureFileInfo);
      previewPictureId = picture?.id;
      await this.prisma.picture.deleteMany({
        where : {
          id: updateItem?.previewPictureId || ''
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
        pictureId: pictureId || null,
        videoId: videoId || null,
        previewPictureId: previewPictureId || null,
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