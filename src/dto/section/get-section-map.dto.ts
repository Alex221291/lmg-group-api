import { $Enums } from "@prisma/client";

export interface GetSectionMapDto {
    id: string;
    number: number;
    title?: string;
    description?: string;
    status?: $Enums.ContentSatus;
    createdAt?: Date;
    updatedAt?: Date;
    urlTitle?: string;
    build: {
        id: string;
        categoryId?: string;
        categoryAreaId?: string;
        number: number;
        coordinates? : [number, number][];
        buildAreaCoordinates?: [number, number][];
        iconPictureId: string | null;
        name: string;
        wDescription: string | null;
        pictureId: string | null;
        gTitle: string | null;
        gSubTitle: string | null;
        list: {title:string, value: string}[];
        status: $Enums.ContentSatus;
        createdAt: Date;
        updatedAt: Date;
        urlBuild?: string;
        urlCategory?: string;
        urlCategoryArea?: string;
    }[];
    list?: {
        title?: string;
        value?: string;
    }[];
}  