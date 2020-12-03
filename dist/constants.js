"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_PORT = exports.REDISCLOUD_URL = exports.JWT_KEY = exports.MONGODB_URI = exports.WOOCOMMERCEDB_URI = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT;
exports.WOOCOMMERCEDB_URI = process.env.WOOCOMMERCEDB_URI
    ? process.env.WOOCOMMERCEDB_URI
    : '';
exports.MONGODB_URI = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : '';
exports.JWT_KEY = process.env.JWT_KEY ? process.env.JWT_KEY : '';
exports.REDISCLOUD_URL = process.env.REDISCLOUD_URL
    ? process.env.REDISCLOUD_URL
    : '';
exports.REDIS_PORT = process.env.REDIS_PORT ? process.env.REDIS_PORT : '';
//# sourceMappingURL=constants.js.map