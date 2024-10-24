//POST - /equipment/update
export class UpdateEquipmentDto {
    readonly id?: string;
    readonly title?: string;
    readonly description?: string;
    readonly type?: EquipmentTypes;
}