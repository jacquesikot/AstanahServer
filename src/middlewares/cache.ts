import { Request, Response, NextFunction } from 'express';

import { redisClient } from '../config';

export default class Cache {
  public async categories(req: Request, res: Response, next: NextFunction) {
    const path = `/api/categories + ${req.query.take}`;
    redisClient.get(path, (err: any, data: any) => {
      if (err) throw err;
      if (data !== null) {
        res.send(JSON.parse(data));
      } else {
        next();
      }
    });
  }

  public async products(req: Request, res: Response, next: NextFunction) {
    const path = `/api/products + ${req.query.take}`;
    redisClient.get(path, (err: any, data: any) => {
      if (err) throw err;
      if (data !== null) {
        res.send(JSON.parse(data));
      } else {
        next();
      }
    });
  }

  public async saleProducts(req: Request, res: Response, next: NextFunction) {
    const path = `/api/products/sale + ${req.query.take}`;
    redisClient.get(path, (err: any, data: any) => {
      if (err) throw err;
      if (data !== null) {
        res.send(JSON.parse(data));
      } else {
        next();
      }
    });
  }
}
