import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AreaService } from '../services/area.service';
import { CreateAreaDto } from '../dto/area/create-area.dto';

@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  create(@Body() data: CreateAreaDto) {
    return this.areaService.create(data);
  }

  @Get()
  findAll() {
    return this.areaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: CreateAreaDto) {
    return this.areaService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areaService.remove(id);
  }
}
