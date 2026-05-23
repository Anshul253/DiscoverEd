const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const iitdImages = JSON.stringify([
    "https://home.iitd.ac.in/images/for-faculty/camp8.jpg",
    "https://premi25.iitd.ac.in/images/top_view.png",
    "https://campusutra.com/wp-content/uploads/IIT-Convocations.png"
  ]);

  await prisma.college.updateMany({
    where: { name: { contains: "Indian Institute of Technology Delhi" } },
    data: { images: iitdImages }
  });

  console.log("Updated IIT Delhi images successfully in Postgres");
}

main().finally(() => prisma.$disconnect());
