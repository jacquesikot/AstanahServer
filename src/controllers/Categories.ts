import * as express from 'express';
import { Request, Response } from 'express';

import { CategoryServices } from '../services';
import { redisClient } from '../config';

const categoryServices = new CategoryServices();

class Categories {
  public path = '/api/categories';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(this.path, this.getCategories);
  }

  private getCategories = async (req: Request, res: Response) => {
    const cacheIdentifier = `${this.path} + ${req.query.take}`;
    if (req.query) {
      try {
        const categories = await categoryServices.getCategories(
          Number(req.query.take)
        );
        const redisData = JSON.stringify(categories);
        redisClient.setex(cacheIdentifier, 3600, redisData);
        res.send(categories);
      } catch (e) {
        console.log(e);
      }
    }
  };
}

export default Categories;
