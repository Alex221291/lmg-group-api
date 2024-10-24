import { PrismaClient } from '@prisma/client'
import * as path from 'path';
import * as fs from 'fs';
const prisma = new PrismaClient();
async function main() {

  //Equipment
  await prisma.picture.updateMany({
    where: { id: '49f014c7-9c01-400c-ace6-490896838b9d', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/equipment/godox.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: '57adae36-64ab-4d77-ba70-8dd272877bac', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/equipment/fotokvant.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: 'ca97fb08-becf-4e27-8edf-5c098205809e', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/equipment/softbox.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: 'a18bfbca-f558-4b21-a15f-e6c73aed1561', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/equipment/octabox.png')),
      type: 'image/png'
    }
  });

  // Equipment duplicate
  await prisma.picture.updateMany({
    where: { id: '75116e3d-fcc7-4029-bcd3-fc04e2db49bf', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/equipment/godox.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: 'af59c4a7-2ddb-40c1-8197-9da08264ae04', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/equipment/fotokvant.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: 'd4933d82-2927-4fd2-96a1-57307e27719b', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/equipment/softbox.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: '21ff7d16-2d29-43d2-a430-ee7a054ea63b', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/equipment/octabox.png')),
      type: 'image/png'
    }
  });

  // Favor
  await prisma.picture.updateMany({
    where: { id: '704d7014-cc95-401d-a73e-4dbebdeaf560', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/favor/dress.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: '5cf6ccce-cd32-4982-8d8c-131d5c59ed3c', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/favor/camera.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: 'e4ac75e8-06d0-4aef-aa5f-dd4c97046034', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/favor/asistent.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: 'a8a28bb0-3d89-4050-a511-760ad1aee4af', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/favor/kreslo.png')),
      type: 'image/png'
    }
  });

  //Filming
  await prisma.picture.updateMany({
    where: { id: '382a4a5c-8555-4329-ab6e-3212d9aafdc0', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/filming/arenda.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: 'e463a386-5475-48ae-800a-4d59b49a5e4e', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/filming/dasha.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: '4916e275-059e-44d9-9c08-59d371fca9d6', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/filming/alex.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: 'af60e668-47c1-41fb-9893-0df48cb625bd', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/filming/abonument.png')),
      type: 'image/png'
    }
  });

  //News
  await prisma.picture.updateMany({
    where: { id: 'b486a497-82aa-419a-9921-b3a567fff653', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/news/news-1.png')),
      type: 'image/png'
    }
  });
  
  //Collage-HEADER
  await prisma.picture.updateMany({
    where: { id: '96a5e263-4731-459b-88ce-cfffda3f53f6', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/collage/header/1.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: '08034fcd-4403-4768-81bc-c9f9828726db', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/collage/header/2.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: '8bd95fd0-9b5f-4e0d-a1b1-fff95281db5b', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/collage/header/3.png')),
      type: 'image/png'
    }
  });

  //Collage-FAVOR
  await prisma.picture.updateMany({
    where: { id: 'b5c0926f-28a2-4a20-9674-999c63f009d0', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/collage/favor/1.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: 'd362daf0-53c4-4c0f-8f71-3698d72d4372', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/collage/favor/2.png')),
      type: 'image/png'
    }
  });

  //Collage-FOOTER
  await prisma.picture.updateMany({
    where: { id: 'a8b2aef7-2b3d-462d-8bcd-79cea4e9a4f6', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/collage/footer/1.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: '7b8e5a80-a42e-4bb2-b38a-6f2e20e08265', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/collage/footer/2.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: '8126ed39-f55b-4790-ab0c-490686ff66dc', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/collage/footer/3.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: '6f13ab40-791e-49cc-bf37-25bfa986de7e', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/collage/footer/4.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: '6dfaee3f-7a5d-40ed-add3-438afdb1a7cc', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/collage/footer/5.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: '00ec2c25-bbb9-4bda-8a54-aabf84d131e1', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/collage/footer/6.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: 'b0bb4c39-9909-471d-8049-c33fca3f1fce', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/collage/footer/7.png')),
      type: 'image/png'
    }
  });

  //Promotion
  await prisma.picture.updateMany({
    where: { id: {
      in:['e4aee6e7-97ff-4d33-8806-67c8d1446a83', '76b3a45f-d170-435e-b5e7-79b1f28c66e5', '3219c218-c74f-40fc-953c-417463eaac7b']
    }, 
      picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/promotion/cake.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: {
      in:['24716174-9237-466d-87a0-6c230cd8112c', '991ff55d-84ed-4015-8aca-98223cf40ed3', 'a9c29a8a-1a21-47c8-870e-245e9072b179']
    }, 
    picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/promotion/clock.png')),
      type: 'image/png'
    }
  }); 


  // Equipment: dress and requisite
  await prisma.picture.updateMany({
    where: { id: {
      in:['6eaa5312-b822-4fb1-99b0-1d8641d19566', '96f55754-30cb-4fb9-befc-35c486e49ffe', '42c9423a-4fb9-4de7-9936-72e0416e3636', '0f9ba1eb-7e61-4dee-abe7-7fa47c940aed', ]
    }, 
     picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/favor/dress.png')),
      type: 'image/png'
    }
  });
  await prisma.picture.updateMany({
    where: { id: {
      in:['c376534f-2bfa-4bcf-970b-9b76fdc682c0', 'f20ab86c-5c46-4c4d-808f-062073e0cb54', '288d0e4c-a695-4c2e-a796-8ff2decacb97', 'e2cc3de5-077d-4b71-9323-96be0fc17b44', ]
    }, 
    picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/favor/kreslo.png')),
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