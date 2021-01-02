import { RequestHandler, Router } from 'express';

import { BillingServices } from '../services';
import { validateBilling } from '../validation';

const billingServices = new BillingServices();

class Billing {
  public path = '/api/billing';
  public router = Router();

  constructor() {
    this.intializeRoutes();
  }

  // add auth middleware
  private intializeRoutes() {
    this.router.post(this.path, this.newBilling);
    this.router.get(this.path, this.getBilling);
    this.router.delete(this.path, this.deleteBilling);
  }

  private newBilling: RequestHandler = async (req, res) => {
    try {
      const { error } = validateBilling(req.body);
      if (error) res.status(400).send(error.details[0].message);

      const billing = await billingServices.newBilling(req.body);
      res.send(billing);
    } catch (e) {
      console.log(e);
      res.status(501);
    }
  };

  private getBilling: RequestHandler = async (req, res) => {
    try {
      const billings = await billingServices.getUserBilling(
        Number(req.query.user_id)
      );
      res.send(billings);
    } catch (e) {
      console.error(e);
      res.status(501).send('An unexpected error occured');
    }
  };

  private deleteBilling: RequestHandler = async (req, res) => {
    try {
      const deletedBilling = await billingServices.deleteBilling(
        Number(req.query.billing_id)
      );
      res.send(deletedBilling);
    } catch (e) {
      console.log(e);
      res.status(501).send('An unexpected error occured.');
    }
  };
}

export default Billing;
