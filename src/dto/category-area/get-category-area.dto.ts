import { $Enums } from "@prisma/client";

export interface GetCategoryAreaDto {
    id: string;
    categoryId: string;
    areaId: string;
    title?: string;
    description?: string;
    subTitle?: string;
    pictureId?: string | null;
    status?: $Enums.ContentSatus;
    createdAt: Date;
    updatedAt: Date;
    area: {
      id: string;
      number: number;
      lat?: number;
      lon?: number;
      name?: string;
      status?: $Enums.ContentSatus;
      createdAt: Date;
      updatedAt: Date;
    };
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
    list?: {
      title?: string;
      value?: string;
    }[];
    seoTitle?: string;
    seoDescription?: string;
  }
  