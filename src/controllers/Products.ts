import { Router, RequestHandler } from 'express';

import { ProductServices } from '../services';
import { redisClient } from '../config';
//import { Cache } from '../middlewares';

const log = require('debug')('app:log');

// const cache = new Cache();
const productService = new ProductServices();

class Products {
  public path = '/api/products';
  public router = Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(this.path, this.getProducts);
    this.router.get(this.path + '/sale', this.getSaleProducts);
  }

  private getProducts: RequestHandler = async (req, res) => {
    try {
      const query = req.query;
      if (query.searchBy) {
        const products = await productService.searchProducts(
          query.searchBy.toString()
        );
        res.send(products);
      } else if (query.category) {
        const products = await productService.filterCategory(
          query.category.toString()
        );
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

  private getSaleProducts: RequestHandler = async (_req, res) => {
    try {
      const saleProducts = await productService.filterSale();
      if (saleProducts === []) res.status(404).send('No Sale Products');
      res.status(200).send(saleProducts);
    } catch (error) {
      console.log(error);
    }
  };
}

export default Products;
