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
    this.router.get(this.path, this.getProducts);
    this.router.get(
      this.path + '/sale',
      cache.saleProducts,
      this.getSaleProducts
    );
  }

  private getProducts: RequestHandler = async (req, res) => {
    try {
      const query = req.query;
      if (query.searchBy) {
        const products = await productService.searchProducts(
          query.searchBy.toString()
        );
        if (products === []) res.status(400).send([]);
        res.send(products);
      } else if (query.category) {
        const products = await productService.filterCategory(
          query.category.toString()
        );
        res.send(products);
      } else {
        const cacheIdentifier = `/api/products + ${req.query.take}`;
        const products = await productService.getProducts(
          Number(req.query.take)
        );
        const redisData = JSON.stringify(products);
        redisClient.setex(cacheIdentifier, 3600, redisData);
        res.send(products);
      }
    } catch (e) {
      log(e);
    }
  };

  private getSaleProducts: RequestHandler = async (req, res) => {
    const cacheIdentifier = `/api/products/sale + ${req.query.take}`;
    try {
      const saleProducts = await productService.filterSale(
        Number(req.query.take)
      );
      if (saleProducts === []) res.status(404).send('No Sale Products');
      const redisData = JSON.stringify(saleProducts);
      redisClient.setex(cacheIdentifier, 3600, redisData);
      res.status(200).send(saleProducts);
    } catch (error) {
      console.log(error);
    }
  };
}

export default Products;
