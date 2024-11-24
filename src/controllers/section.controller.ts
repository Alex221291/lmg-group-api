import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SectionService } from '../services/section.service';
import { CreateSectionDto } from '../dto/section/create-section.dto';
import { GetSectionDto } from 'src/dto/section/get-section.dto';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionsService: SectionService) {}

  @Post()
  create(@Body() data: CreateSectionDto) {
    return this.sectionsService.create(data);
  }

  @Get()
  findAll(): Promise<GetSectionDto[]> {
    return this.sectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: CreateSectionDto) {
    return this.sectionsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionsService.remove(id);
  }
}