-- AlterTable
ALTER TABLE "builds" ADD COLUMN     "buildAreaCoordinates" JSONB,
ADD COLUMN     "iconPictureId" TEXT;

-- AddForeignKey
ALTER TABLE "builds" ADD CONSTRAINT "builds_iconPictureId_fkey" FOREIGN KEY ("iconPictureId") REFERENCES "pictures"("id") ON DELETE SET NULL ON UPDATE CASCADE;
