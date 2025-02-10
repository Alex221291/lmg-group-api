-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "iconPictureId" TEXT;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_iconPictureId_fkey" FOREIGN KEY ("iconPictureId") REFERENCES "pictures"("id") ON DELETE SET NULL ON UPDATE CASCADE;
