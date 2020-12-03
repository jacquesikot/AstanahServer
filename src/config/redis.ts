import redis from 'redis';
import { REDIS_PORT } from '../constants';

const redisClient = redis.createClient(REDIS_PORT, {
  no_ready_check: true,
});

export default redisClient;
