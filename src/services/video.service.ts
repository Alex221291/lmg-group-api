import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Video } from '@prisma/client';

@Injectable()
export class VideoService {
  constructor(private readonly prisma: PrismaService) {}

  async addVideo(videoId?: string, data?: {originalname: string, filename: string, path:string}) : Promise<Video | null> {
    // if(!videoId && !data) return null;
    // if(videoId && !data) {
    //     await this.prisma.video.deleteMany()
    // }
    const video = await this.prisma.video.create({
      data: {
        originalname: data.originalname,
        filename: data.filename,
        path: data.path,
      },
    });
    return video;
  }
}
