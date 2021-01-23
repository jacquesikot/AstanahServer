"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOOGLE_CALLBACK_URL = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = exports.REDIS_PORT = exports.REDISCLOUD_URL = exports.JWT_KEY = exports.MONGODB_URI = exports.WOOCOMMERCEDB_URI = exports.PORT = exports.__PROD__ = void 0;
require("dotenv/config");
exports.__PROD__ = process.env.NODE_ENV === 'production';
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
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
    ? process.env.GOOGLE_CLIENT_ID
    : '';
exports.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
    ? process.env.GOOGLE_CLIENT_SECRET
    : '';
exports.GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL
    ? process.env.GOOGLE_CALLBACK_URL
    : '';
//# sourceMappingURL=constants.js.map