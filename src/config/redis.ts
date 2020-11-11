import redis from 'redis';
import { REDISCLOUD_URL } from '../constants';

const redisClient = redis.createClient(REDISCLOUD_URL, {
  no_ready_check: true,
});

export default redisClient;
