import { $Enums } from "@prisma/client";

export interface GetSectionDto {
    id: string;
    number: number;
    title?: string;
    description?: string;
    status?: $Enums.ContentSatus;
    createdAt?: Date;
    updatedAt?: Date;
}  