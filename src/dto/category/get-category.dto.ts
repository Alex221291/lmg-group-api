import { $Enums } from "@prisma/client";

export interface GetCategoryDto {
    id: string;
    number: number;
    title: string;
    description: string;
    subtitle: string;
    sectionId: string;
    pictureId?: string;
    videoId?: string;
    list?: { title: string; items: { caption: string; subcaption: string }[] };
    status?: $Enums.ContentSatus;
    createdAt?: Date;
    updatedAt?: Date;
}
  