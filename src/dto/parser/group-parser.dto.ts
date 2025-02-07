export interface GroupParserDto {
    section?: string;
    category?: string;
    area?: string;
    build?: string;
    coordinates? : [number, number][];
    buildAreaCoordinates?: [number, number][];
    list?: { title?: string; value?: string; }[];
    wDescription?: string;
    advertisingType?: string;
    itemCount?: string;
    audienceReach?: string;
    gPictureLink?: string;
    gTitle?: string;
    gDescription?: string;
    iconLink?: string;
}

  