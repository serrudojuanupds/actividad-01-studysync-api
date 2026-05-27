const CHANNELS = require("../events/channels");
const {
  getRedisSubscriber,
  closeRedisConnections
} = require("../config/redis");

const iniciarSuscriptor = async () => {
  try {
    const redisSubscriber = getRedisSubscriber();

    await redisSubscriber.subscribe(
      CHANNELS.STUDY_SESSION_CREATED,
      CHANNELS.STUDY_SESSION_UPDATED,
      CHANNELS.STUDY_SESSION_DELETED,
      CHANNELS.STUDY_SESSION_FULL,
      CHANNELS.STUDY_SESSION_CLEARED
    );

    console.log("Suscriptor iniciado correctamente");
    console.log("Escuchando canales:");
    console.log(`- ${CHANNELS.STUDY_SESSION_CREATED}`);
    console.log(`- ${CHANNELS.STUDY_SESSION_FULL}`);

    redisSubscriber.on("message", (channel, message) => {
      try {
        const event = JSON.parse(message);

        console.log("\nNuevo mensaje recibido");
        console.log("Canal:", channel);
        console.log("Tipo de evento:", event.type);
        console.log("Fecha:", event.timestamp);
        console.log("Versión:", event.version);
        console.log("Datos:", event.payload);

        if (channel === CHANNELS.STUDY_SESSION_CREATED) {
          console.log(
            `Notificación: Se creó una nueva sesión de estudio: ${event.payload.titulo}`
          );
        }

        if (channel === CHANNELS.STUDY_SESSION_FULL) {
          console.log(
            `Notificación: La sesión ${event.payload.titulo} ya no tiene cupos disponibles`
          );
        }
        if (channel === CHANNELS.STUDY_SESSION_UPDATED) {
          console.log(
            `Notificación: Se actualizó la sesión: ${event.payload.titulo}`
          );
        }

        if (channel === CHANNELS.STUDY_SESSION_DELETED) {
          console.log(
            `Notificación: Se eliminó la sesión: ${event.payload.titulo}`
          );
        }

        if (channel === CHANNELS.STUDY_SESSION_CLEARED) {
          console.log(
            `Notificación: Se vaciaron todas las sesiones. Total eliminadas: ${event.payload.totalEliminadas}`
          );
        }
      } catch (error) {
        console.error("Error al procesar el mensaje recibido:", error.message);
      }
    });
  } catch (error) {
    console.error("Error al iniciar el suscriptor:", {
      message: error.message,
      code: error.code,
      name: error.name
    });
  }
};

process.on("SIGINT", () => {
  console.log("\nCerrando suscriptor...");
  closeRedisConnections();
  process.exit(0);
});

iniciarSuscriptor();