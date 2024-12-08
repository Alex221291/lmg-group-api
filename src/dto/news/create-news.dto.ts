import { $Enums } from '@prisma/client';

export interface CreateNewsDto {
    title?: string;
    subtitle?: string;
    pictureName? : string;
    time?: string;
    list?: ListDto[];
    status: $Enums.ContentSatus;
    contentItems?: ItemDto[];
}

export interface ItemDto {
    text?: string;
    pictureId?: string;
    pictureName?: string;
    list?: ListDto;
  }

 export interface ListDto {
    title?: string;
    items?: string[];
} 

  