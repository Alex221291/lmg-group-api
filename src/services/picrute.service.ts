import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Picture } from '@prisma/client';

@Injectable()
export class PictureService {
  constructor(private prisma: PrismaService) {}

  async getPicture(pictureId?: string): Promise<Picture> {

    const picture = await this.prisma.picture.findUnique({
      where: {id: pictureId},
    });

    return picture;
  }
}