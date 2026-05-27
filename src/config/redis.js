const Redis = require("ioredis");
const dotenv = require("dotenv");

dotenv.config();

let publisherConnection = null;
let subscriberConnection = null;

const getRedisUrl = () => {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error("La variable REDIS_URL no está configurada");
  }

  if (!redisUrl.startsWith("rediss://")) {
    throw new Error("REDIS_URL debe comenzar con rediss://");
  }

  return redisUrl;
};

const createRedisConnection = (connectionName) => {
  const redisUrl = getRedisUrl();

  const connection = new Redis(redisUrl, {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      const delay = Math.min(times * 200, 2000);
      return delay;
    }
  });

  connection.on("connect", () => {
    console.log(`${connectionName} conectado correctamente`);
  });

  connection.on("error", (error) => {
    console.error(`Error en ${connectionName}:`, {
      message: error.message,
      code: error.code,
      name: error.name
    });
  });

  return connection;
};

const getRedisPublisher = () => {
  if (!publisherConnection) {
    publisherConnection = createRedisConnection("Redis Publisher");
  }

  return publisherConnection;
};

const getRedisSubscriber = () => {
  if (!subscriberConnection) {
    subscriberConnection = createRedisConnection("Redis Subscriber");
  }

  return subscriberConnection;
};

const closeRedisConnections = () => {
  if (publisherConnection) {
    publisherConnection.disconnect();
    publisherConnection = null;
  }

  if (subscriberConnection) {
    subscriberConnection.disconnect();
    subscriberConnection = null;
  }
};

module.exports = {
  getRedisPublisher,
  getRedisSubscriber,
  closeRedisConnections
};