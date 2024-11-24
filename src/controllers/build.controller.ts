import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { BuildService } from '../services/build.service';
import { CreateBuildDto } from '../dto/build/create-build.dto';

@Controller('build')
export class BuildController {
  constructor(private readonly buildService: BuildService) {}

  @Post()
  create(@Body() data: CreateBuildDto) {
    return this.buildService.create(data);
  }

  @Get()
  findAll(@Query('categoryAreaId') categoryAreaId: string) {
    return this.buildService.findAll(categoryAreaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buildService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: CreateBuildDto) {
    return this.buildService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buildService.remove(id);
  }
}
