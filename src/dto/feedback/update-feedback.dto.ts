import { $Enums } from "@prisma/client";

export interface UpdateFeedbackDto {
    id: string;
    title?: string;
    description?: string;
    status: $Enums.ContentSatus;
}