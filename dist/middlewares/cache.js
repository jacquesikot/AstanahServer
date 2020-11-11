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
const config_1 = require("../config");
class Cache {
    categories(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            config_1.redisClient.get('categories', (err, data) => {
                if (err)
                    throw err;
                if (data !== null) {
                    res.send(JSON.parse(data));
                }
                else {
                    next();
                }
            });
        });
    }
    products(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            config_1.redisClient.get('products', (err, data) => {
                if (err)
                    throw err;
                if (data !== null) {
                    res.send(JSON.parse(data));
                }
                else {
                    next();
                }
            });
        });
    }
}
exports.default = Cache;
//# sourceMappingURL=cache.js.map