import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { CategoryAreaService } from '../services/category-area.service';
import { CreateCategoryAreaDto } from '../dto/category-area/create-category-area.dto';

@Controller('category-area')
export class CategoryAreaController {
  constructor(private readonly categoryAreaService: CategoryAreaService) {}

  @Post()
  async create(@Body() data: CreateCategoryAreaDto) {
    return await this.categoryAreaService.create(data);
  }

  @Get()
  async findAll(@Query('categoryId') categoryId: string) {
    return await this.categoryAreaService.findAll(categoryId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryAreaService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CreateCategoryAreaDto) {
    return await this.categoryAreaService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoryAreaService.remove(id);
  }
}
