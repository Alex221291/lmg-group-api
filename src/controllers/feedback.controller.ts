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
    UploadedFiles,
    BadRequestException,
  } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
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
    @UseInterceptors(
      FileFieldsInterceptor([
        { name: 'file', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ]),
    )
    async create(
      @UploadedFiles() files: { file?: Express.Multer.File[]; video?: Express.Multer.File[] },
      @Body() data: CreateFeedbackDto,
    ) {
      const file = files.file ? files?.file[0] : null;
      const video = files?.video ? files?.video[0] : null;
  
      const fileInfo = {
        path: file?.path,
        name: file?.originalname,
        type: file?.mimetype,
      };
  
      const videoInfo = {
        path: video?.path,
        filename: video?.filename,
        originalname: video?.originalname,
      };
  
      const result = await this.feedbackService.create(fileInfo, videoInfo, data);
      return result;
    }

    @Post('update')
    @UseInterceptors(
      FileFieldsInterceptor([
        { name: 'file', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ]),
    )
    async update(@UploadedFiles() files: { file?: Express.Multer.File[]; video?: Express.Multer.File[] },
    @Body() data: UpdateFeedbackDto,
  ) {
    const file = files.file ? files?.file[0] : null;
    const video = files?.video ? files?.video[0] : null;

    const fileInfo = {
      path: file?.path,
      name: file?.originalname,
      type: file?.mimetype,
    };

    const videoInfo = {
      path: video?.path,
      filename: video?.filename,
      originalname: video?.originalname,
    };

    const result = await this.feedbackService.update(fileInfo, videoInfo, data);
    return result;
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
  