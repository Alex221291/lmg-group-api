import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { GetCategoryDto } from 'src/dto/category/get-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    return await this.prisma.category.create({ data });
  }

  async findAll(sectionId: string):Promise<GetCategoryDto[]> {
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

  async findOne(id: string) {
    return await this.prisma.category.findUnique({ where: { id } });
  }

  async update(id: string, data: CreateCategoryDto) {
    return await this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prisma.category.delete({ where: { id } });
  }
}