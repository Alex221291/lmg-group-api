import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { PictureService } from './services/picrute.service';
import { PictureController } from './controllers/picture.controller';
import { FileService } from './services/file.service';
import { AppController } from './controllers/app.controller';
import { NewsController } from './controllers/news.controller';
import { NewsService } from './services/news.service';
import { TariffController } from './controllers/tariff.controller';
import { EquipmentService } from './services/equipment.service';
import { TariffService } from './services/tariff.service';
import { FavorController } from './controllers/favor.controller';
import { FilmingService } from './services/filming.service';
import { FavorService } from './services/favor.service';
import { FilmingController } from './controllers/filming.controller';
import { EquipmentController } from './controllers/equipment.controller';
import { CollageService } from './services/collage.service';
import { CollageController } from './controllers/collage.controller';
import { PromotionController } from './controllers/promotion.controller';
import { PromotionService } from './services/promotion.service';
import { MailService } from './services/mail.service';
import { MailController } from './controllers/mail.controller';
// import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  imports: [
    MulterModule.register({
    dest: './uploads',
    }),
  ],
  controllers: [ PictureController, AppController, NewsController, TariffController, EquipmentController, FavorController, FilmingController, CollageController, PromotionController, MailController],
  providers: [ PrismaService, PictureService, FileService, NewsService, TariffService, EquipmentService, FavorService, FilmingService, CollageService, PromotionService, MailService],
})
export class AppModule {}