/*
  Warnings:

  - The `lat` column on the `areas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `lon` column on the `areas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `gPictureId` on the `builds` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `builds` table. All the data in the column will be lost.
  - You are about to drop the column `lon` on the `builds` table. All the data in the column will be lost.
  - You are about to drop the column `sectionAreaId` on the `builds` table. All the data in the column will be lost.
  - You are about to drop the column `wPictureId` on the `builds` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the `portfolio_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `section_area` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "builds" DROP CONSTRAINT "builds_gPictureId_fkey";

-- DropForeignKey
ALTER TABLE "builds" DROP CONSTRAINT "builds_sectionAreaId_fkey";

-- DropForeignKey
ALTER TABLE "builds" DROP CONSTRAINT "builds_wPictureId_fkey";

-- DropForeignKey
ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "section_area" DROP CONSTRAINT "section_area_areaId_fkey";

-- DropForeignKey
ALTER TABLE "section_area" DROP CONSTRAINT "section_area_sectionId_fkey";

-- AlterTable
ALTER TABLE "areas" DROP COLUMN "lat",
ADD COLUMN     "lat" DOUBLE PRECISION,
DROP COLUMN "lon",
ADD COLUMN     "lon" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "builds" DROP COLUMN "gPictureId",
DROP COLUMN "lat",
DROP COLUMN "lon",
DROP COLUMN "sectionAreaId",
DROP COLUMN "wPictureId",
ADD COLUMN     "categoryAreaId" TEXT,
ADD COLUMN     "coordinates" JSONB,
ADD COLUMN     "pictureId" TEXT;

-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "video",
ADD COLUMN     "videoId" TEXT;

-- DropTable
DROP TABLE "portfolio_categories";

-- DropTable
DROP TABLE "section_area";

-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL,
    "originalname" TEXT,
    "filename" TEXT,
    "path" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "number" SERIAL NOT NULL,
    "title" VARCHAR(500),
    "description" VARCHAR(3000),
    "subtitle" VARCHAR(500),
    "sectionId" TEXT,
    "pictureId" TEXT,
    "videoId" TEXT,
    "list" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_area" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "areaId" TEXT NOT NULL,
    "status" "ContentSatus",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_area_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "pictures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "videos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_area" ADD CONSTRAINT "category_area_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_area" ADD CONSTRAINT "category_area_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "builds" ADD CONSTRAINT "builds_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "pictures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "builds" ADD CONSTRAINT "builds_categoryAreaId_fkey" FOREIGN KEY ("categoryAreaId") REFERENCES "category_area"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "videos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
