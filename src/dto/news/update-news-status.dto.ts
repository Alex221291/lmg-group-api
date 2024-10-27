import { $Enums } from "@prisma/client";

export interface UpdateNewsStatusDto {
    newsId?: string;
    status?: $Enums.ContentSatus;
}