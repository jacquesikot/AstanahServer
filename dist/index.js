"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const appServer_1 = __importDefault(require("./config/appServer"));
const controllers_1 = require("./controllers");
const app = new appServer_1.default([
    new controllers_1.Home(),
    new controllers_1.Products(),
    new controllers_1.Categories(),
    new controllers_1.Auth(),
    new controllers_1.Users(),
    new controllers_1.Orders(),
    new controllers_1.Billing(),
    new controllers_1.PaymentCard(),
    new controllers_1.Favorites(),
], constants_1.PORT);
if (!process.env.JWT_KEY) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}
app.listen();
//# sourceMappingURL=index.js.map