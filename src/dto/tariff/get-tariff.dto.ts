//GET - /tariff
//GET - /tariff/:id
export class GetTariffDto {
    readonly id?: string;
    readonly timeInterval?: string;
    readonly savings?: number;
    readonly options?: string[];
    readonly price?: number;
}