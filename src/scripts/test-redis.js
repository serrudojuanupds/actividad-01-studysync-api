const { redisPublisher, redisSubscriber } = require("../config/redis");

const probarConexion = async () => {
  try {
    const respuesta = await redisPublisher.ping();

    console.log("Respuesta de Redis:", respuesta);
    console.log("Conexión con Upstash Redis funcionando correctamente");

    redisPublisher.disconnect();
    redisSubscriber.disconnect();
  } catch (error) {
    console.error("Error al conectar con Redis:", error.message);
  }
};

probarConexion();