import { $Enums } from "@prisma/client";

export interface UpdateCategoryStatusDto {
    categoryId?: string;
    status?: $Enums.ContentSatus;
}