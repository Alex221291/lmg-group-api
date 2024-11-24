/*
  Warnings:

  - You are about to drop the column `description` on the `areas` table. All the data in the column will be lost.
  - You are about to drop the column `pictureId` on the `areas` table. All the data in the column will be lost.
  - You are about to drop the column `subTitle` on the `areas` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `areas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "areas" DROP CONSTRAINT "areas_pictureId_fkey";

-- AlterTable
ALTER TABLE "areas" DROP COLUMN "description",
DROP COLUMN "pictureId",
DROP COLUMN "subTitle",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "category_area" ADD COLUMN     "description" VARCHAR(3000),
ADD COLUMN     "pictureId" TEXT,
ADD COLUMN     "subTitle" VARCHAR(500),
ADD COLUMN     "title" VARCHAR(500);

-- AddForeignKey
ALTER TABLE "category_area" ADD CONSTRAINT "category_area_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "pictures"("id") ON DELETE SET NULL ON UPDATE CASCADE;
