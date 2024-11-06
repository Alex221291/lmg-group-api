-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "pictureId" TEXT;

-- AlterTable
ALTER TABLE "news" ADD COLUMN     "pictureId" TEXT;

-- AlterTable
ALTER TABLE "portfolios" ADD COLUMN     "categoryName" TEXT;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "pictures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "pictures"("id") ON DELETE CASCADE ON UPDATE CASCADE;
