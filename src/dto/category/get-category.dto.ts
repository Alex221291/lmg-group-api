import { $Enums } from "@prisma/client";

export interface GetCategoryDto {
    id: string;
    number: number;
    title: string;
    description: string;
    subtitle: string;
    sectionId: string;
    pictureId?: string;
    previewPictureId?: string;
    iconPictureId: string | null;
    videoId?: string;
    list?: { title?: string; items?: { caption?: string; subcaption?: string }[] };
    status?: $Enums.ContentSatus;
    createdAt?: Date;
    updatedAt?: Date;
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
    }[];
    seoTitle?: string;
    seoDescription?: string;
}
  