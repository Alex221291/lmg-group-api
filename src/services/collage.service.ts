import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { createReadStream } from 'fs';
import { FileService } from './file.service';
import { $Enums } from '@prisma/client';
@Injectable()
export class CollageService {
  constructor(private prisma: PrismaService, private fileService: FileService) {}
  
  async createCollage(type: CollageTypes, filesInfo?: {path: string, type: string}[]) : Promise<string[]> {
    if(!$Enums.Type[type]) throw new HttpException('Неверный тип коллажа!', HttpStatus.BAD_REQUEST);

    const deletePictures = await this.getAll(type);
    await this.prisma.picture.deleteMany({where:{id:{
        in: deletePictures
    }}});
    await this.prisma.collage.deleteMany({where:{type: $Enums.Type[type]}});

    let index = 0;
    for (const file of filesInfo) {
      if (file?.path) {
        let fileData: Buffer;
        const fileStream = createReadStream(file.path);
        const chunks = [];
    
        for await (const chunk of fileStream) {
          chunks.push(chunk);
        }
    
        fileData = Buffer.concat(chunks);
        const picture = await this.prisma.picture.create({
          data: {
            picture: fileData,
            type: file.type || 'image/png',
          },
        });

        await this.prisma.collage.create({
            data: {
              pictureId: picture?.id,
              type: $Enums.Type[type] || $Enums.Type[CollageTypes.OTHER],
              order: index++,
            },
          });

        await this.fileService.deleteFile(file?.path);
      }
    }

    return await this.getAll(type);
  }

  async getAll(type: CollageTypes): Promise<string[]> {
    if(!$Enums.Type[type]) throw new HttpException('Неверный тип коллажа!', HttpStatus.BAD_REQUEST);

    const result = await this.prisma.collage.findMany({
      where:{type: $Enums.Type[type]},
      orderBy: {
        order: 'asc'
      }
    });
    
    return result?.map(data => {
      return data?.pictureId
    });
  }

}