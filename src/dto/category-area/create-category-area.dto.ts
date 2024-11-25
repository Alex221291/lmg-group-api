import { $Enums } from '@prisma/client';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCategoryAreaDto {
  categoryId?: string | null;
  areaId?: string | null;
  title?: string;
  description?: string;
  subTitle?: string;
  status?: $Enums.ContentSatus;
}