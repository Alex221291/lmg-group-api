import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Picture, Portfolio } from '@prisma/client';
import { createReadStream } from 'fs';
import { FileService } from './file.service';
import { GetPortfolioDto } from 'src/dto/portfolio/get-portfolio.dto';
import { CreatePortfolioDto } from 'src/dto/portfolio/create-portfolio.dto';
import { UpdatePortfolioDto } from 'src/dto/portfolio/update-portfolio.dto';
import { UpdatePortfolioStatusDto } from 'src/dto/portfolio/update-portfolio-status.dto';
@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService, 
    private fileService: FileService
  ) {}

  async getById(id: string): Promise<GetPortfolioDto | null> {
    const answer =  await this.prisma.portfolio.findUnique({
      where: {id},
    });
    if(!answer) return null;

    return {
      id: answer?.id,
      number: answer?.number,
      title: answer?.title,
      description: answer?.description,
      status: answer?.status,
      categoryName: answer?.categoryName,
      pictureId: answer?.pictureId,
    };
  }

  async getAll(): Promise<GetPortfolioDto[]> {
    const answer =  await this.prisma.portfolio.findMany({orderBy: {
      number: 'asc'
    }});

    return answer?.map(item => {
      return {
        id: item?.id,
        number: item?.number,
        title: item?.title,
        description: item?.description,
        status: item?.status,
        categoryName: item?.categoryName,
        pictureId: item?.pictureId,
      };
    })
  }

  async create(fileInfo?: {path: string, name: string, type: string}, data?: CreatePortfolioDto): Promise<Portfolio> {

    const picture = await this.addPicture(fileInfo);
    
    return await this.prisma.portfolio.create({
      data: {
        title: data?.title,
        description: data?.description,
        categoryName: data?.categoryName,
        status: data?.status,
        pictureId: picture?.id,
        categoryId: null,
      },
    });
  }

  async update(fileInfo?: {path: string, type: string, name: string}, data?: UpdatePortfolioDto): Promise<Portfolio> {
    const updateItem = await this.getById(data?.id);

    const picture = await this.addPicture(fileInfo);

    await this.prisma.picture.deleteMany({
      where : {
        id: updateItem?.pictureId || ''
      }
    });
    
    return await this.prisma.portfolio.update({
      where:{
        id: data.id,
      },
      data: {
        title: data?.title,
        description: data?.description,
        categoryName: data?.categoryName,
        status: data?.status,
        pictureId: picture?.id,
        categoryId: null,
      },
    });
  }

  async delete(id: string): Promise<Portfolio> {
    const deleteItem = await this.getById(id);

    await this.prisma.picture.deleteMany({
      where : {
        id: deleteItem?.pictureId || ''
      }
    });

    return await this.prisma.portfolio.delete({
      where: {id},
    });
  }

  async updateStatus(data: UpdatePortfolioStatusDto): Promise<GetPortfolioDto> {
    const currentItem = await this.getById(data?.portfolioId);
    if(!currentItem) return null;
    await this.prisma.portfolio.update({
      where:{
        id: data.portfolioId,
      },
      data: {
        status: data?.status ?? currentItem.status,
      },
    });

    return await this.getById(currentItem.id);
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

      await this.fileService.deleteFile(file?.path);
    }
    return picture || null;
  }
}