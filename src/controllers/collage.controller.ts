import {
    Controller,
    Get,
    Param,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import { UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CollageService } from 'src/services/collage.service';
  
  @ApiTags('Collage')
  @Controller('collage')
  export class CollageController {
    constructor(
      private readonly collageService: CollageService
    ) {}

    @Post('/:type')
    @UseInterceptors(FilesInterceptor('files[]'))
    async createPaper(@UploadedFiles() files: Express.Multer.File[], @Param('type') type: CollageTypes): Promise<string[]> {
      console.log(files);
      const filesInfo = files?.map(file => {
        return {
          path: file?.path,
          type: file?.mimetype
        }
      });
      return await this.collageService.createCollage(type, filesInfo);
    }

    @Get('/:type')
    async getCollage(@Param('type') type: CollageTypes): Promise<string[]> {
      return await this.collageService.getAll(type);
    }
  }