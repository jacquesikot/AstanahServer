import 'dotenv/config';

export const PORT = process.env.PORT;
export const WOOCOMMERCEDB_URI = process.env.WOOCOMMERCEDB_URI
  ? process.env.WOOCOMMERCEDB_URI
  : '';
export const MONGODB_URI = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : '';
export const JWT_KEY = process.env.JWT_KEY ? process.env.JWT_KEY : '';
export const REDISCLOUD_URL = process.env.REDISCLOUD_URL
  ? process.env.REDISCLOUD_URL
  : '';
export const REDIS_PORT = process.env.REDIS_PORT ? process.env.REDIS_PORT : '';
