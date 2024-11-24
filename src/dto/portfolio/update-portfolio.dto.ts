import { $Enums } from "@prisma/client";

export interface UpdatePortfolioDto {
    id: string;
    title?: string;
    description?: string;
    categoryId?: string;
    status: $Enums.ContentSatus;
}