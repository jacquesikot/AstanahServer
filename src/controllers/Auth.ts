import * as express from 'express';
import { Request, Response } from 'express';
import passport from 'passport';

import { validateAuth } from '../validation';
import { UserServices } from '../services';

const services = new UserServices();

class Auth {
  public path = '/auth';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(this.path + `/local`, this.loginUser);
    this.router.get(
      this.path + `/google`,
      passport.authenticate('google', { scope: ['profile'] })
    );
    this.router.get(
      this.path + `/google/callback`,
      passport.authenticate('google', { failureRedirect: '/login' }),
      function (_req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      }
    );
  }

  private loginUser = async (req: Request, res: Response) => {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await services.findUser(req.body);
    if (!user) return res.status(400).send('Invalid email and/or password');

    const validPassword = await services.validatePassword(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send('Invalid email and/or password');

    const token = await services.getToken(user.id);
    res.send(token);
  };
}

export default Auth;
