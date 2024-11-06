import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";

export interface GetPortfolioDto {
    id: string;
    number?: number;
    title?: string;
    description?: string;
    categoryName?: string;
    status: $Enums.ContentSatus;
    pictureId?: string;
}