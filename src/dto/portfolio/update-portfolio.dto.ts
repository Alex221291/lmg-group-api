import { $Enums } from "@prisma/client";

export interface UpdatePortfolioDto {
    id: string;
    title?: string;
    description?: string;
    categoryId?: string;
    pictureId?: string;
    status: $Enums.ContentSatus;
}