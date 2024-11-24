import { $Enums } from "@prisma/client";

export interface UpdateCategoryAreaStatusDto {
    categoryAreaId?: string;
    status?: $Enums.ContentSatus;
}