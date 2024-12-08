import { $Enums } from '@prisma/client';
import { ItemDto, ListDto } from '../news/create-news.dto';

export interface UpdateArticleDto {
    id: string;
    number: string;
    title?: string;
    subtitle?: string;
    pictureName?: string;
    pictureId?: string;
    time?: string;
    list?: ListDto[];
    status: $Enums.ContentSatus;
    videoId?: string;
    contentItems?: ItemDto[];
}

  