-- DropForeignKey
ALTER TABLE "article_items" DROP CONSTRAINT "article_items_articleId_fkey";

-- DropForeignKey
ALTER TABLE "article_items" DROP CONSTRAINT "article_items_pictureId_fkey";

-- DropForeignKey
ALTER TABLE "builds" DROP CONSTRAINT "builds_categoryAreaId_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "category_area" DROP CONSTRAINT "category_area_areaId_fkey";

-- DropForeignKey
ALTER TABLE "category_area" DROP CONSTRAINT "category_area_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "news_items" DROP CONSTRAINT "news_items_newsId_fkey";

-- DropForeignKey
ALTER TABLE "news_items" DROP CONSTRAINT "news_items_pictureId_fkey";

-- DropForeignKey
ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "news_items" ADD CONSTRAINT "news_items_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "pictures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_items" ADD CONSTRAINT "news_items_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_items" ADD CONSTRAINT "article_items_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "pictures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_items" ADD CONSTRAINT "article_items_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_area" ADD CONSTRAINT "category_area_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_area" ADD CONSTRAINT "category_area_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "builds" ADD CONSTRAINT "builds_categoryAreaId_fkey" FOREIGN KEY ("categoryAreaId") REFERENCES "category_area"("id") ON DELETE SET NULL ON UPDATE CASCADE;
