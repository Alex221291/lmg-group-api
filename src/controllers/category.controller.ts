import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { GetCategoryDto } from 'src/dto/category/get-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoriesService: CategoryService) {}

  @Post()
  async create(@Body() data: CreateCategoryDto) {
    return await this.categoriesService.create(data);
  }

  @Get()
  async findAll(@Query('sectionId') sectionId: string): Promise<GetCategoryDto[]> {
    return await this.categoriesService.findAll(sectionId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoriesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CreateCategoryDto) {
    return await this.categoriesService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoriesService.remove(id);
  }
}