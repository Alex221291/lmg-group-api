import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateCategoryAreaDto } from '../dto/category-area/create-category-area.dto';
import { UpdateCategoryAreaDto } from 'src/dto/category-area/update-category-area.dto';
import { UpdateCategoryAreaStatusDto } from 'src/dto/category-area/update-category-area-status.dto';

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

  async update(data: UpdateCategoryAreaDto) {
    return await this.prisma.categoryArea.update({ where: { id: data.id }, data:{
      areaId: data?.areaId || null,
      categoryId: data?.categoryId || null,
      status: data?.status
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
}
