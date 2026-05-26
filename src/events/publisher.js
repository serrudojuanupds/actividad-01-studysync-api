const { redisPublisher } = require("../config/redis");

const publishEvent = async (channel, event) => {
  try {
    const message = JSON.stringify(event);

    await redisPublisher.publish(channel, message);

    console.log(`Evento publicado en el canal: ${channel}`);
  } catch (error) {
    console.error("Error al publicar evento:", error.message);
  }
};

module.exports = {
  publishEvent
};