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
const services_1 = require("../services");
const config_1 = require("../config");
const categoryServices = new services_1.CategoryServices();
class Categories {
    constructor() {
        this.path = '/api/categories';
        this.router = express.Router();
        this.getCategories = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cacheIdentifier = `${this.path} + ${req.query.take}`;
            if (req.query) {
                try {
                    const categories = yield categoryServices.getCategories(Number(req.query.take));
                    const redisData = JSON.stringify(categories);
                    config_1.redisClient.setex(cacheIdentifier, 3600, redisData);
                    res.send(categories);
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path, this.getCategories);
    }
}
exports.default = Categories;
//# sourceMappingURL=Categories.js.map