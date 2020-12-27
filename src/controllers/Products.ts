import { Router, RequestHandler } from 'express';

import { ProductServices } from '../services';
import { redisClient } from '../config';
import { Cache } from '../middlewares';

const log = require('debug')('app:log');

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
  }

  private getProducts: RequestHandler = async (req, res) => {
    try {
      const query = req.query;
      if (query.category) {
        const searchString = query.category.toString();
        const products = await productService.filterCategory(searchString);
        res.send(products);
      } else if (query.searchBy) {
        const searchString = query.searchBy.toString();
        const products = await productService.searchProducts(searchString);
        res.send(products);
      } else {
        const products = await productService.getProducts();
        const redisData = JSON.stringify(products);
        redisClient.setex('products', 3600, redisData);
        res.send(products);
      }
    } catch (e) {
      log(e);
    }
  };
}

export default Products;
