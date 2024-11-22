import { $Enums } from "@prisma/client";

export interface UpdateFeedbackDto {
    id: string;
    title?: string;
    description?: string;
    video?: string;
    status: $Enums.ContentSatus;
}