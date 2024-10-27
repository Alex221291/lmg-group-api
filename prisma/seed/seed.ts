import { PrismaClient } from '@prisma/client'
import * as path from 'path';
import * as fs from 'fs';
const prisma = new PrismaClient();
async function main() {

  //News
  await prisma.picture.updateMany({
    where: { id: 'b486a497-82aa-419a-9921-b3a567fff653', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/news/news-1-1.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: '382a4a5c-8555-4329-ab6e-3212d9aafdc0', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/news/news-1-2.png')),
      type: 'image/png'
    }
  });
  //Article
  await prisma.picture.updateMany({
    where: { id: '8f884398-68c5-470a-ba4d-21af963f748e', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/article/article-1-1.png')),
      type: 'image/png'
    }
  });
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })