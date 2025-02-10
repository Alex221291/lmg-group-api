import { $Enums } from "@prisma/client";

export interface UpdateCategoryDto {
    id: string;
    title?: string;
    description?: string;
    subtitle?: string;
    sectionId?: string;
    pictureId?: string;
    previewPictureId?: string;
    iconPictureId: string | null;
    videoId?: string;
    list?: { title?: string; items?: { caption?: string; subcaption?: string }[] };
    status?: $Enums.ContentSatus;
}