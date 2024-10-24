import { ApiProperty } from "@nestjs/swagger";

export class GetNewsDto {
    @ApiProperty({example: 'bf6792ad-4f20-4134-8373-5b1373ff3588', description: 'id'})
    readonly id?: string;
    @ApiProperty({example: 'Test', description: 'title'})
    readonly title?: string;
    @ApiProperty({example: 'Test', description: 'description'})
    readonly description?: string;
    @ApiProperty({example: 'Test', description: 'date'})
    readonly date?: string;
    @ApiProperty({example: 'Test', description: 'pictureId'})
    readonly pictureId?: string;
    readonly subject?: string;
    readonly time?: number;
}