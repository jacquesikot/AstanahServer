import redis from 'redis';
import { REDISCLOUD_URL, REDIS_PORT, __PROD__ } from '../constants';

const REDIS = __PROD__ ? REDISCLOUD_URL : REDIS_PORT;

const redisClient = redis.createClient(REDIS);

export default redisClient;
