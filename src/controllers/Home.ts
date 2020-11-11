import * as express from 'express';
import { Request, Response } from 'express';

class Home {
  public path = '/';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(this.path, this.home);
  }

  private home = async (_req: Request, res: Response) => {
    res.send('Astanah Mobile App Server: LIVE');
  };
}

export default Home;
