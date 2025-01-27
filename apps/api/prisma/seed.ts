import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.image.deleteMany();
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
      name: 'AMD Radeon RX 7900 XTX',
      description: "AMD's top GPU with 24GB GDDR6 memory",
      height: 1,
      length: 287,
      width: 51,
      brand: 'AMD',
      tier: 'high-end',
      price: 24999,
      images: {
        create: [
          {
            url: "https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/ecart-pay-test/uploads/rx7900xtx-1.jpg"
          }
        ]
      }
    },
    {
      name: 'AMD Radeon RX 7900 XT',
      description: '20GB GDDR6 memory for enthusiast gaming',
      height: 1,
      length: 276,
      width: 51,
      brand: 'AMD',
      tier: 'high-end',
      price: 19999,
      images: {
        create: [
          {
            url: "https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/ecart-pay-test/uploads/rx7900xt-1.jpg"
          }
        ]
      }
    },
    {
      name: 'NVIDIA GeForce RTX 4070 Ti',
      description: '12GB GDDR6X memory for excellent 4K gaming',
      height: 1,
      length: 267,
      width: 51,
      brand: 'NVIDIA',
      tier: 'mid-end',
      price: 15999,
      images: {
        create: [
          {
            url: "https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/ecart-pay-test/uploads/rtx4070ti-1.jpg"
          }
        ]
      }
    },
    {
      name: 'NVIDIA GeForce RTX 4070',
      description: '12GB GDDR6X memory for 1440p gaming',
      height: 1,
      length: 244,
      width: 51,
      brand: 'NVIDIA',
      tier: 'mid-end',
      price: 12999,
      images: {
        create: [
          {
            url: "https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/ecart-pay-test/uploads/rtx4070-1.jpg"
          }
        ]
      }
    },
    {
      name: 'NVIDIA GeForce RTX 3090 Ti',
      description: '24GB GDDR6X memory, previous gen flagship',
      height: 1,
      length: 313,
      width: 61,
      brand: 'NVIDIA',
      tier: 'high-end',
      price: 21999,
      images: {
        create: [
          {
            url: "https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/ecart-pay-test/uploads/rtx3090ti-1.jpg"
          }
        ]
      }
    },
    {
      name: 'AMD Radeon RX 6800',
      description: '16GB GDDR6 memory for 4K gaming',
      height: 1,
      length: 267,
      width: 51,
      brand: 'AMD',
      tier: 'mid-end',
      price: 9999,
      images: {
        create: [
          {
            url: "https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/ecart-pay-test/uploads/rx6800-1.jpg"
          }
        ]
      }
    },
    {
      name: 'AMD Radeon RX 6750 XT',
      description: '12GB GDDR6 memory for 1440p gaming',
      height: 1,
      length: 267,
      width: 51,
      brand: 'AMD',
      tier: 'mid-end',
      price: 8999,
      images: {
        create: [
          {
            url: "https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/ecart-pay-test/uploads/rx6750xt-1.jpg"
          }
        ]
      }
    },
    {
      name: 'NVIDIA GeForce RTX 3070 Ti',
      description: '8GB GDDR6X memory for 1440p gaming',
      height: 1,
      length: 267,
      width: 51,
      brand: 'NVIDIA',
      tier: 'mid-end',
      price: 11499,
      images: {
        create: [
          {
            url: "https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/ecart-pay-test/uploads/rtx3070ti-1.jpg"
          }
        ]
      }
    },
    {
      name: 'NVIDIA GeForce RTX 3060 Ti',
      description: '8GB GDDR6 memory for 1080p/1440p gaming',
      height: 1,
      length: 242,
      width: 51,
      brand: 'NVIDIA',
      tier: 'low-end',
      price: 8499,
      images: {
        create: [
          {
            url: "https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/ecart-pay-test/uploads/rtx3060ti-1.jpg"
          }
        ]
      }
    },
    {
      name: 'AMD Radeon RX 6650 XT',
      description: '8GB GDDR6 memory for 1080p gaming',
      height: 1,
      length: 242,
      width: 51,
      brand: 'AMD',
      tier: 'low-end',
      price: 5999,
      images: {
        create: [
          {
            url: "https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/ecart-pay-test/uploads/rx6650-1.jgp.jpg"
          }
        ]
      }
    },
    {
      name: 'AMD Radeon RX 6600 XT',
      description: '8GB GDDR6 memory for 1080p gaming',
      height: 1,
      length: 242,
      width: 51,
      brand: 'AMD',
      tier: 'low-end',
      price: 5499,
      images: {
        create: [
          {
            url: "https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/ecart-pay-test/uploads/rx6600-1.jpg"
          }
        ]
      }
    },
    {
      name: 'NVIDIA GeForce RTX 2080 Ti',
      description: '11GB GDDR6 memory, previous gen high-end',
      height: 1,
      length: 267,
      width: 51,
      brand: 'NVIDIA',
      tier: 'mid-end',
      price: 13999,
      images: {
        create: [
          {
            url: "https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/ecart-pay-test/uploads/rtx2080ti-1.jpg"
          }
        ]
      } 
    },
    {
      name: 'AMD Radeon RX 6600',
      description: '8GB GDDR6 memory for entry 1080p gaming',
      height: 1,
      length: 242,
      width: 51,
      brand: 'AMD',
      tier: 'low-end',
      price: 4499,
      images: {
        create: [
          {
            url: "https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/ecart-pay-test/uploads/rx6600-1.jpg"
          }
        ]
      } 
    },
    {
      name: 'NVIDIA GeForce RTX 2070 Super',
      description: '8GB GDDR6 memory, reliable 1440p performer',
      height: 1,
      length: 267,
      width: 51,
      brand: 'NVIDIA',
      tier: 'mid-end',
      price: 9999,
      images: {
        create: [
          {
            url: "https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/ecart-pay-test/uploads/2070super-1.jpg"
          }
        ]
      } 
    },
    {
      name: 'AMD Radeon RX 6500 XT',
      description: '4GB GDDR6 memory for budget gaming',
      height: 1,
      length: 242,
      width: 51,
      brand: 'AMD',
      tier: 'low-end',
      price: 3499,
      images: {
        create: [
          {
            url: "https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/ecart-pay-test/uploads/rx6500xt-1.jpg"
          }
        ]
      }
    },
    {
      name: 'NVIDIA GeForce GTX 1660 Super',
      description: '6GB GDDR6 memory for 1080p gaming',
      height: 1,
      length: 242,
      width: 51,
      brand: 'NVIDIA',
      tier: 'low-end',
      price: 4999,
      images: {
        create: [
          {
            url: "https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/ecart-pay-test/uploads/gtx1650-1.jpg"
          }
        ]
      }
    },
    {
      name: 'AMD Radeon RX 6400',
      description: '4GB GDDR6 memory for entry-level gaming',
      height: 1,
      length: 242,
      width: 51,
      brand: 'AMD',
      tier: 'low-end',
      price: 2999,
      images: {
        create: [
          {
            url: "https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/ecart-pay-test/uploads/rx6400-1.jpg"
          }
        ]
      }
    },
    {
      name: 'NVIDIA GeForce GTX 1650 Super',
      description: '4GB GDDR6 memory for basic gaming',
      height: 1,
      length: 242,
      width: 51,
      brand: 'NVIDIA',
      tier: 'low-end',
      price: 3999,
      images: {
        create: [
          {
            url: "https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/ecart-pay-test/uploads/1650super-1.jpg"
          }
        ]
      }
    },
  ];

  for (const gpu of gpus) {
    await prisma.catalogProduct.create({
      data: gpu,
    });
  }

  // Create Access Token for Admin
  await prisma.accessToken.create({
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
