import { $Enums } from "@prisma/client";

export interface CreateFeedbackDto {
    title?: string;
    description?: string;
    video?: string;
    status: $Enums.ContentSatus;
}