import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SectionService } from '../services/section.service';
import { CreateSectionDto } from '../dto/section/create-section.dto';
import { GetSectionDto } from 'src/dto/section/get-section.dto';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionsService: SectionService) {}

  @Post()
  async create(@Body() data: CreateSectionDto) {
    return await this.sectionsService.create(data);
  }

  @Get()
  async findAll(): Promise<GetSectionDto[]> {
    return await this.sectionsService.getAllMaps();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.sectionsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CreateSectionDto) {
    return await this.sectionsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.sectionsService.remove(id);
  }

  @Get('map/:id')
  async getMap(@Param('id') id: string) {
    return await this.sectionsService.getMap(id);
  }
}