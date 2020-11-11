import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class CategoryServices {
  public async getCategories() {
    const categories = await prisma.app_categories.findMany();
    if (!categories) return [];
    return categories;
  }
}
