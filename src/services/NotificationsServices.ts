import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IToken {
  user_id: number;
  token: string;
}

export const storeToken = async ({ user_id, token }: IToken) => {
  try {
    const savedToken = await prisma.app_notifications.create({
      data: {
        app_users: { connect: { id: user_id } },
        token,
        created_at: Date.now().toString(),
      },
    });
    return savedToken;
  } catch (error) {
    console.log('Error saving Token', error);
  }
};
