import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface FavoriteProps {
  user_id: number;
  product_id: number;
}

export default class FavoriteServices {
  public async getFavorites(id: number, take?: number) {
    try {
      const favorites = await prisma.app_user_likes.findMany({
        take: take ? take : 50,
        where: {
          user_id: id,
        },
      });
      if (!favorites) return [];

      const res = await favorites.map(async (favorite) => {
        const favs = await prisma.app_products.findOne({
          where: {
            id: favorite.product_id,
          },
        });
        return {
          favorite_id: favorite.id,
          ...favs,
        };
      });
      return await Promise.all(res);
    } catch (error) {
      console.log(error);
    }
  }

  public async addToFavorite({ user_id, product_id }: FavoriteProps) {
    try {
      const favorite = await prisma.app_user_likes.create({
        data: {
          app_users: { connect: { id: user_id } },
          app_products: { connect: { id: product_id } },
          created_at: Date.now().toString(),
        },
      });
      return favorite;
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteFavorite(id: number) {
    try {
      const deletedFavorite = await prisma.app_user_likes.delete({
        where: {
          id,
        },
      });
      return deletedFavorite;
    } catch (error) {
      console.log(error);
    }
  }
}
