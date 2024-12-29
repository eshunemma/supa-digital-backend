const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const playStationCards = [
    { type: "PSN", value: 10, code: "PS10CARD123" },
    { type: "PSN", value: 50, code: "PS50CARD456" },
    { type: "ITUNES", value: 100, code: "PS100CARD789" },
    { type: "XBOX", value: 100, code: "PS100CARD799" },
  ];

  await prisma.giftCard.createMany({
    data: [...playStationCards],
  });

  console.log("Gift cards seeded");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
