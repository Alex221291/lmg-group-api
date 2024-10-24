import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class UpdateNewsDto {
    @ApiProperty({example: 'bf6792ad-4f20-4134-8373-5b1373ff3588', description: 'id'})
    readonly id: string;
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