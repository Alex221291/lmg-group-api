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
      name?: string;
      coordiantes: [number, number][];
      list?: {title?:string, value?: string}[];
    }[];
    list?: {
      title?: string;
      value?: string;
    }[];
  }
  