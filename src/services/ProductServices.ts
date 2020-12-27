import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class ProductServices {
  public async getProducts() {
    const products = await prisma.app_products.findMany({
      take: 20,
      where: {
        Regular_price: {
          gt: 1,
        },
      },
    });
    if (!products) return [];
    return products;
  }

  public async searchProducts(searchParam: string) {
    const products = await prisma.app_products.findMany({
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

  public async filterCategory(categoryName: string) {
    const products = await prisma.app_products.findMany({
      take: 20,
      where: {
        Categories: {
          contains: categoryName.toLowerCase(),
        },
      },
    });
    if (!products) return [];
    return products;
  }
}
