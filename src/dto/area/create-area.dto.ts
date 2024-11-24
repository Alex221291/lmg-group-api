import { $Enums } from "@prisma/client";

export class CreateAreaDto {
  lat?: number;
  lon?: number;
  name?: string;
  status?: $Enums.ContentSatus
}