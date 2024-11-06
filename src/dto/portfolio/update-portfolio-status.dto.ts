import { $Enums } from "@prisma/client";

export interface UpdatePortfolioStatusDto {
    portfolioId?: string;
    status?: $Enums.ContentSatus;
}