-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_pictureId_fkey";

-- DropForeignKey
ALTER TABLE "news" DROP CONSTRAINT "news_pictureId_fkey";

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "pictures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "pictures"("id") ON DELETE SET NULL ON UPDATE CASCADE;
