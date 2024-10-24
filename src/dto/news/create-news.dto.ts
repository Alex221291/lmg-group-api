import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class CreateNewsDto {
    @ApiProperty({example: 'Test', description: 'title'})
    readonly title?: string;
    @ApiProperty({example: 'Test', description: 'description'})
    readonly description?: string;
    readonly subject?: string;
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    readonly time?: number;
}