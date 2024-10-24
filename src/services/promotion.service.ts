import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Promotion, Picture } from '@prisma/client';
import { FileService } from './file.service';
import { GetPromotionDto } from 'src/dto/promotion/get-promotion.dto';
import { CreatePromotionDto } from 'src/dto/promotion/create-promotion.dto';
import { UpdatePromotionDto } from 'src/dto/promotion/update-promotion.dto';
import { createReadStream } from 'fs';
import * as moment from 'moment';
moment.locale('ru');
@Injectable()
export class PromotionService {
  constructor(private prisma: PrismaService, 
    private fileService: FileService
  ) {}

  async getById(id: string): Promise<GetPromotionDto | null> {
    const answer =  await this.prisma.promotion.findUnique({
      where: {id},
    });
    if(!answer) return null;

    return {
      id: answer?.id,
      title: answer?.title,
      description: answer?.description,
      savings: answer?.savings,
      pictureId: answer?.pictureId,
      subject: answer?.subject,
      time: answer?.time,
      date: moment(answer?.date).format('D MMMM YYYY'),
    };
  }

  async getAll(): Promise<GetPromotionDto[]> {
    const promotions =  await this.prisma.promotion.findMany({orderBy: {
      date: 'desc'
    }});

    return promotions?.map(item => {
      return {
        id: item?.id,
        title: item?.title,
        description: item?.description,
        savings: item?.savings,
        pictureId: item?.pictureId,
        subject: item?.subject,
        time: item?.time,
        date: moment(item?.date).format('D MMMM YYYY'),
      }
    })
  }

  async createPromotion(fileInfo?: {path: string, type: string}, promotion?: CreatePromotionDto): Promise<Promotion> {

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
    
    return await this.prisma.promotion.create({
      data: {
        title: promotion?.title,
        description: promotion?.description,
        savings: promotion?.savings,
        pictureId: picture?.id,
        subject: promotion?.subject,
        time: promotion?.time,
      },
    });
  }

  async updatePromotion(fileInfo?: {path?: string, type?: string}, promotion?: UpdatePromotionDto): Promise<Promotion> {
    let fileData: Buffer;
    let picture: Picture;

    const updatePromotion = await this.getById(promotion?.id);

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
        id: updatePromotion?.pictureId || ''
      }
    });
    
    return await this.prisma.promotion.update({
      where:{
        id: promotion.id,
      },
      data: {
        title: promotion?.title,
        description: promotion?.description,
        savings: promotion?.savings,
        pictureId: picture?.id,
        subject: promotion?.subject,
        time: promotion?.time,
      },
    });
  }

  async deletePromotion(id: string): Promise<Promotion> {
    const deletePromotion = await this.getById(id);

    await this.prisma.picture.deleteMany({
      where : {
        id: deletePromotion?.pictureId || ''
      }
    });

    return await this.prisma.promotion.delete({
      where: {id},
    });
  }
}