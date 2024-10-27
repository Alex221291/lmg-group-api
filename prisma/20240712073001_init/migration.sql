-- CreateEnum
CREATE TYPE "Type" AS ENUM ('HEADER', 'FOOTER', 'FAVOR', 'OTHER');

-- CreateEnum
CREATE TYPE "EquipmentType" AS ENUM ('DRESS', 'EQUIPMENT', 'REQUISITE');

-- CreateTable
CREATE TABLE "Tariff" (
    "id" TEXT NOT NULL,
    "timeInterval" TEXT,
    "savings" INTEGER,
    "options" VARCHAR(2000),
    "price" DOUBLE PRECISION,

    CONSTRAINT "Tariff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" VARCHAR(2000),
    "type" "EquipmentType" NOT NULL DEFAULT 'EQUIPMENT',
    "pictureId" TEXT,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favor" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" VARCHAR(2000),
    "order" INTEGER,
    "count" TEXT,
    "pictureId" TEXT,

    CONSTRAINT "Favor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Filming" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" VARCHAR(2000),
    "order" INTEGER,
    "price" DOUBLE PRECISION,
    "otherPrice" DOUBLE PRECISION,
    "pictureId" TEXT,

    CONSTRAINT "Filming_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Picture" (
    "id" TEXT NOT NULL,
    "picture" BYTEA,
    "type" TEXT,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" VARCHAR(3000),
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subject" TEXT,
    "time" INTEGER,
    "pictureId" TEXT,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collage" (
    "id" TEXT NOT NULL,
    "order" INTEGER,
    "pictureId" TEXT,
    "type" "Type" NOT NULL DEFAULT 'OTHER',

    CONSTRAINT "Collage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promotion" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" VARCHAR(2000),
    "savings" INTEGER,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subject" TEXT,
    "time" INTEGER,
    "pictureId" TEXT,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favor" ADD CONSTRAINT "Favor_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Filming" ADD CONSTRAINT "Filming_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collage" ADD CONSTRAINT "Collage_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture"("id") ON DELETE SET NULL ON UPDATE CASCADE;
