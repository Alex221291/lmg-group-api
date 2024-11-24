import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { BuildService } from '../services/build.service';
import { CreateBuildDto } from '../dto/build/create-build.dto';

@Controller('build')
export class BuildController {
  constructor(private readonly buildService: BuildService) {}

  @Post()
  async create(@Body() data: CreateBuildDto) {
    return this.buildService.create(data);
  }

  @Get()
  async findAll(@Query('categoryAreaId') categoryAreaId: string) {
    return this.buildService.findAll(categoryAreaId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.buildService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CreateBuildDto) {
    return this.buildService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.buildService.remove(id);
  }
}
