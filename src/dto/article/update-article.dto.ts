import { $Enums } from '@prisma/client';
import { ItemDto } from '../news/create-news.dto';

export interface UpdateArticleDto {
    id: string;
    number: string;
    title?: string;
    subtitle?: string;
    pictureName?: string;
    time?: string;
    video?: string;
    createdAt: string;
    updatedAt: string;
    status: $Enums.ContentSatus;
    contentItems?: ItemDto[];
}

  