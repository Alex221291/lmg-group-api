-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('TEMPLATE', 'CURRENT');

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "originalname" TEXT,
    "filename" TEXT,
    "path" TEXT,
    "type" "FileType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);
