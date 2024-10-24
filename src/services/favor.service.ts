import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Favor, Picture } from '@prisma/client';
import { createReadStream } from 'fs';
import { FileService } from './file.service';
import { GetFavorDto } from 'src/dto/favor/get-favor.dto';
import { CreateFavorDto } from 'src/dto/favor/create-favor.dto';
import { UpdateFavorDto } from 'src/dto/favor/update-favor.dto';
@Injectable()
export class FavorService {
  constructor(private prisma: PrismaService, 
    private fileService: FileService
  ) {}

  async getById(id: string): Promise<GetFavorDto | null> {
    const result =  await this.prisma.favor.findUnique({
      where: {id},
    });
    return result;
  }

  async getAll(): Promise<GetFavorDto[]> {
    const result =  await this.prisma.favor.findMany({
      orderBy:{
        order: 'asc'
    }});
    return result;
  }

  async createFavor(fileInfo?: {path: string, type: string}, favor?: CreateFavorDto): Promise<Favor> {

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
    
    return await this.prisma.favor.create({
      data: {
        title: favor?.title,
        description: favor?.description,
        count: favor?.count,
        pictureId: picture?.id
      },
    });
  }

  async updateFavor(fileInfo?: {path: string, type: string}, favor?: UpdateFavorDto): Promise<Favor> {
    let fileData: Buffer;
    let picture: Picture;

    const updateFavor = await this.getById(favor?.id);

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
        id: updateFavor?.pictureId || ''
      }
    });
    
    return await this.prisma.favor.update({
      where:{
        id: favor.id,
      },
      data: {
        title: favor?.title,
        description: favor?.description,
        count: favor?.count,
        pictureId: picture?.id
      },
    });
  }

  async deleteFavor(id: string): Promise<Favor> {
    const deleteFavor = await this.getById(id);

    await this.prisma.picture.deleteMany({
      where : {
        id: deleteFavor?.pictureId || ''
      }
    });

    return await this.prisma.favor.delete({
      where: {id},
    });
  }
}