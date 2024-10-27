import { $Enums } from "@prisma/client";

export interface UpdateArticleStatusDto {
    articleId?: string;
    status?: $Enums.ContentSatus;
}