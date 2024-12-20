-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "previewPictureId" TEXT;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_previewPictureId_fkey" FOREIGN KEY ("previewPictureId") REFERENCES "pictures"("id") ON DELETE SET NULL ON UPDATE CASCADE;
