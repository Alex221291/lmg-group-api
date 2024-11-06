import { $Enums } from "@prisma/client";

export interface GetNewsDto {
    id: string;
    number?: number;
    title?: string;
    pictureId?: string;
    subtitle?: string;
    time?: string;
    video?: string;
    createdAt?: Date;
    updatedAt?: Date;
    status: $Enums.ContentSatus;
    contentItems?: GetItemDto[];
}

export interface GetItemDto {
    text?: string;
    pictureId?: string;
    list?: GetListDto;
}


 export interface GetListDto {
    title?: string;
    items?: string[];
} 