import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    Put,
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Tariff } from '@prisma/client';
import { CreateTariffDto } from 'src/dto/tariff/create-tariff.dto';
import { GetTariffDto } from 'src/dto/tariff/get-tariff.dto';
import { UpdateTariffDto } from 'src/dto/tariff/update-tariff.dto';
import { TariffService } from 'src/services/tariff.service';
  
  @ApiTags('Tariff')
  @Controller('tariff')
  export class TariffController {
    constructor(
      private readonly tariffService: TariffService
    ) {}
  
    @Post()
    async createTariff(@Body() tariff: CreateTariffDto): Promise<Tariff> {
      const result = await this.tariffService.createTariff(tariff);
      return result;
    }

    @Put()
    async updateTariff(@Body() tariff: UpdateTariffDto): Promise<Tariff> {
      const result = await this.tariffService.updateTariff(tariff);
      return result;
    }

    @Get('/:id')
    async getTariffById(@Param('id') id: string): Promise<GetTariffDto> {
      return this.tariffService.getById(id);
    }
  
    @Get()
    async getAll(): Promise<GetTariffDto[]> {
      return this.tariffService.getAll();
    }

    @Delete('/:id')
    async deletePaper(@Param('id') id: string): Promise<Tariff> {
      return this.tariffService.deleteTariff(id);
    }

  }