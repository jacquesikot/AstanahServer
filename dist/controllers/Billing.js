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
const validation_1 = require("../validation");
const billingServices = new services_1.BillingServices();
class Billing {
    constructor() {
        this.path = '/api/billing';
        this.router = express_1.Router();
        this.newBilling = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = validation_1.validateBilling(req.body);
                if (error)
                    res.status(400).send(error.details[0].message);
                const billing = yield billingServices.newBilling(req.body);
                res.send(billing);
            }
            catch (e) {
                console.log(e);
                res.status(501);
            }
        });
        this.getBilling = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const billings = yield billingServices.getUserBilling(Number(req.query.user_id));
                res.send(billings);
            }
            catch (e) {
                console.error(e);
                res.status(501).send('An unexpected error occured');
            }
        });
        this.deleteBilling = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedBilling = yield billingServices.deleteBilling(Number(req.query.billing_id));
                res.send(deletedBilling);
            }
            catch (e) {
                console.log(e);
                res.status(501).send('An unexpected error occured.');
            }
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.post(this.path, this.newBilling);
        this.router.get(this.path, this.getBilling);
        this.router.delete(this.path, this.deleteBilling);
    }
}
exports.default = Billing;
//# sourceMappingURL=Billing.js.map