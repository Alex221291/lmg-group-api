import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Filming, Picture } from '@prisma/client';
import { createReadStream } from 'fs';
import { FileService } from './file.service';
import { GetFilmingDto } from 'src/dto/filming/get-filming.dto';
import { CreateFilmingDto } from 'src/dto/filming/create-filming.dto';
import { UpdateFilmingDto } from 'src/dto/filming/update-filming.dto';
@Injectable()
export class FilmingService {
  constructor(private prisma: PrismaService, 
    private fileService: FileService
  ) {}

  async getById(id: string): Promise<GetFilmingDto | null> {
    const result =  await this.prisma.filming.findUnique({
      where: {id},
    });
    return result;
  }

  async getAll(): Promise<GetFilmingDto[]> {
    const result =  await this.prisma.filming.findMany({
      orderBy:{
        order: 'asc'
    }});
    return result;
  }

  async createFilming(fileInfo?: {path: string, type: string}, filming?: CreateFilmingDto): Promise<Filming> {

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
    
    return await this.prisma.filming.create({
      data: {
        title: filming?.title,
        description: filming?.description,
        price: filming?.price,
        otherPrice: filming?.otherPrice,
        pictureId: picture?.id
      },
    });
  }

  async updateFilming(fileInfo?: {path: string, type: string}, filming?: UpdateFilmingDto): Promise<Filming> {
    let fileData: Buffer;
    let picture: Picture;

    const updateFilming = await this.getById(filming?.id);

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
        id: updateFilming?.pictureId || ''
      }
    });
    
    return await this.prisma.filming.update({
      where:{
        id: filming.id,
      },
      data: {
        title: filming?.title,
        description: filming?.description,
        price: filming?.price,
        otherPrice: filming?.otherPrice,
        pictureId: picture?.id
      },
    });
  }

  async deleteFilming(id: string): Promise<Filming> {
    const deleteFavor = await this.getById(id);

    await this.prisma.picture.deleteMany({
      where : {
        id: deleteFavor?.pictureId || ''
      }
    });

    return await this.prisma.filming.delete({
      where: {id},
    });
  }
}