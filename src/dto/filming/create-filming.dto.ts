
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

//POST - /filming/create
export class CreateFilmingDto {
    readonly title?: string;
    readonly description?: string;
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    readonly price?: number;
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    readonly otherPrice?: number;
}