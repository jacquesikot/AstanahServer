import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class ProductServices {
  public async getProducts() {
    const products = await prisma.app_products.findMany({
      take: 20,
      where: {
        regular_price: {
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

  public async filterCategory(categoryName: string) {
    const products = await prisma.app_products.findMany({
      take: 20,
      where: {
        categories: {
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

  public async filterSale() {
    const products = await prisma.app_products.findMany({
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
