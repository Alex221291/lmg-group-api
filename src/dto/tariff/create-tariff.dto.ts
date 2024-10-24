//POST - /tariff
export class CreateTariffDto {
    readonly timeInterval?: string;
    readonly savings?: number;
    readonly options?: string[];
    readonly price?: number;
}