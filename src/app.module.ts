import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { PictureService } from './services/picrute.service';
import { PictureController } from './controllers/picture.controller';
import { FileService } from './services/file.service';
import { AppController } from './controllers/app.controller';
import { NewsController } from './controllers/news.controller';
import { NewsService } from './services/news.service';
import { MailService } from './services/mail.service';
import { MailController } from './controllers/mail.controller';
import { ArticleController } from './controllers/article.controller';
import { ArticleService } from './services/article.service';

@Module({
  imports: [
    MulterModule.register({
    dest: './uploads',
    }),
  ],
  controllers: [ PictureController, AppController, NewsController, MailController, ArticleController],
  providers: [ PrismaService, PictureService, FileService, NewsService, MailService, ArticleService],
})
export class AppModule {}