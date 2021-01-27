import { RequestHandler, Router } from 'express';

import { redisClient } from '../config';
import { FavoriteServices } from '../services';
import { Cache } from '../middlewares';

const cache = new Cache();
const favoriteServices = new FavoriteServices();

class Favorite {
  public path = '/api/favorites';
  public router = Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(this.path, this.addFavorite);
    this.router.get(this.path, cache.favorites, this.getFavorites);
    this.router.delete(this.path, this.deleteFavorite);
  }

  private addFavorite: RequestHandler = async (req, res) => {
    try {
      const favorite = await favoriteServices.addToFavorite(req.body);
      res.send(favorite);
    } catch (error) {
      console.log(error);
      res.status(501);
    }
  };

  private getFavorites: RequestHandler = async (req, res) => {
    const cacheIdentifier = `/api/favorites + ${req.query.user_id}`;
    try {
      const favorites = await favoriteServices.getFavorites(
        Number(req.query.user_id)
      );
      const redisData = JSON.stringify(favorites);
      redisClient.setex(cacheIdentifier, 3600, redisData);
      res.send(favorites);
    } catch (e) {
      console.error(e);
      res.status(501);
    }
  };

  private deleteFavorite: RequestHandler = async (req, res) => {
    try {
      const deletedFavorite = await favoriteServices.deleteFavorite(
        Number(req.query.favorite_id)
      );
      res.send(deletedFavorite);
    } catch (e) {
      console.log(e);
      res.status(501);
    }
  };
}

export default Favorite;
