const Redis = require("ioredis");
const dotenv = require("dotenv");

dotenv.config();

const redisPublisher = new Redis(process.env.REDIS_URL);
const redisSubscriber = new Redis(process.env.REDIS_URL);

redisPublisher.on("connect", () => {
  console.log("Redis Publisher conectado correctamente");
});

redisSubscriber.on("connect", () => {
  console.log("Redis Subscriber conectado correctamente");
});

redisPublisher.on("error", (error) => {
  console.error("Error en Redis Publisher:", error.message);
});

redisSubscriber.on("error", (error) => {
  console.error("Error en Redis Subscriber:", error.message);
});

module.exports = {
  redisPublisher,
  redisSubscriber
};