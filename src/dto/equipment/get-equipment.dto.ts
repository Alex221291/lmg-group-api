//GET - /equipment

import { $Enums } from "@prisma/client";

//GET - /equipment/:id
export class GetEquipmentDto {
    readonly id?: string;
    readonly title?: string;
    readonly description?: string;
    readonly pictureId?: string;
    readonly type?: $Enums.EquipmentType;
}