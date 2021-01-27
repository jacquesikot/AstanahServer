"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = require("../services");
const favoriteServices = new services_1.FavoriteServices();
class Favorite {
    constructor() {
        this.path = '/api/favorites';
        this.router = express_1.Router();
        this.addFavorite = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const favorite = yield favoriteServices.addToFavorite(req.body);
                res.send(favorite);
            }
            catch (error) {
                console.log(error);
                res.status(501);
            }
        });
        this.getFavorites = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const favorites = yield favoriteServices.getFavorites(Number(req.query.user_id));
                res.send(favorites);
            }
            catch (e) {
                console.error(e);
                res.status(501);
            }
        });
        this.deleteFavorite = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedFavorite = yield favoriteServices.deleteFavorite(Number(req.query.favorite_id));
                res.send(deletedFavorite);
            }
            catch (e) {
                console.log(e);
                res.status(501);
            }
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.post(this.path, this.addFavorite);
        this.router.get(this.path, this.getFavorites);
        this.router.delete(this.path, this.deleteFavorite);
    }
}
exports.default = Favorite;
//# sourceMappingURL=Favorites.js.map