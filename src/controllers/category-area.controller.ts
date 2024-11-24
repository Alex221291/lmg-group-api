import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { CategoryAreaService } from '../services/category-area.service';
import { CreateCategoryAreaDto } from '../dto/category-area/create-category-area.dto';

@Controller('category-area')
export class CategoryAreaController {
  constructor(private readonly categoryAreaService: CategoryAreaService) {}

  @Post()
  create(@Body() data: CreateCategoryAreaDto) {
    return this.categoryAreaService.create(data);
  }

  @Get()
  findAll(@Query('categoryId') categoryId: string) {
    return this.categoryAreaService.findAll(categoryId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryAreaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: CreateCategoryAreaDto) {
    return this.categoryAreaService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryAreaService.remove(id);
  }
}
