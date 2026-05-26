const CHANNELS = require("../events/channels");
const { redisPublisher, redisSubscriber } = require("../config/redis");

const iniciarSuscriptor = async () => {
  try {
    await redisSubscriber.subscribe(
      CHANNELS.STUDY_SESSION_CREATED,
      CHANNELS.STUDY_SESSION_FULL
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
        console.log("Version:", event.version);
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
      } catch (error) {
        console.error("Error al procesar el mensaje recibido:", error.message);
      }
    });
  } catch (error) {
    console.error("Error al iniciar el suscriptor:", error.message);
  }
};

process.on("SIGINT", () => {
  console.log("\nCerrando suscriptor...");
  redisSubscriber.disconnect();
  redisPublisher.disconnect();
  process.exit(0);
});

iniciarSuscriptor();