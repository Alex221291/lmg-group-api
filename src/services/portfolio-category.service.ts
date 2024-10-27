import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PortfolioCategory, Prisma } from '@prisma/client';

@Injectable()
export class PortfolioCategoryService {
  constructor(private prisma: PrismaService) {}

  async getPortfolioCategory(id: string): Promise<PortfolioCategory | null> {
    return this.prisma.portfolioCategory.findUnique({
      where: { id },
    });
  }

  async createPortfolioCategory(data: Prisma.PortfolioCategoryCreateInput): Promise<PortfolioCategory> {
    return this.prisma.portfolioCategory.create({
      data,
    });
  }

  async updatePortfolioCategory(id: string, data: Prisma.PortfolioCategoryUpdateInput): Promise<PortfolioCategory> {
    return this.prisma.portfolioCategory.update({
      where: { id },
      data,
    });
  }

  async deletePortfolioCategory(id: string): Promise<PortfolioCategory> {
    return this.prisma.portfolioCategory.delete({
      where: { id },
    });
  }
}
