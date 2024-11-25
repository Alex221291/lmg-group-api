import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Video } from '@prisma/client';

@Injectable()
export class VideoService {
  constructor(private readonly prisma: PrismaService) {}

  async getVideo(id: string) : Promise<Video | null> {
    const video = await this.prisma.video.findUnique({
      where: {id},
    });
    return video || null;
  }
}
