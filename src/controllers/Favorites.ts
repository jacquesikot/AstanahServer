import { RequestHandler, Router } from 'express';

import { FavoriteServices } from '../services';

const favoriteServices = new FavoriteServices();

class Favorite {
  public path = '/api/favorites';
  public router = Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(this.path, this.addFavorite);
    this.router.get(this.path, this.getFavorites);
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
    try {
      const favorites = await favoriteServices.getFavorites(
        Number(req.query.user_id)
      );
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
