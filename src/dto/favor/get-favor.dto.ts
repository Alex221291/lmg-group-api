//GET - /favor
//GET - /favor/:id
export class GetFavorDto {
    readonly id?: string;
    readonly title?: string;
    readonly description?: string;
    readonly order?: number;
    readonly pictureId?: string;
    readonly count?: string;

}