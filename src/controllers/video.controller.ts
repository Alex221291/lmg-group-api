import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { VideoService } from 'src/services/video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get(':id')
  async streamVideo(@Param('id') id: string, @Res() res: Response) {
    const video = await this.videoService.getVideo(id);
    if (!video) {
      throw new NotFoundException('Video not found');
    }
    
    res.sendFile(video.path, { root: './' });
  }
}
