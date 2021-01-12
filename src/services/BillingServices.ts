import { PrismaClient } from '@prisma/client';
import { IBilling } from '../types';

const prisma = new PrismaClient();

export default class BillingServices {
  public async newBilling(billing_props: IBilling) {
    try {
      const billing = await prisma.app_user_billing.create({
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
          phone: billing_props.phone,
          created_at: Date.now().toString(),
        },
      });
      return billing;
    } catch (e) {
      console.error(e);
    }
  }

  public async getUserBilling(user_id: number) {
    try {
      const billings = await prisma.app_user_billing.findMany({
        where: {
          user_id: user_id,
        },
      });
      return billings;
    } catch (e) {
      console.error(e);
    }
  }

  public async deleteBilling(billing_id: number) {
    try {
      const deletedBilling = await prisma.app_user_billing.delete({
        where: {
          id: billing_id,
        },
      });
      return deletedBilling;
    } catch (e) {
      console.error(e);
    }
  }
}
