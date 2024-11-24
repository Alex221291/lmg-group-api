import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateSectionDto } from '../dto/section/create-section.dto';
import { GetSectionDto } from 'src/dto/section/get-section.dto';

@Injectable()
export class SectionService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSectionDto) {
    return await this.prisma.section.create({ data });
  }

  async findAll():Promise<GetSectionDto[] | []> {
    return await this.prisma.section.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.section.findUnique({ where: { id } });
  }

  async update(id: string, data: CreateSectionDto) {
    return await this.prisma.section.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prisma.section.delete({ where: { id } });
  }
}
