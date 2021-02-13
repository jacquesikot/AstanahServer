import * as express from 'express';
import { Request, Response } from 'express';

import { PaymentCardServices } from '../services';
import { validatePaymentCard } from '../validation';

const paymentCardService = new PaymentCardServices();

class PaymentCard {
  public path = '/api/paymentcard';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(this.path, this.getCards);
    this.router.post(this.path, this.addCards);
    this.router.delete(this.path, this.deleteCard);
  }

  private getCards = async (req: Request, res: Response) => {
    try {
      const cards = await paymentCardService.getCards(
        Number(req.query.user_id)
      );
      res.send(cards);
    } catch (error) {
      console.log(error);
    }
  };

  private addCards = async (req: Request, res: Response) => {
    try {
      const { error } = validatePaymentCard(req.body);
      if (error) return res.status(401).send(error.details[0].message);

      const newCard = await paymentCardService.createCard(req.body);
      if (!newCard) res.status(500).send('Error adding card to database');
      res.send(newCard);
    } catch (error) {
      console.log(error);
    }
  };

  private deleteCard = async (req: Request, res: Response) => {
    try {
      const deletedCard = await paymentCardService.deleteCard(
        Number(req.query.id)
      );
      res.send(deletedCard);
    } catch (error) {
      console.log(error);
    }
  };
}

export default PaymentCard;
