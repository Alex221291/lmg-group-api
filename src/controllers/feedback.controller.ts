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
import { CreateFeedbackDto } from 'src/dto/feedback/create-feedback.dto';
import { GetFeedbackDto } from 'src/dto/feedback/get-feedback.dto';
import { UpdateFeedbackStatusDto } from 'src/dto/feedback/update-feedback-status.dto';
import { UpdateFeedbackDto } from 'src/dto/feedback/update-feedback.dto';
import { FeedbackService } from 'src/services/feedback.service';
  
  @ApiTags('Feedback')
  @Controller('feedback')
  export class FeedbackController {
    constructor(
      private readonly feedbackService: FeedbackService
    ) {}
  
    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file: Express.Multer.File, @Body() data: CreateFeedbackDto) {
      const result = await this.feedbackService.create({path: file?.path, type: file?.mimetype, name:file?.originalname}, data)
      return result;
    }

    @Post('update')
    @UseInterceptors(FileInterceptor('file'))
    async update(@UploadedFile() file: Express.Multer.File, @Body() data: UpdateFeedbackDto) {

      const result = await this.feedbackService.update({path: file?.path, type: file?.mimetype, name: file?.originalname}, data);
      return result;
    }

    @Get('/:id')
    async getById(@Param('id') id: string): Promise<GetFeedbackDto> {
      return this.feedbackService.getById(id);
    }
  
    @Get()
    async getAll(): Promise<GetFeedbackDto[]> {
      return this.feedbackService.getAll();
    }

    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<any> {
      return this.feedbackService.delete(id);
    }

    @Put('status')
    async updateStatus(@Body() data: UpdateFeedbackStatusDto): Promise<GetFeedbackDto | null> {

      const result = await this.feedbackService.updateStatus(data);
      return result;
    }
  }