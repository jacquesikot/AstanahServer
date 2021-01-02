import { PrismaClient } from '@prisma/client';
import { IOrder } from '../types';

const prisma = new PrismaClient();

export default class OrderServices {
  public async getOrders() {
    try {
      const orders = await prisma.app_orders.findMany();
      if (!orders) return [];
      return orders;
    } catch (e) {
      console.log(e);
    }
  }

  // new order should take a timestamp
  public async newOrder(order_props: IOrder) {
    const {
      user_id,
      billing_id,
      payment_method,
      set_paid,
      products,
    } = order_props;
    const order = await prisma.app_orders.create({
      data: {
        payment_method,
        set_paid,
        app_users: {
          connect: { id: user_id },
        },
        app_billing_address: {
          connect: { id: billing_id },
        },
      },
    });

    products.map(async (p) => {
      await prisma.app_order_details.create({
        data: {
          quantity: p.quantity,
          app_products: {
            connect: { id: p.product_id },
          },
          app_orders: {
            connect: { id: order.id },
          },
          app_users: {
            connect: { id: order_props.user_id },
          },
        },
      });
      return;
    });
    return order;
  }

  public async getUserOrders(user_id: number) {
    const orders = await prisma.app_orders.findMany({
      where: {
        user_id,
      },
    });
    return orders;
  }
}
