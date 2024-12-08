import { $Enums } from "@prisma/client";

export interface UpdateBuildDto {
  id: string;
  coordinates?: [number, number][];
  name?: string;
  wDescription?: string;
  gTitle?: string;
  gSubTitle?: string;
  list?: ModalList[];
  status: $Enums.ContentSatus;
  categoryAreaId?: string;
  pictureId?: string;
}

export interface ModalList {
    title?: string;
    value?: string;
}