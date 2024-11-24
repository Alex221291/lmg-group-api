import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateBuildDto } from '../dto/build/create-build.dto';
import { GetBuildDto } from 'src/dto/build/get-build.dto';

@Injectable()
export class BuildService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateBuildDto) {
    return this.prisma.build.create({ 
        data:{
            gTitle: data?.gTitle, 
        }
    });
  }

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

  findOne(id: string) {
    return this.prisma.build.findUnique({ where: { id } });
  }

  update(id: string, data: CreateBuildDto) {
    return this.prisma.build.update({ where: { id }, 
        data:{
            gTitle: data?.gTitle, 
        }
    });
  }

  remove(id: string) {
    return this.prisma.build.delete({ where: { id } });
  }
}
