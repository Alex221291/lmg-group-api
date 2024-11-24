import { $Enums } from "@prisma/client";

export interface GetCategoryAreaDto {
    id: string;
    categoryId: string;
    areaId: string;
    status: $Enums.ContentSatus;
    createdAt: Date;
    updatedAt: Date;
    area: {
      id: string;
      number: number;
      lat: number;
      lon: number;
      name: string;
      title: string;
      description: string;
      subTitle: string;
      status?: $Enums.ContentSatus;
      pictureId: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
  }
  