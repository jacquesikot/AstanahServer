import * as express from 'express';
import { Request, Response } from 'express';

import { storeToken } from '../services/NotificationsServices';

class Notifications {
  public path = '/api/notifications';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(this.path, this.addToken);
  }

  private addToken = async (req: Request, res: Response) => {
    try {
      const tokenObject = await storeToken(req.body);
      if (!tokenObject) res.status(401);

      res.send(tokenObject);
    } catch (error) {
      console.log('Error from add Notifications controller', error);
    }
  };
}

export default Notifications;
