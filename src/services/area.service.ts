import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateAreaDto } from '../dto/area/create-area.dto';

@Injectable()
export class AreaService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAreaDto) {
    return this.prisma.area.create({ data });
  }

  findAll() {
    return this.prisma.area.findMany();
  }

  findOne(id: string) {
    return this.prisma.area.findUnique({ where: { id } });
  }

  update(id: string, data: CreateAreaDto) {
    return this.prisma.area.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.area.delete({ where: { id } });
  }
}
