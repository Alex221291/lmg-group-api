import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { GetCategoryDto } from 'src/dto/category/get-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoriesService: CategoryService) {}

  @Post()
  create(@Body() data: CreateCategoryDto) {
    return this.categoriesService.create(data);
  }

  @Get()
  findAll(@Query('sectionId') sectionId: string): Promise<GetCategoryDto[]> {
    return this.categoriesService.findAll(sectionId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: CreateCategoryDto) {
    return this.categoriesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}