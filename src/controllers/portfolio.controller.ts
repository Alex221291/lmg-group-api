import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    UseInterceptors,
    UploadedFile,
    Put,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Portfolio } from '@prisma/client';
import { CreatePortfolioDto } from 'src/dto/portfolio/create-portfolio.dto';
import { GetPortfolioDto } from 'src/dto/portfolio/get-portfolio.dto';
import { UpdatePortfolioStatusDto } from 'src/dto/portfolio/update-portfolio-status.dto';
import { UpdatePortfolioDto } from 'src/dto/portfolio/update-portfolio.dto';
import { PortfolioService } from 'src/services/portfolio.service';
  
  @ApiTags('Portfolio')
  @Controller('portfolio')
  export class PortfolioController {
    constructor(
      private readonly portfolioService: PortfolioService
    ) {}
  
    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file: Express.Multer.File, @Body() data: CreatePortfolioDto) {

      const result = await this.portfolioService.create({path: file?.path, type: file?.mimetype, name:file?.originalname}, data)
      return result;
    }

    @Post('update')
    @UseInterceptors(FileInterceptor('file'))
    async update(@UploadedFile() file: Express.Multer.File, @Body() data: UpdatePortfolioDto) {

      const result = await this.portfolioService.update({path: file?.path, type: file?.mimetype, name: file?.originalname}, data);
      return result;
    }

    @Get('/:id')
    async getById(@Param('id') id: string): Promise<GetPortfolioDto> {
      return this.portfolioService.getById(id);
    }
  
    @Get()
    async getAll(): Promise<GetPortfolioDto[]> {
      return this.portfolioService.getAll();
    }

    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<Portfolio> {
      return this.portfolioService.delete(id);
    }

    @Put('status')
    async updateStatus(@Body() data: UpdatePortfolioStatusDto): Promise<GetPortfolioDto | null> {

      const result = await this.portfolioService.updateStatus(data);
      return result;
    }
  }