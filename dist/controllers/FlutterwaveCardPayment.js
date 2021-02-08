"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express = __importStar(require("express"));
const apisauce_1 = require("apisauce");
const services_1 = require("../services");
class FlutterwaveCardPayment {
    constructor() {
        this.path = '/api/cardpay';
        this.router = express.Router();
        this.flutterWaveApi = apisauce_1.create({
            baseURL: 'https://api.flutterwave.com/v3/charges?type=card',
            headers: {
                Authorization: 'FLWSECK_TEST-701c6e97947fa72009a19de521678c6f-X',
            },
        });
        this.pay = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const encryptedData = services_1.CardPayment.encrypt('FLWSECK_TEST76de52701f56', req.body.toString());
                const response = yield this.flutterWaveApi.post('', encryptedData);
                res.send(response.data);
            }
            catch (error) {
                console.log('Error from card pay controller', error);
            }
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.post(this.path, this.pay);
    }
}
exports.default = FlutterwaveCardPayment;
//# sourceMappingURL=FlutterwaveCardPayment.js.map