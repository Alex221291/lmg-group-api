import { $Enums } from '@prisma/client';
import { ItemDto } from './create-news.dto';

export interface UpdateNewsDto {
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

  