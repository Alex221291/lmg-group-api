import { $Enums } from '@prisma/client';
import { ItemDto, ListDto } from './create-news.dto';

export interface UpdateNewsDto {
    id: string;
    number: string;
    title?: string;
    subtitle?: string;
    pictureName?: string;
    pictureId?: string;
    time?: string;
    videoId?: string;
    list?: ListDto[];
    status: $Enums.ContentSatus;
    contentItems?: ItemDto[];
}

  