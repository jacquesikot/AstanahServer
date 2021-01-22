import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class CategoryServices {
  public async getCategories(take?: number) {
    const categories = await prisma.app_categories.findMany({
      take: take ? take : 50,
    });
    if (!categories) return [];
    return categories;
  }
}
