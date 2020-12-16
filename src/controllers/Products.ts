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
    this.router.get(this.path + '/search', this.searchProducts);
    this.router.get(this.path + '/filter', this.filterProducts);
  }

  private getProducts: RequestHandler = async (_req, res) => {
    try {
      const products = await productService.getProducts();
      const redisData = JSON.stringify(products);
      redisClient.setex('products', 3600, redisData);
      res.send(products);
    } catch (e) {
      log(e);
    }
  };

  private searchProducts: RequestHandler = async (req, res) => {
    if (req.query.search) {
      try {
        const products = await productService.searchProducts(
          req.query.search.toString()
        );
        res.send(products);
      } catch (e) {
        log(e);
      }
    }
  };

  private filterProducts: RequestHandler = async (req, res) => {
    try {
      if (req.params.category) {
        console.log(req.params);
        const products = await productService.filterCategory(
          Number(req.params.category)
        );
        res.send(products);
      }
    } catch (e) {
      log(e);
    }
  };
}

export default Products;
