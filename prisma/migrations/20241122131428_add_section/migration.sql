-- CreateTable
CREATE TABLE "sections" (
    "id" TEXT NOT NULL,
    "number" SERIAL NOT NULL,
    "title" VARCHAR(500),
    "description" VARCHAR(3000),
    "status" "ContentSatus",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "areas" (
    "id" TEXT NOT NULL,
    "number" SERIAL NOT NULL,
    "lat" VARCHAR(100),
    "lon" VARCHAR(100),
    "name" VARCHAR(500),
    "title" VARCHAR(500),
    "description" VARCHAR(3000),
    "subTitle" VARCHAR(500),
    "status" "ContentSatus",
    "pictureId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_area" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "areaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "section_area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "builds" (
    "id" TEXT NOT NULL,
    "number" SERIAL NOT NULL,
    "lat" VARCHAR(100),
    "lon" VARCHAR(100),
    "name" VARCHAR(500),
    "wPictureId" TEXT,
    "wDescription" VARCHAR(3000),
    "gPictureId" TEXT,
    "gTitle" VARCHAR(500),
    "gSubTitle" VARCHAR(500),
    "status" "ContentSatus",
    "sectionAreaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "builds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedbacks" (
    "id" TEXT NOT NULL,
    "number" SERIAL NOT NULL,
    "title" VARCHAR(500),
    "description" VARCHAR(3000),
    "video" TEXT,
    "pictureId" TEXT,
    "status" "ContentSatus",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "areas" ADD CONSTRAINT "areas_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "pictures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_area" ADD CONSTRAINT "section_area_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_area" ADD CONSTRAINT "section_area_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "builds" ADD CONSTRAINT "builds_wPictureId_fkey" FOREIGN KEY ("wPictureId") REFERENCES "pictures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "builds" ADD CONSTRAINT "builds_gPictureId_fkey" FOREIGN KEY ("gPictureId") REFERENCES "pictures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "builds" ADD CONSTRAINT "builds_sectionAreaId_fkey" FOREIGN KEY ("sectionAreaId") REFERENCES "section_area"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "pictures"("id") ON DELETE SET NULL ON UPDATE CASCADE;
