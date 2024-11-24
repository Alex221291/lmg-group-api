/*
  Warnings:

  - You are about to drop the column `video` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `news` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "articles" DROP COLUMN "video",
ADD COLUMN     "videoId" TEXT;

-- AlterTable
ALTER TABLE "news" DROP COLUMN "video",
ADD COLUMN     "videoId" TEXT;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "videos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "videos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
