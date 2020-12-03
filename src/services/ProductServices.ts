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

  // Check, maybe we can use the category name directly, instead of making multiple DB calls
  public async filterCategory(categoryId: number) {
    const category = await prisma.app_categories.findOne({
      where: {
        id: categoryId,
      },
    });
    if (!category) return [];
    const products = await prisma.app_products.findMany({
      where: {
        Categories: {
          contains: category.category_name,
        },
      },
    });
    return products;
  }
}
