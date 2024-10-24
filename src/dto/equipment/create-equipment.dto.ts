//POST - /equipment/create
export class CreateEquipmentDto {
    readonly title?: string;
    readonly description?: string;
    readonly type?: EquipmentTypes;
}