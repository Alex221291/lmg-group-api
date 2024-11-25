import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CategoryAreaService } from '../services/category-area.service';
import { CreateCategoryAreaDto } from '../dto/category-area/create-category-area.dto';
import { UpdateCategoryAreaStatusDto } from 'src/dto/category-area/update-category-area-status.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateCategoryAreaDto } from 'src/dto/category-area/update-category-area.dto';

@Controller('category-area')
export class CategoryAreaController {
  constructor(private readonly categoryAreaService: CategoryAreaService) {}

  @Get()
  async findAll(@Query('categoryId') categoryId: string) {
    return await this.categoryAreaService.findAll(categoryId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryAreaService.findOne(id);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() data: CreateCategoryAreaDto) {
    return await this.categoryAreaService.create({path: file?.path, type: file?.mimetype, name:file?.originalname}, data);
  }

  @Post('update')
  @UseInterceptors(FileInterceptor('file'))
  async update(@UploadedFile() file: Express.Multer.File, @Body() data: UpdateCategoryAreaDto) {
    return await this.categoryAreaService.update({path: file?.path, type: file?.mimetype, name:file?.originalname}, data);
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
