-- AlterTable
ALTER TABLE "builds" ALTER COLUMN "seoDescription" SET DATA TYPE VARCHAR(10000);

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "description" SET DATA TYPE VARCHAR(10000),
ALTER COLUMN "seoDescription" SET DATA TYPE VARCHAR(10000);

-- AlterTable
ALTER TABLE "category_area" ALTER COLUMN "seoDescription" SET DATA TYPE VARCHAR(10000);

-- AlterTable
ALTER TABLE "feedbacks" ALTER COLUMN "description" SET DATA TYPE VARCHAR(10000);

-- AlterTable
ALTER TABLE "portfolios" ALTER COLUMN "description" SET DATA TYPE VARCHAR(10000);
