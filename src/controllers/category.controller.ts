import { Controller, Get, Post, Body, Param, Delete, Put, Query, UploadedFile, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { GetCategoryDto } from 'src/dto/category/get-category.dto';
import { UpdateCategoryDto } from 'src/dto/category/update-category.dto';
import { UpdateCategoryStatusDto } from 'src/dto/category/update-category-status.dto';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(@Query('sectionId') sectionId: string): Promise<GetCategoryDto[]> {
    return await this.categoryService.getAll(sectionId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.getById(id);
  }

  @Post('create')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file', maxCount: 1 },
      { name: 'previewPictureFile', maxCount: 1 },
      { name: 'video', maxCount: 1 },
    ]),
  )
  async create(@UploadedFiles() files: { file?: Express.Multer.File[], video?: Express.Multer.File[], previewPictureFile?: Express.Multer.File[] }
  , @Body() data: CreateCategoryDto) {
    if(data?.list){
      data.list = typeof data.list === 'string' ? JSON.parse(data.list) : data.list;
    };
    const file = files.file ? files?.file[0] : null;
    const previewPicture = files.previewPictureFile ? files?.previewPictureFile[0] : null;
    const video = files?.video ? files?.video[0] : null;

    const fileInfo = {
      path: file?.path,
      name: file?.originalname,
      type: file?.mimetype,
    };

    const previewPictureFileInfo = {
      path: previewPicture?.path,
      name: previewPicture?.originalname,
      type: previewPicture?.mimetype,
    };

    const videoInfo = {
      path: video?.path,
      filename: video?.filename,
      originalname: video?.originalname,
    };
    return await this.categoryService.create(fileInfo, videoInfo, previewPictureFileInfo, data);
  }

  @Post('update')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file', maxCount: 1 },
      { name: 'previewPictureFile', maxCount: 1 },
      { name: 'video', maxCount: 1 },
    ]),
  )
  async update(@UploadedFiles() files: { file?: Express.Multer.File[]; video?: Express.Multer.File[], previewPictureFile?: Express.Multer.File[] },
   @Body() data: UpdateCategoryDto) {
    if(data?.list){
      data.list = typeof data.list === 'string' ? JSON.parse(data.list) : data.list;
    };
    const file = files.file ? files?.file[0] : null;
    const previewPicture = files.previewPictureFile ? files?.previewPictureFile[0] : null;
    const video = files?.video ? files?.video[0] : null;

    const fileInfo = {
      path: file?.path,
      name: file?.originalname,
      type: file?.mimetype,
    };

    const previewPictureFileInfo = {
      path: previewPicture?.path,
      name: previewPicture?.originalname,
      type: previewPicture?.mimetype,
    };

    const videoInfo = {
      path: video?.path,
      filename: video?.filename,
      originalname: video?.originalname,
    };
    return await this.categoryService.update(fileInfo, videoInfo, previewPictureFileInfo, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }

  @Put('status')
  async updateStatus(@Body() data: UpdateCategoryStatusDto): Promise<GetCategoryDto | null> {

    const result = await this.categoryService.updateStatus(data);
    return result;
  }
}
