import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import {  } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { SectionService } from 'src/services/section.service';

@Controller('section')
export class SectionController {
  constructor(private sectionService: SectionService) {}

  @Get(':id')
  getById(@Param('id') id: string): Promise< | null> {
    return this.sectionService.getById(id);
  }

  @Get()
  getAllWithArea(@Param('id') id: string): Promise< | null> {
    return this.sectionService.getAllWithArea();
  }

  @Post()
  create(@Body() data: any): Promise<any> {
    return this.sectionService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any): Promise<any> {
    return this.sectionService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<any> {
    return this.sectionService.delete(id);
  }
}
