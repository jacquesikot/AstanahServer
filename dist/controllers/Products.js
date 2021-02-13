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
const log = require('debug')('app:log');
const cache = new middlewares_1.Cache();
const productService = new services_1.ProductServices();
class Products {
    constructor() {
        this.path = '/api/products';
        this.router = express_1.Router();
        this.getProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query;
                if (query.searchBy) {
                    const products = yield productService.searchProducts(query.searchBy.toString());
                    if (products === [])
                        res.status(400).send([]);
                    res.send(products);
                }
                else if (query.category) {
                    const products = yield productService.filterCategory(query.category.toString());
                    res.send(products);
                }
                else {
                    const cacheIdentifier = `/api/products + ${req.query.take}`;
                    const products = yield productService.getProducts(Number(req.query.take));
                    const redisData = JSON.stringify(products);
                    config_1.redisClient.setex(cacheIdentifier, 3600, redisData);
                    res.send(products);
                }
            }
            catch (e) {
                log(e);
            }
        });
        this.getSaleProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cacheIdentifier = `/api/products/sale + ${req.query.take}`;
            try {
                const saleProducts = yield productService.filterSale(Number(req.query.take));
                if (saleProducts === [])
                    res.status(404).send('No Sale Products');
                const redisData = JSON.stringify(saleProducts);
                config_1.redisClient.setex(cacheIdentifier, 3600, redisData);
                res.status(200).send(saleProducts);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.getProductByCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const param = req.query.category;
                const products = yield productService.filterCategory(param.toString());
                res.send(products);
            }
            catch (error) {
                console.log('Error from get product by categories', error);
            }
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path, this.getProducts);
        this.router.get(this.path + '/sale', cache.saleProducts, this.getSaleProducts);
        this.router.get(this.path + '/category', this.getProductByCategory);
    }
}
exports.default = Products;
//# sourceMappingURL=Products.js.map