import redis from 'redis';
import { REDISCLOUD_URL } from '../constants';

const redisClient = redis.createClient(REDISCLOUD_URL);

export default redisClient;
