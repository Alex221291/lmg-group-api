import { $Enums } from "@prisma/client";

export interface GetPortfolioDto {
    id: string;
    number?: number;
    title?: string;
    description?: string;
    categoryId?: string;
    status: $Enums.ContentSatus;
    pictureId?: string;
}