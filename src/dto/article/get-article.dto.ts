import { $Enums } from "@prisma/client";
import { GetItemDto } from "../news/get-news.dto";

export interface GetArticleDto {
    id: string;
    number?: number;
    title?: string;
    subtitle?: string;
    pictureId?: string;
    time?: string;
    video?: string;
    createdAt?: Date;
    updatedAt?: Date;
    status: $Enums.ContentSatus;
    contentItems?: GetItemDto[];
}