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
import { PortfolioService } from './services/portfolio.service';
import { FeedbackController } from './controllers/feedback.controller';
import { FeedbackService } from './services/feedback.service';
import { SectionService } from './services/section.service';
import { SectionController } from './controllers/section.controller';
import { diskStorage } from 'multer'; 
import { extname } from 'path';
import { VideoService } from './services/video.service';
import { CategoryController } from './controllers/category.controller';
import { AreaController } from './controllers/area.controller';
import { CategoryAreaController } from './controllers/category-area.controller';
import { BuildController } from './controllers/build.controller';
import { CategoryService } from './services/category.service';
import { CategoryAreaService } from './services/category-area.service';
import { AreaService } from './services/area.service';
import { BuildService } from './services/build.service';
import { VideoController } from './controllers/video.controller';

@Module({
  imports: [
    MulterModule.register({ 
      storage: diskStorage({ 
        destination: './uploads', 
        filename: (req, file, callback) => { 
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); 
          const ext = extname(file.originalname); 
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`); }, 
        }), 
      }),
  ],
  controllers: [ PictureController, AppController, NewsController, MailController, ArticleController, PortfolioController, FeedbackController, SectionController, CategoryController, AreaController, CategoryAreaController, BuildController, VideoController],
  providers: [ PrismaService, PictureService, FileService, NewsService, MailService, ArticleService, PortfolioService, FeedbackService, SectionService, CategoryService, AreaService, CategoryAreaService, BuildService, VideoService],
})
export class AppModule {}