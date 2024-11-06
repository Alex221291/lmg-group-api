import { $Enums } from '@prisma/client';
import { ItemDto } from '../news/create-news.dto';

export interface CreateArticleDto {
    title?: string;
    subtitle?: string;
    pictureName?: string;
    time?: string;
    video?: string;
    status: $Enums.ContentSatus;
    contentItems?: ItemDto[];
}

  