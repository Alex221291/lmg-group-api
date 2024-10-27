import { $Enums } from '@prisma/client';

export interface CreateNewsDto {
    title?: string;
    subtitle?: string;
    time?: string;
    video?: string;
    status: $Enums.ContentSatus;
    contentItems?: ItemDto[];
}

export interface ItemDto {
    text?: string;
    pictureName?: string;
    list?: ListDto;
  }

 export interface ListDto {
    title?: string;
    items?: string[];
} 

  