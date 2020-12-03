"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrder = exports.validateAuth = exports.validateUser = void 0;
var user_1 = require("./user");
Object.defineProperty(exports, "validateUser", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
Object.defineProperty(exports, "validateAuth", { enumerable: true, get: function () { return user_1.validateAuth; } });
var order_1 = require("./order");
Object.defineProperty(exports, "validateOrder", { enumerable: true, get: function () { return __importDefault(order_1).default; } });
//# sourceMappingURL=index.js.map