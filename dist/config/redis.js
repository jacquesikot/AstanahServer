"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const constants_1 = require("../constants");
const REDIS = constants_1.__PROD__ ? constants_1.REDISCLOUD_URL : constants_1.REDIS_PORT;
const redisClient = redis_1.default.createClient(REDIS);
exports.default = redisClient;
//# sourceMappingURL=redis.js.map