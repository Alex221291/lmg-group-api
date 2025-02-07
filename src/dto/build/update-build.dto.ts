import { $Enums } from "@prisma/client";

export interface UpdateBuildDto {
  id: string;
  coordinates? : [number, number][];
  buildAreaCoordinates?: [number, number][];
  iconPictureId: string | null;
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