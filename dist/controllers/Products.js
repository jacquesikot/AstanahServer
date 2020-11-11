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
const config_1 = require("../config");
const middlewares_1 = require("../middlewares");
const cache = new middlewares_1.Cache();
const productService = new services_1.ProductServices();
class Products {
    constructor() {
        this.path = '/api/products';
        this.router = express_1.Router();
        this.getProducts = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productService.getProducts();
                const redisData = JSON.stringify(products);
                config_1.redisClient.setex('products', 3600, redisData);
                res.send(products);
            }
            catch (e) {
                console.log(e);
            }
        });
        this.searchProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.query.search) {
                try {
                    const products = yield productService.searchProducts(req.query.search.toString());
                    res.send(products);
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path, cache.products, this.getProducts);
        this.router.get(this.path + '/search', this.searchProducts);
    }
}
exports.default = Products;
//# sourceMappingURL=Products.js.map