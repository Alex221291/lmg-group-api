import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

//POST - /promotion/update
export class UpdatePromotionDto {
    readonly id?: string;
    readonly title?: string;
    readonly description?: string;
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    readonly savings?: number;
    readonly subject?: string;
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    readonly time?: number;
}