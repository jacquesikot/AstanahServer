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
const log = require('debug')('app:log');
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
                    res.send(products);
                }
                else if (query.category) {
                    const products = yield productService.filterCategory(query.category.toString());
                    res.send(products);
                }
                else {
                    const products = yield productService.getProducts();
                    const redisData = JSON.stringify(products);
                    config_1.redisClient.setex('products', 3600, redisData);
                    res.send(products);
                }
            }
            catch (e) {
                log(e);
            }
        });
        this.getSaleProducts = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const saleProducts = yield productService.filterSale();
                if (saleProducts === [])
                    res.status(404).send('No Sale Products');
                res.status(200).send(saleProducts);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path, this.getProducts);
        this.router.get(this.path + '/sale', this.getSaleProducts);
    }
}
exports.default = Products;
//# sourceMappingURL=Products.js.map