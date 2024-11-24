import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateAreaDto } from '../dto/area/create-area.dto';

@Injectable()
export class AreaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAreaDto) {
    return await this.prisma.area.create({ data });
  }

  async findAll() {
    return await this.prisma.area.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.area.findUnique({ where: { id } });
  }

  async update(id: string, data: CreateAreaDto) {
    return await this.prisma.area.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prisma.area.delete({ where: { id } });
  }
}
