import { $Enums } from "@prisma/client";

export interface CreatePortfolioDto {
    title?: string;
    description?: string;
    categoryName?: string;
    status: $Enums.ContentSatus;
}