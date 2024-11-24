import { $Enums } from '@prisma/client';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class UpdateCategoryAreaDto {
  id?: string;
  categoryId?: string;
  areaId?: string;
  status?: $Enums.ContentSatus;
}