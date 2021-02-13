import { RequestHandler, Router } from 'express';
import { validateOrder } from '../validation';

import { OrderServices } from '../services';

const orderServices = new OrderServices();

class Orders {
  public path = '/api/orders';
  public router = Router();

  constructor() {
    this.intializeRoutes();
  }

  // add auth middleware
  private intializeRoutes() {
    this.router.post(this.path, this.newOrder);
    this.router.get(this.path, this.getOrders);
  }

  private newOrder: RequestHandler = async (req, res) => {
    try {
      const { error } = validateOrder(req.body); // redo this validation to match new schema
      if (error) res.status(400).send(error.details[0].message);

      const order = await orderServices.newOrder(req.body);
      console.log(order);

      res.send(order);
    } catch (e) {
      console.log(e);
    }
  };

  private getOrders: RequestHandler = async (_req, res) => {
    try {
      const orders = await orderServices.getOrders();
      res.send(orders);
    } catch (e) {
      console.log(e);
    }
  };
}

export default Orders;
