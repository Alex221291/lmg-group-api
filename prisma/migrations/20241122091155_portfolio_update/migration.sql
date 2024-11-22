-- DropForeignKey
ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_pictureId_fkey";

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "pictures"("id") ON DELETE SET NULL ON UPDATE CASCADE;
