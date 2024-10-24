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
import { Promotion } from '@prisma/client';
import { CreatePromotionDto } from 'src/dto/promotion/create-promotion.dto';
import { GetPromotionDto } from 'src/dto/promotion/get-promotion.dto';
import { UpdatePromotionDto } from 'src/dto/promotion/update-promotion.dto';
import { PromotionService } from 'src/services/promotion.service';
  
  @ApiTags('Promotion')
  @Controller('promotion')
  export class PromotionController {
    constructor(
      private readonly promotionService: PromotionService
    ) {}
  
    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async CreatePromotion(@UploadedFile() file: Express.Multer.File, @Body() promotion: CreatePromotionDto) {
      console.log(file);
      const result = await this.promotionService.createPromotion({path: file?.path, type: file?.mimetype}, promotion)
      return result;
    }

    @Post('update')
    @UseInterceptors(FileInterceptor('file'))
    async updatePromotion(@UploadedFile() file: Express.Multer.File, @Body() promotion: UpdatePromotionDto) {
      console.log(file);
      const result = await this.promotionService.updatePromotion({path: file?.path, type: file?.mimetype}, promotion);
      return result;
    }

    @Get('/:id')
    async getPromotionById(@Param('id') id: string): Promise<GetPromotionDto> {
      return this.promotionService.getById(id);
    }
  
    @Get()
    async getAll(): Promise<GetPromotionDto[]> {
      return this.promotionService.getAll();
    }

    @Delete('/:id')
    async deletePromotion(@Param('id') id: string): Promise<Promotion> {
      return this.promotionService.deletePromotion(id);
    }

  }