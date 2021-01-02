import * as express from 'express';
import { Request, Response } from 'express';
import passport from 'passport';

import { validateAuth, validateGoogleAuth } from '../validation';
import { UserServices } from '../services';

const services = new UserServices();

class Auth {
  public path = '/api/auth';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(this.path + `/local`, this.loginUser);

    this.router.get(
      this.path + `/google`,
      passport.authenticate('google', { scope: ['profile', 'email'] })
    );

    this.router.get(
      this.path + `/google/callback`,
      passport.authenticate('google', { failureRedirect: '/google/error' }),
      this.loginGoogleUser
    );

    this.router.get(this.path + `/google/error`, function (_req, res) {
      res.redirect('/');
    });

    this.router.get(this.path + `/google/logout`, function (req, res) {
      req.logout();
      res.redirect('/');
    });
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

    const token = await services.getToken(user);
    res.send(token);
  };

  private loginGoogleUser = async (req: any, res: Response) => {
    try {
      const { error } = validateGoogleAuth(req.user);
      if (error) return res.status(400).send(error.details[0].message);

      const user = await services.findOauthUser(req.user.email);
      if (!user) {
        const newUser = await services.createGoogleUser(req.user);
        const newUserToken = await services.getToken(newUser);
        res.send(newUserToken);
      } else if (user) {
        const token = await services.getToken(user);
        res.send(token);
      }
    } catch (e) {
      console.error(e);
    }
  };
}

export default Auth;
