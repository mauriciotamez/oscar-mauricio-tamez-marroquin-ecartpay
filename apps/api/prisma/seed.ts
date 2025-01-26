import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.accessToken.deleteMany();
  await prisma.catalogProduct.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      name: 'Admin User',
      phone: '+1234567890',
      img_profile: 'https://example.com/admin.jpg',
    },
  });

  // Create GPU Products
  const gpus = [
    {
      name: 'NVIDIA GeForce RTX 4090',
      description: "NVIDIA's flagship GPU with 24GB GDDR6X memory",
      height: 336,
      length: 304,
      width: 61,
    },
    {
      name: 'AMD Radeon RX 7900 XTX',
      description: "AMD's top GPU with 24GB GDDR6 memory",
      height: 287,
      length: 287,
      width: 51,
    },
    {
      name: 'NVIDIA GeForce RTX 4080',
      description: '16GB GDDR6X memory for high-end gaming',
      height: 304,
      length: 284,
      width: 61,
    },
    {
      name: 'AMD Radeon RX 7900 XT',
      description: '20GB GDDR6 memory for enthusiast gaming',
      height: 276,
      length: 276,
      width: 51,
    },
    {
      name: 'NVIDIA GeForce RTX 4070 Ti',
      description: '12GB GDDR6X memory for excellent 4K gaming',
      height: 285,
      length: 267,
      width: 51,
    },
    {
      name: 'AMD Radeon RX 6950 XT',
      description: '16GB GDDR6 memory with ray tracing support',
      height: 267,
      length: 267,
      width: 51,
    },
    {
      name: 'NVIDIA GeForce RTX 4070',
      description: '12GB GDDR6X memory for 1440p gaming',
      height: 244,
      length: 244,
      width: 51,
    },
    {
      name: 'AMD Radeon RX 6800 XT',
      description: '16GB GDDR6 memory for high-performance gaming',
      height: 267,
      length: 267,
      width: 51,
    },
    {
      name: 'NVIDIA GeForce RTX 3090 Ti',
      description: '24GB GDDR6X memory, previous gen flagship',
      height: 336,
      length: 313,
      width: 61,
    },
    {
      name: 'AMD Radeon RX 6800',
      description: '16GB GDDR6 memory for 4K gaming',
      height: 267,
      length: 267,
      width: 51,
    },
    {
      name: 'NVIDIA GeForce RTX 3080 Ti',
      description: '12GB GDDR6X memory for 4K gaming',
      height: 285,
      length: 285,
      width: 51,
    },
    {
      name: 'AMD Radeon RX 6750 XT',
      description: '12GB GDDR6 memory for 1440p gaming',
      height: 267,
      length: 267,
      width: 51,
    },
    {
      name: 'NVIDIA GeForce RTX 3070 Ti',
      description: '8GB GDDR6X memory for 1440p gaming',
      height: 267,
      length: 267,
      width: 51,
    },
    {
      name: 'AMD Radeon RX 6700 XT',
      description: '12GB GDDR6 memory for 1440p gaming',
      height: 267,
      length: 267,
      width: 51,
    },
    {
      name: 'NVIDIA GeForce RTX 3060 Ti',
      description: '8GB GDDR6 memory for 1080p/1440p gaming',
      height: 242,
      length: 242,
      width: 51,
    },
    {
      name: 'AMD Radeon RX 6650 XT',
      description: '8GB GDDR6 memory for 1080p gaming',
      height: 242,
      length: 242,
      width: 51,
    },
    {
      name: 'NVIDIA GeForce RTX 3060',
      description: '12GB GDDR6 memory for 1080p gaming',
      height: 242,
      length: 242,
      width: 51,
    },
    {
      name: 'AMD Radeon RX 6600 XT',
      description: '8GB GDDR6 memory for 1080p gaming',
      height: 242,
      length: 242,
      width: 51,
    },
    {
      name: 'NVIDIA GeForce RTX 2080 Ti',
      description: '11GB GDDR6 memory, previous gen high-end',
      height: 267,
      length: 267,
      width: 51,
    },
    {
      name: 'AMD Radeon RX 6600',
      description: '8GB GDDR6 memory for entry 1080p gaming',
      height: 242,
      length: 242,
      width: 51,
    },
    {
      name: 'NVIDIA GeForce RTX 2070 Super',
      description: '8GB GDDR6 memory, reliable 1440p performer',
      height: 267,
      length: 267,
      width: 51,
    },
    {
      name: 'AMD Radeon RX 6500 XT',
      description: '4GB GDDR6 memory for budget gaming',
      height: 242,
      length: 242,
      width: 51,
    },
    {
      name: 'NVIDIA GeForce GTX 1660 Super',
      description: '6GB GDDR6 memory for 1080p gaming',
      height: 242,
      length: 242,
      width: 51,
    },
    {
      name: 'AMD Radeon RX 6400',
      description: '4GB GDDR6 memory for entry-level gaming',
      height: 242,
      length: 242,
      width: 51,
    },
    {
      name: 'NVIDIA GeForce GTX 1650 Super',
      description: '4GB GDDR6 memory for basic gaming',
      height: 242,
      length: 242,
      width: 51,
    },
  ];

  for (const gpu of gpus) {
    // eslint-disable-next-line
    const product = await prisma.catalogProduct.create({
      data: gpu,
    });
  }

  // Create Access Token for Admin
  // eslint-disable-next-line
  const adminToken = await prisma.accessToken.create({
    data: {
      user_id: user1.id,
      token: 'admin_token_123',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
