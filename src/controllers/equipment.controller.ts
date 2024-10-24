import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Equipment } from '@prisma/client';
import { CreateEquipmentDto } from 'src/dto/equipment/create-equipment.dto';
import { GetEquipmentDto } from 'src/dto/equipment/get-equipment.dto';
import { UpdateEquipmentDto } from 'src/dto/equipment/update-equipment.dto';
import { EquipmentService } from 'src/services/equipment.service';
  
  @ApiTags('Equipment')
  @Controller('equipment')
  export class EquipmentController {
    constructor(
      private readonly equipmentService: EquipmentService
    ) {}
  
    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async CreateEquipment(@UploadedFile() file: Express.Multer.File, @Body() equipment: CreateEquipmentDto) {
      console.log(file);
      const result = await this.equipmentService.createEquipment({path: file?.path, type: file?.mimetype}, equipment);
      return result;
    }

    @Post('update')
    @UseInterceptors(FileInterceptor('file'))
    async updateEquipment(@UploadedFile() file: Express.Multer.File, @Body() equipment: UpdateEquipmentDto) {
      console.log(file);
      const result = await this.equipmentService.updateEquipment({path: file?.path, type: file?.mimetype}, equipment);
      return result;
    }

    @Get('/:id')
    async getEquipmentById(@Param('id') id: string): Promise<GetEquipmentDto> {
      return this.equipmentService.getById(id);
    }
  
    @Get()
    async getAll(): Promise<GetEquipmentDto[]> {
      return this.equipmentService.getAll();
    }

    @Delete('/:id')
    async deleteEquipment(@Param('id') id: string): Promise<Equipment> {
      return this.equipmentService.deleteEquipment(id);
    }

  }