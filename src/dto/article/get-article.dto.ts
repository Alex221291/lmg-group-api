import { $Enums } from "@prisma/client";
import { GetItemDto, GetListDto } from "../news/get-news.dto";

export interface GetArticleDto {
    id: string;
    number?: number;
    title?: string;
    subtitle?: string;
    pictureId?: string;
    time?: string;
    videoId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    list?: GetListDto[];
    status: $Enums.ContentSatus;
    contentItems?: GetItemDto[];
    urlTitle?: string;
}