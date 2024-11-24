import { IsString, IsOptional, IsInt, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  title?: string;
  description?: string;
  subtitle?: string;
  sectionId?: string;
}