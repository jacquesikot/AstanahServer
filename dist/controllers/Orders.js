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
const validation_1 = require("../validation");
const services_1 = require("../services");
const orderServices = new services_1.OrderServices();
class Orders {
    constructor() {
        this.path = '/api/orders';
        this.router = express_1.Router();
        this.newOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = validation_1.validateOrder(req.body);
                if (error)
                    res.status(400).send(error.details[0].message);
                const order = yield orderServices.newOrder(req.body);
                res.send(order);
            }
            catch (e) {
                console.log(e);
            }
        });
        this.getOrders = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield orderServices.getOrders();
                res.send(orders);
            }
            catch (e) {
                console.log(e);
            }
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.post(this.path, this.newOrder);
        this.router.get(this.path, this.getOrders);
    }
}
exports.default = Orders;
//# sourceMappingURL=Orders.js.map