import { $Enums } from '@prisma/client';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCategoryAreaDto {
  categoryId?: string;
  areaId?: string;
  status?: $Enums.ContentSatus;
}