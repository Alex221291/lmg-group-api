import { $Enums } from "@prisma/client";

export interface UpdateFeedbackDto {
    id: string;
    title?: string;
    description?: string;
    videoId?: string;
    status: $Enums.ContentSatus;
    pictureId?: string;
}