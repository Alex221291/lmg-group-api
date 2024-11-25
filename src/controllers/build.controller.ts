import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BuildService } from '../services/build.service';
import { CreateBuildDto } from '../dto/build/create-build.dto';
import { UpdateBuildStatusDto } from 'src/dto/build/update-build-status.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateBuildDto } from 'src/dto/build/update-build.dto';

@Controller('build')
export class BuildController {
  constructor(private readonly buildService: BuildService) {}

  @Get()
  async findAll(@Query('categoryAreaId') categoryAreaId: string) {
    return await this.buildService.findAll(categoryAreaId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.buildService.findOne(id);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() data: CreateBuildDto) {
    if(data?.list){
      data.list = typeof data.list === 'string' ? JSON.parse(data.list) : data.list;
    };
    if(data?.coordinates){
      data.coordinates = typeof data.coordinates === 'string' ? JSON.parse(data.coordinates) : data.list;
    };
    
    return await this.buildService.create({path: file?.path, type: file?.mimetype, name:file?.originalname}, data);
  }

  @Post('update')
  @UseInterceptors(FileInterceptor('file'))
  async update(@UploadedFile() file: Express.Multer.File, @Body() data: UpdateBuildDto) {
    if(data?.list){
      data.list = typeof data.list === 'string' ? JSON.parse(data.list) : data.list;
    };
    if(data?.coordinates){
      data.coordinates = typeof data.coordinates === 'string' ? JSON.parse(data.coordinates) : data.list;
    };
    
    return await this.buildService.update({path: file?.path, type: file?.mimetype, name:file?.originalname}, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.buildService.remove(id);
  }

  @Put('status')
  async updateStatus(@Body() data: UpdateBuildStatusDto): Promise<any | null> {

    const result = await this.buildService.updateStatus(data);
    return result;
  }
}
