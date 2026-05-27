const { getRedisPublisher } = require("../config/redis");

const publishEvent = async (channel, event) => {
  try {
    const redisPublisher = getRedisPublisher();

    const message = JSON.stringify(event);

    await redisPublisher.publish(channel, message);

    console.log(`Evento publicado en el canal: ${channel}`);
  } catch (error) {
    console.error("Error al publicar evento:", {
      message: error.message,
      code: error.code,
      name: error.name
    });
  }
};

module.exports = {
  publishEvent
};