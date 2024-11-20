import { $Enums } from '@prisma/client';
import { ItemDto, ListDto } from '../news/create-news.dto';

export interface UpdateArticleDto {
    id: string;
    number: string;
    title?: string;
    subtitle?: string;
    pictureName?: string;
    time?: string;
    video?: string;
    list?: ListDto[];
    status: $Enums.ContentSatus;
    contentItems?: ItemDto[];
}

  