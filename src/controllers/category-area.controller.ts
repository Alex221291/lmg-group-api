import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { CategoryAreaService } from '../services/category-area.service';
import { CreateCategoryAreaDto } from '../dto/category-area/create-category-area.dto';
import { UpdateCategoryAreaStatusDto } from 'src/dto/category-area/update-category-area-status.dto';

@Controller('category-area')
export class CategoryAreaController {
  constructor(private readonly categoryAreaService: CategoryAreaService) {}

  @Post('create')
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

  @Post('create')
  async update(@Body() data: CreateCategoryAreaDto) {
    return await this.categoryAreaService.update(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoryAreaService.remove(id);
  }

  @Put('status')
  async updateStatus(@Body() data: UpdateCategoryAreaStatusDto): Promise<any | null> {

    const result = await this.categoryAreaService.updateStatus(data);
    return result;
  }
}
