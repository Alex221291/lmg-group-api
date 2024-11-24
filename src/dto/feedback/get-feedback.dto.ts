import { $Enums } from "@prisma/client";

export interface GetFeedbackDto {
    id: string;
    number?: number;
    title?: string;
    description?: string;
    video?: string;
    status: $Enums.ContentSatus;
    pictureId?: string;
    videoId?: string;
}