import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class ProductServices {
  public async getProducts() {
    const products = await prisma.mytable.findMany({
      take: 20,
    });
    if (!products) return [];
    return products;
  }

  public async searchProducts(searchParam: string) {
    const products = await prisma.mytable.findMany({
      take: 20,
      where: {
        OR: [
          {
            Title: {
              contains: searchParam,
            },
          },
          {
            Categories: {
              contains: searchParam,
            },
          },
        ],
      },
    });
    if (!products) return [];
    return products;
  }
}
