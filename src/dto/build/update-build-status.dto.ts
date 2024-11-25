import { $Enums } from "@prisma/client";

export interface UpdateBuildStatusDto {
    buildId?: string;
    status?: $Enums.ContentSatus;
}