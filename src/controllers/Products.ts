import { Request, Response, Router } from 'express';

import { ProductServices } from '../services';
import { redisClient } from '../config';
import { Cache } from '../middlewares';

const cache = new Cache();
const productService = new ProductServices();

class Products {
  public path = '/api/products';
  public router = Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(this.path, cache.products, this.getProducts);
    this.router.get(this.path + '/search', this.searchProducts);
  }

  private getProducts = async (_req: Request, res: Response) => {
    try {
      const products = await productService.getProducts();
      const redisData = JSON.stringify(products);
      redisClient.setex('products', 3600, redisData);
      res.send(products);
    } catch (e) {
      console.log(e);
    }
  };

  private searchProducts = async (req: Request, res: Response) => {
    if (req.query.search) {
      try {
        const products = await productService.searchProducts(
          req.query.search.toString()
        );
        res.send(products);
      } catch (e) {
        console.log(e);
      }
    }
  };
}

export default Products;
