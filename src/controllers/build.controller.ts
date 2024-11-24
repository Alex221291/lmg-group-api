import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { BuildService } from '../services/build.service';
import { CreateBuildDto } from '../dto/build/create-build.dto';

@Controller('build')
export class BuildController {
  constructor(private readonly buildService: BuildService) {}

  @Post()
  async create(@Body() data: CreateBuildDto) {
    return await this.buildService.create(data);
  }

  @Get()
  async findAll(@Query('categoryAreaId') categoryAreaId: string) {
    return await this.buildService.findAll(categoryAreaId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.buildService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CreateBuildDto) {
    return await this.buildService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.buildService.remove(id);
  }
}
