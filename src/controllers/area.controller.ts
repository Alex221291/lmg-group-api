import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AreaService } from '../services/area.service';
import { CreateAreaDto } from '../dto/area/create-area.dto';

@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  async create(@Body() data: CreateAreaDto) {
    return await this.areaService.create(data);
  }

  @Get()
  async findAll() {
    return await this.areaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.areaService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CreateAreaDto) {
    return await this.areaService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.areaService.remove(id);
  }
}
