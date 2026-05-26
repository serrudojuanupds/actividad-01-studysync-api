const CHANNELS = require("../events/channels");
const { publishEvent } = require("../events/publisher");
const { redisPublisher, redisSubscriber } = require("../config/redis");

const probarPublicador = async () => {
  const event = {
    type: CHANNELS.STUDY_SESSION_CREATED,
    payload: {
      id: 100,
      titulo: "Prueba de evento PubSub",
      materia: "Programación IV"
    },
    timestamp: new Date().toISOString(),
    version: "1.0"
  };

  await publishEvent(CHANNELS.STUDY_SESSION_CREATED, event);

  redisPublisher.disconnect();
  redisSubscriber.disconnect();
};

probarPublicador();