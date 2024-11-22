import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SectionService {
  constructor(private prisma: PrismaService) {}

  async getAllWithArea(): Promise< any | null> {
    return this.prisma.section.findMany({
      include: {
        sectionArea:{
          include:{
            area:{
            }
          }
        }
      }
    });
  }

  async getById(id: string): Promise< any | null> {
    return this.prisma.section.findUnique({
      where: { id },
    });
  }

  async create(data: any): Promise<any> {
    return this.prisma.section.create({
      data,
    });
  }

  async update(id: string, data: any): Promise<any> {
    return this.prisma.section.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<any> {
    return this.prisma.section.delete({
      where: { id },
    });
  }
}
