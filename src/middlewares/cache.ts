import { Request, Response, NextFunction } from 'express';

import { redisClient } from '../config';

export default class Cache {
  public async categories(req: Request, res: Response, next: NextFunction) {
    const path = `/api/categories + ${req.query}`;
    redisClient.get(path, (err: any, data: any) => {
      if (err) throw err;
      if (data !== null) {
        res.send(JSON.parse(data));
      } else {
        next();
      }
    });
  }

  public async products(_req: Request, res: Response, next: NextFunction) {
    redisClient.get('products', (err: any, data: any) => {
      if (err) throw err;
      if (data !== null) {
        res.send(JSON.parse(data));
      } else {
        next();
      }
    });
  }
}
