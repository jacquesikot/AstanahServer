import * as express from 'express';
import { Request, Response } from 'express';
import { create } from 'apisauce';

import { FLUTTERWAVE_SECRET } from '../constants';
import { CardPayment } from '../services';

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
    baseURL: 'https://api.flutterwave.com/v3/charges?type=card',
    headers: {
      Authorization: 'FLWSECK_TEST-701c6e97947fa72009a19de521678c6f-X',
    },
  });

  private pay = async (req: Request, res: Response) => {
    try {
      const encryptedData = CardPayment.encrypt(
        'FLWSECK_TEST76de52701f56',
        req.body.toString()
      );
      const response = await this.flutterWaveApi.post('', encryptedData);
      res.send(response.data);
    } catch (error) {
      console.log('Error from card pay controller', error);
    }
  };
}

export default FlutterwaveCardPayment;
