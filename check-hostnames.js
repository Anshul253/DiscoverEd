const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const colleges = await prisma.college.findMany({ select: { name: true, images: true } });
  
  const hostnames = new Set();
  
  colleges.forEach(c => {
    let imgs = [];
    try {
      imgs = JSON.parse(c.images);
    } catch(e){}
    imgs.forEach(url => {
      try {
        const u = new URL(url);
        hostnames.add(u.hostname);
      } catch(e) {}
    });
  });
  
  console.log("Image Hostnames found in DB:", Array.from(hostnames));
}

main().finally(() => prisma.$disconnect());
