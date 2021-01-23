import 'dotenv/config';

export const __PROD__ = process.env.NODE_ENV === 'production';
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
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
  ? process.env.GOOGLE_CLIENT_ID
  : '';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
  ? process.env.GOOGLE_CLIENT_SECRET
  : '';
export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL
  ? process.env.GOOGLE_CALLBACK_URL
  : '';
