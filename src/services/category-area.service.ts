import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateCategoryAreaDto } from '../dto/category-area/create-category-area.dto';

@Injectable()
export class CategoryAreaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryAreaDto) {
    return await this.prisma.categoryArea.create({ data });
  }

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
    return await this.prisma.categoryArea.findUnique({ where: { id } });
  }

  async update(id: string, data: CreateCategoryAreaDto) {
    return await this.prisma.categoryArea.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prisma.categoryArea.delete({ where: { id } });
  }
}
