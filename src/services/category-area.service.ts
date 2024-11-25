import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateCategoryAreaDto } from '../dto/category-area/create-category-area.dto';
import { UpdateCategoryAreaDto } from 'src/dto/category-area/update-category-area.dto';
import { UpdateCategoryAreaStatusDto } from 'src/dto/category-area/update-category-area-status.dto';
import { FileService } from './file.service';
import { createReadStream } from 'fs';

@Injectable()
export class CategoryAreaService {
  constructor(private prisma: PrismaService,  
    private fileService: FileService) {}

  async findAll(categoryId?: string) {
    let params: any = {
      include: {
        area: {},
      },
      orderBy: {
        createdAt: 'asc',
      }
    };
    if(categoryId){
      params = {...params, where:{categoryId}};
    }
    return await this.prisma.categoryArea.findMany(params);
  }

  async findOne(id: string) {
    return await this.prisma.categoryArea.findUnique({ where: { id },
      include: {
        area: {},
      }, });
  }

  async create(fileInfo?: {path?: string, name?: string, type?: string}, data?: CreateCategoryAreaDto) {
    const picture = await this.addPicture(fileInfo);
    return await this.prisma.categoryArea.create({ data :{...data, pictureId: picture?.id || null }});
  }

  async update(fileInfo?: {path?: string, name?: string, type?: string}, data?: UpdateCategoryAreaDto) {
    const updateItem = await this.findOne(data?.id);

    const picture = await this.addPicture(fileInfo);
    
    await this.prisma.picture.deleteMany({
      where : {
        id: updateItem?.pictureId || ''
      }
    });
    return await this.prisma.categoryArea.update({ where: { id: data.id }, data:{
      ...data, pictureId: picture?.id || null,
    } });
  }

  async remove(id: string) {
    return await this.prisma.categoryArea.delete({ where: { id } });
  }

  async updateStatus(data: UpdateCategoryAreaStatusDto): Promise<any> {
    const currentItem = await this.findOne(data?.categoryAreaId);
    if(!currentItem) return null;
    await this.prisma.categoryArea.update({
      where:{
        id: data.categoryAreaId,
      },
      data: {
        status: data?.status ?? currentItem.status,
      },
    });

    return await this.findOne(currentItem.id);
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
    console.log(picture);
    return picture || null;
  }
}
