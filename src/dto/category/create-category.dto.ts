import { $Enums } from '@prisma/client';

export interface CreateCategoryDto {
  title?: string;
  description?: string;
  subtitle?: string;
  sectionId?: string;
  list?: { title?: string; items?: { caption?: string; subcaption?: string }[] };
  status?: $Enums.ContentSatus;
  seoTitle?: string;
  seoDescription?: string;
}