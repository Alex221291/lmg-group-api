import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PortfolioCategoryService } from '../services/portfolio-category.service';
import { PortfolioCategory } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Controller('portfolio-categories')
export class PortfolioCategoryController {
  constructor(private portfolioCategoryService: PortfolioCategoryService) {}

  @Get(':id')
  getPortfolioCategory(@Param('id') id: string): Promise<PortfolioCategory | null> {
    return this.portfolioCategoryService.getPortfolioCategory(id);
  }

  @Post()
  createPortfolioCategory(@Body() data: Prisma.PortfolioCategoryCreateInput): Promise<PortfolioCategory> {
    return this.portfolioCategoryService.createPortfolioCategory(data);
  }

  @Put(':id')
  updatePortfolioCategory(@Param('id') id: string, @Body() data: Prisma.PortfolioCategoryUpdateInput): Promise<PortfolioCategory> {
    return this.portfolioCategoryService.updatePortfolioCategory(id, data);
  }

  @Delete(':id')
  deletePortfolioCategory(@Param('id') id: string): Promise<PortfolioCategory> {
    return this.portfolioCategoryService.deletePortfolioCategory(id);
  }
}
