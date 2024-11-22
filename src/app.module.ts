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
import { PortfolioController } from './controllers/portfolio.controller';
import { PortfolioCategoryController } from './controllers/portfolio-category.controller';
import { PortfolioService } from './services/portfolio.service';
import { PortfolioCategoryService } from './services/portfolio-category.service';
import { FeedbackController } from './controllers/feedback.controller';
import { FeedbackService } from './services/feedback.service';

@Module({
  imports: [
    MulterModule.register({
    dest: './uploads',
    }),
  ],
  controllers: [ PictureController, AppController, NewsController, MailController, ArticleController, PortfolioController, PortfolioCategoryController, FeedbackController],
  providers: [ PrismaService, PictureService, FileService, NewsService, MailService, ArticleService, PortfolioService, PortfolioCategoryService, FeedbackService],
})
export class AppModule {}