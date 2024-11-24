import { $Enums } from "@prisma/client";

export interface CreateFeedbackDto {
    title?: string;
    description?: string;
    status: $Enums.ContentSatus;
}