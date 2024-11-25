import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateBuildDto } from '../dto/build/create-build.dto';
import { GetBuildDto } from 'src/dto/build/get-build.dto';
import { UpdateBuildStatusDto } from 'src/dto/build/update-build-status.dto';
import { FileService } from './file.service';
import { createReadStream } from 'fs';
import { UpdateBuildDto } from 'src/dto/build/update-build.dto';

@Injectable()
export class BuildService {
  constructor(private prisma: PrismaService,
    private fileService: FileService
  ) {}

  async findAll(categoryAreaId?: string): Promise<GetBuildDto[]> {
    let params = {};
    if (categoryAreaId) {
      params = { ...params, where: { categoryAreaId } };
    }

    const builds = await this.prisma.build.findMany(params);
    
    return builds.map(build => ({
      id: build.id,
      number: build.number,
      coordinates: build.coordinates ? JSON.parse(build.coordinates as unknown as string) : [],
      name: build.name,
      wDescription: build.wDescription,
      pictureId: build.pictureId,
      gTitle: build.gTitle,
      gSubTitle: build.gSubTitle,
      list: build.list ? JSON.parse(build.list as unknown as string) : [],
      status: build.status,
      categoryAreaId: build.categoryAreaId,
      createdAt: build.createdAt,
      updatedAt: build.updatedAt
    }));
  }

  async findOne(id: string) {
    const build = await this.prisma.build.findUnique({ where: { id } });
    return{
      id: build.id,
      number: build.number,
      coordinates: build.coordinates ? JSON.parse(build.coordinates as unknown as string) : [],
      name: build.name,
      wDescription: build.wDescription,
      pictureId: build.pictureId,
      gTitle: build.gTitle,
      gSubTitle: build.gSubTitle,
      list: build.list ? JSON.parse(build.list as unknown as string) : [],
      status: build.status,
      categoryAreaId: build.categoryAreaId,
      createdAt: build.createdAt,
      updatedAt: build.updatedAt
    };
  }

  async create(fileInfo?: {path?: string, name?: string, type?: string}, data?: CreateBuildDto) {
    const picture = await this.addPicture(fileInfo);
    return await this.prisma.build.create({ 
        data:{
          categoryAreaId: data?.categoryAreaId || null,
          name: data?.name,
          wDescription: data?.wDescription,
          gTitle: data?.gTitle,
          gSubTitle: data?.gSubTitle,
          status: data?.status,
          coordinates: data?.list ? JSON.stringify(data.coordinates) : undefined,
          list: data?.list ? JSON.stringify(data.list) : undefined,
          pictureId: picture?.id || null,
        }
    });
  }

  async update(fileInfo?: {path?: string, name?: string, type?: string}, data?: UpdateBuildDto) {
    const updateItem = await this.findOne(data?.id);
    const picture = await this.addPicture(fileInfo);

    await this.prisma.picture.deleteMany({
      where : {
        id: updateItem?.pictureId || ''
      }
    });

    return await this.prisma.build.update({ where: { id: data.id }, 
        data:{
          categoryAreaId: data?.categoryAreaId || null,
          name: data?.name,
          wDescription: data?.wDescription,
          gTitle: data?.gTitle,
          gSubTitle: data?.gSubTitle,
          status: data?.status,
          coordinates: data?.list ? JSON.stringify(data.coordinates) : undefined,
          list: data?.list ? JSON.stringify(data.list) : undefined,
          pictureId: picture?.id || null,
        }
    });
  }

  async remove(id: string) {
    return await this.prisma.build.delete({ where: { id } });
  }

  async updateStatus(data: UpdateBuildStatusDto): Promise<any> {
    const currentItem = await this.findOne(data?.buildId);
    if(!currentItem) return null;
    await this.prisma.build.update({
      where:{
        id: data.buildId,
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
