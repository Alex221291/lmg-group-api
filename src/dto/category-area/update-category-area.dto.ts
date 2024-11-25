import { $Enums } from '@prisma/client';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export interface UpdateCategoryAreaDto {
  id: string;
  categoryId: string;
  areaId: string;
  title?: string;
  description?: string;
  subTitle?: string;
  status?: $Enums.ContentSatus;
}