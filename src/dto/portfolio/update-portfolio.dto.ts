import { $Enums } from "@prisma/client";

export interface UpdatePortfolioDto {
    id: string;
    title?: string;
    description?: string;
    categoryName?: string;
    status: $Enums.ContentSatus;
}