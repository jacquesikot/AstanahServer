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
    this.router.get(this.path, this.getUser);
    this.router.post(this.path + `/update`, auth, this.updateUser);
  }

  private addUser = async (req: Request, res: Response) => {
    try {
      const { error } = validateUser(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      let user = await services.findUser(req.body);
      if (user) return res.status(400).send('User already registered');

      const response = await services.createUser(req.body);

      const token = await services.getToken(response);
      res.header('x-auth-token', token).send(response);
    } catch (e) {
      res.status(500).send('An unexpected error occured.');
    }
  };

  private getUser = async (req: any, res: Response) => {
    try {
      console.log(req);
      const user = await services.findUserById(req.user.id);
      res.send(user);
    } catch (error) {
      console.log('Error from getUser Handler', error);
    }
  };

  private updateUser = async (req: any, res: Response) => {
    // Run validation
    try {
      const user = await services.updateUser(req.body);
      res.send(user);
      // console.log(user);
    } catch (e) {
      console.log(e);
    }
  };
}

export default User;
