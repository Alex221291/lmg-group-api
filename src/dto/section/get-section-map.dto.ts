import { $Enums } from "@prisma/client";

export interface GetSectionMapDto {
    id: string;
    number: number;
    title?: string;
    description?: string;
    status?: $Enums.ContentSatus;
    createdAt?: Date;
    updatedAt?: Date;
    build: {
        id: string;
        categoryId?: string;
        categoryAreaId?: string;
        name?: string;
        coordinates?: [number, number][];
        list?: {title?:string, value?: string}[];
    }[];
    list?: {
        title?: string;
        value?: string;
    }[];
}  