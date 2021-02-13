"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const woocommerce_rest_api_1 = __importDefault(require("@woocommerce/woocommerce-rest-api"));
const CK = 'ck_38c81ae141dfc6b55079bd43b67c4cc16dd2a1fb';
const CS = 'cs_b138ff6b9d0bcbcbc63158d3e4a79e0008dec230';
const woocommerce = new woocommerce_rest_api_1.default({
    url: 'https://astanah.com',
    consumerKey: CK,
    consumerSecret: CS,
    version: 'wc/v3',
    queryStringAuth: true,
});
exports.default = woocommerce;
//# sourceMappingURL=woocommerce.js.map