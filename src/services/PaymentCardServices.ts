import { PrismaClient } from '@prisma/client';
import { IPaymentCards } from '../types';

const prisma = new PrismaClient();

export default class PaymentCardServices {
  public async createCard(card_details: IPaymentCards) {
    const {
      user_id,
      card_number,
      card_holder_name,
      card_exp_date,
      cvv,
    } = card_details;
    try {
      const newCard = await prisma.app_user_cards.create({
        data: {
          app_users: {
            connect: { id: user_id },
          },
          card_number,
          card_holder_name,
          card_exp_date,
          cvv,
          created_at: Date.now().toString(),
        },
      });
      return newCard;
    } catch (error) {
      console.log(error);
    }
  }

  public async getCards(user_id: number) {
    try {
      const cards = await prisma.app_user_cards.findMany({
        where: {
          user_id,
        },
      });
      return cards;
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteCard(id: number) {
    try {
      const deletedCard = await prisma.app_user_cards.delete({
        where: {
          id,
        },
      });
      return deletedCard;
    } catch (error) {
      console.log(error);
    }
  }
}
