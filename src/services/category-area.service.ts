import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateCategoryAreaDto } from '../dto/category-area/create-category-area.dto';

@Injectable()
export class CategoryAreaService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCategoryAreaDto) {
    return this.prisma.categoryArea.create({ data });
  }

  findAll(categoryId?: string) {
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
    return this.prisma.categoryArea.findMany(params);
  }

  findOne(id: string) {
    return this.prisma.categoryArea.findUnique({ where: { id } });
  }

  update(id: string, data: CreateCategoryAreaDto) {
    return this.prisma.categoryArea.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.categoryArea.delete({ where: { id } });
  }
}
