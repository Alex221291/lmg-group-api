-- AlterTable
ALTER TABLE "builds" ADD COLUMN     "seoDescription" VARCHAR(3000),
ADD COLUMN     "seoTitle" VARCHAR(500);

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "seoDescription" VARCHAR(3000),
ADD COLUMN     "seoTitle" VARCHAR(500);

-- AlterTable
ALTER TABLE "category_area" ADD COLUMN     "seoDescription" VARCHAR(3000),
ADD COLUMN     "seoTitle" VARCHAR(500);
