import { Redis } from "ioredis";

const redis = new Redis({
  username: Bun.env.REDIS_USER,
  password: Bun.env.REDIS_PASSWORD,
  port: +(Bun.env.REDIS_PORT || 6379),
  host: Bun.env.REDIS_HOST,
});

await redis.set("mykey", "value"); // Returns a promise which resolves to "OK" when the command succeeds.

// ioredis supports the node.js callback style
redis.get("mykey", (err, result) => {
  if (err) {
    console.error('error', err);
  } else {
    console.log(result); // Prints "value"
  }
});

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response(`Bun!`);
  },
});

console.log(`Listening on http://localhost:${server.port}...`);