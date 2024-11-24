import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateSectionDto } from '../dto/section/create-section.dto';
import { GetSectionDto } from 'src/dto/section/get-section.dto';

@Injectable()
export class SectionService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateSectionDto) {
    return this.prisma.section.create({ data });
  }

  findAll():Promise<GetSectionDto[] | []> {
    return this.prisma.section.findMany();
  }

  findOne(id: string) {
    return this.prisma.section.findUnique({ where: { id } });
  }

  update(id: string, data: CreateSectionDto) {
    return this.prisma.section.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.section.delete({ where: { id } });
  }
}
