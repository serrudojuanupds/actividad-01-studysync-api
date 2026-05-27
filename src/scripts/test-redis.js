const {
  getRedisPublisher,
  closeRedisConnections
} = require("../config/redis");

const probarConexion = async () => {
  try {
    const redisPublisher = getRedisPublisher();

    const respuesta = await redisPublisher.ping();

    console.log("Respuesta de Redis:", respuesta);
    console.log("Conexión con Upstash Redis funcionando correctamente");

    closeRedisConnections();
  } catch (error) {
    console.error("Error al conectar con Redis:", error.message);
    closeRedisConnections();
  }
};

probarConexion();