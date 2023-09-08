import { Redis } from "ioredis";
import { Router } from '@stricjs/router';
import { faker } from '@faker-js/faker';

const redis = new Redis({
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
  port: +(process.env.REDIS_PORT || 6379),
  host: process.env.REDIS_HOST,
});

const rootResponse = async () => {
  await redis.incr("total:requests");
  const totalRequests = await redis.get("total:requests");

  const message = faker.helpers.fake(
    '{{person.prefix}} {{person.lastName}} is {{animal.dog}} today'
  )
  await redis.set("latest:message", message);
  const latestMessage = await redis.get("latest:message");
  return Response.json({ latestMessage, totalRequests })
}

const router = new Router()
  .get('/', rootResponse);

export default router;