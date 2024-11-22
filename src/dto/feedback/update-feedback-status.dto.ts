import { $Enums } from "@prisma/client";

export interface UpdateFeedbackStatusDto {
    feedbackId?: string;
    status?: $Enums.ContentSatus;
}