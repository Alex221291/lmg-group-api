import { $Enums } from "@prisma/client";

export interface CreateBuildDto {
  coordinates? : [number, number][];
  buildAreaCoordinates?: [number, number][];
  list?: { title?: string; value?: string; }[];
  name?: string;
  wDescription?: string;
  gTitle?: string;
  gSubTitle?: string;
  status: $Enums.ContentSatus;
  categoryAreaId?: string;
}