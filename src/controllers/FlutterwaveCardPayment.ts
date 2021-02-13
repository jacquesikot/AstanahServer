import * as express from 'express';
import { Request, Response } from 'express';
import { create } from 'apisauce';

class FlutterwaveCardPayment {
  public path = '/api/cardpay';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(this.path, this.pay);
  }

  flutterWaveApi = create({
    baseURL: 'https://api.flutterwave.com/v3/payments',
    headers: {
      Authorization: 'FLWSECK_TEST-701c6e97947fa72009a19de521678c6f-X',
    },
  });

  private pay = async (req: Request, res: Response) => {
    try {
      const data = {
        tx_ref: `pRef-${Math.random()}`,
        amount: req.body.amount,
        currency: 'ZMW',
        redirect_url: req.body.redirect_url,
        payment_options: 'card, mobilemoneyzambia',
        meta: {
          consumer_id: req.body.consumer_id,
          consumer_mac: 'random string',
        },
        customer: {
          email: req.body.email,
          phonenumber: req.body.phone_number,
          name: req.body.name,
        },
      };
      const response = await this.flutterWaveApi.post('', data);
      res.send(response.data);
    } catch (error) {
      console.log('Error from card pay controller', error);
    }
  };
}

export default FlutterwaveCardPayment;
