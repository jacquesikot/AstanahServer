import { PrismaClient } from '@prisma/client';
import { IOrder, IBilling } from '../types';

const prisma = new PrismaClient();

export default class OrderServices {
  public async getOrders() {
    const orders = await prisma.app_orders.findMany();
    if (!orders) return [];
    return orders;
  }

  public async newOrder(order_props: IOrder) {
    const order = await prisma.app_orders.create({
      data: {
        payment_method: order_props.payment_method,
        set_paid: order_props.set_paid,
        app_users: {
          connect: { id: order_props.user_id },
        },
        app_billing_address: {
          connect: { id: order_props.billing_id },
        },
      },
    });

    await order_props.products.map(async (p) => {
      const orderDetail = await prisma.app_order_details.create({
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
      return orderDetail;
    });
    return order;
  }

  public async newBilling(billing_props: IBilling) {
    const billing = await prisma.app_billing_address.create({
      data: {
        app_users: {
          connect: { id: billing_props.user_id },
        },
        first_name: billing_props.first_name,
        last_name: billing_props.last_name,
        address: billing_props.address,
        city: billing_props.city,
        state: billing_props.state,
        postcode: billing_props.postcode,
        country: billing_props.country,
        email: billing_props.email,
        phone: billing_props.phone,
      },
    });

    return billing;
  }
}
