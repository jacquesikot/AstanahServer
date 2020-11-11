import * as express from 'express';
import { Request, Response } from 'express';

import { CategoryServices } from '../services';
import { redisClient } from '../config';
import { Cache } from '../middlewares';

const cache = new Cache();
const categoryServices = new CategoryServices();

class Categories {
  public path = '/api/categories';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(this.path, cache.categories, this.getCategories);
  }

  private getCategories = async (_req: Request, res: Response) => {
    try {
      const categories = await categoryServices.getCategories();
      const redisData = JSON.stringify(categories);
      redisClient.setex('categories', 3600, redisData);
      res.send(categories);
    } catch (e) {
      console.log(e);
    }
  };
}

export default Categories;
