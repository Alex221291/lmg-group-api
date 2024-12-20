import { $Enums } from '@prisma/client';
import { ItemDto, ListDto } from '../news/create-news.dto';

export interface CreateArticleDto {
    title?: string;
    subtitle?: string;
    pictureName?: string;
    time?: string;
    list?: ListDto[];
    status: $Enums.ContentSatus;
    contentItems?: ItemDto[];
}

  