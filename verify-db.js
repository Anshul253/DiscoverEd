const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const colleges = await prisma.college.findMany({ select: { name: true, images: true } });
  
  colleges.forEach(c => {
    console.log(c.name);
    console.log(c.images);
    console.log('---');
  });
}

main().finally(() => prisma.$disconnect());
