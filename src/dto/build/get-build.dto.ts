import { $Enums } from "@prisma/client";

export interface GetBuildDto {
    id: string;
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
    categoryAreaId: string;
    createdAt: Date;
    updatedAt: Date;
  }  