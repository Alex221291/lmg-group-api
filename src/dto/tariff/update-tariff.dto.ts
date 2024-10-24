//PUT - /tariff
export class UpdateTariffDto {
    readonly id: string;
    readonly timeInterval?: string;
    readonly savings?: number;
    readonly options?: string[];
    readonly price?: number;
}