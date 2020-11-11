import * as express from 'express';
import { Request, Response } from 'express';

import { validateUser } from '../validation';
import { UserServices } from '../services';
import { auth } from '../middlewares';

const services = new UserServices();

class User {
  public path = '/api/users';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(this.path, this.addUser);
    this.router.get(this.path, auth, this.getUser);
  }

  private addUser = async (req: Request, res: Response) => {
    try {
      const { error } = validateUser(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      let user = await services.findUser(req.body);
      if (user) return res.status(400).send('User already registered');

      const response = await services.createUser(req.body);

      const token = await services.getToken(response.ID);
      res.header('x-auth-token', token).send(response);
    } catch (e) {
      console.log(e);
    }
  };

  private getUser = async (req: any, res: Response) => {
    const user = await services.findUserById(req.user.ID);
    res.send(user);
  };
}

export default User;
