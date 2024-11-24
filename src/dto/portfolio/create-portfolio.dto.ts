import { $Enums } from "@prisma/client";

export interface CreatePortfolioDto {
    title?: string;
    description?: string;
    categoryId?: string;
    status: $Enums.ContentSatus;
}