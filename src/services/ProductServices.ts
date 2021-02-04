import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class ProductServices {
  public async getProducts(take?: number) {
    const products = await prisma.app_products.findMany({
      take: take ? take : 20,
      where: {
        regular_price: {
          gt: 1,
        },
      },
    });
    if (!products) return [];
    return products;
  }

  public async searchProducts(searchParam: string, take?: number) {
    const products = await prisma.app_products.findMany({
      take: take ? take : 20,
      where: {
        title: {
          contains: searchParam,
        },
        regular_price: {
          gt: 1,
        },
      },
    });

    if (!products) return [];
    return products;
  }

  public async filterCategory(categoryName: string, take?: number) {
    const products = await prisma.app_products.findMany({
      take: take ? take : 20,
      where: {
        gallery: {
          contains: categoryName.toLowerCase(),
        },
        regular_price: {
          gt: 1,
        },
      },
    });
    if (!products) return [];
    return products;
  }

  public async filterSale(take?: number) {
    const products = await prisma.app_products.findMany({
      take: take ? take : 20,
      where: {
        sale_price: {
          gt: 1,
        },
      },
    });
    if (!products) return [];
    return products;
  }
}
