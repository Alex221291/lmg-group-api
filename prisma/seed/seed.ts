import { PrismaClient } from '@prisma/client'
import * as path from 'path';
import * as fs from 'fs';
const prisma = new PrismaClient();
async function main() {

  //News
  await prisma.picture.updateMany({
    where: { id: 'c4e9ff9a-87e8-40f1-a4e3-ce46060eec12', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/news/news-1.png')),
      type: 'image/png'
    }
  });

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
    where: { id: 'b924e9dc-8674-41f0-9166-de5c609c2d7b', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/article/article-1.png')),
      type: 'image/png'
    }
  });

  await prisma.picture.updateMany({
    where: { id: '8f884398-68c5-470a-ba4d-21af963f748e', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/article/article-1-1.png')),
      type: 'image/png'
    }
  });

  //Portfolio
  await prisma.picture.updateMany({
    where: { id: '85c73c08-561c-478d-8266-a40d1185e857', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/portfolio/portfolio-1.png')),
      type: 'image/png'
    }
  });

  await prisma.picture.updateMany({
    where: { id: '9240085e-1679-4be1-aaf7-9f1759540dc7', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/portfolio/portfolio-2.png')),
      type: 'image/png'
    }
  });

  await prisma.picture.updateMany({
    where: { id: '4012f4b1-061f-4a30-9e27-361a53960f90', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/portfolio/portfolio-3.png')),
      type: 'image/png'
    }
  });

  await prisma.picture.updateMany({
    where: { id: 'd85360b0-21c7-465b-874d-48734fd15501', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/portfolio/portfolio-4.png')),
      type: 'image/png'
    }
  });

  await prisma.picture.updateMany({
    where: { id: '7d7012fd-d16c-49fc-814a-ca322565c7ea', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/portfolio/portfolio-5.png')),
      type: 'image/png'
    }
  });

  await prisma.picture.updateMany({
    where: { id: '1055938f-d139-4a73-b3cd-a595105a2dea', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/portfolio/portfolio-6.png')),
      type: 'image/png'
    }
  });

  await prisma.picture.updateMany({
    where: { id: '2fa8a75b-5a6a-4d81-8888-6c9439698faa', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/portfolio/portfolio-7.png')),
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