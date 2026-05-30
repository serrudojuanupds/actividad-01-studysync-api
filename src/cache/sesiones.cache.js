const { getRedisPublisher } = require("../config/redis");

const CACHE_KEYS = {
  SESIONES_LIST: "cache:sesiones:list",
  SESION_BY_ID: (id) => `cache:sesiones:${id}`
};

const CACHE_TTL_SECONDS = 60;

const getCache = async (key) => {
  try {
    const redis = getRedisPublisher();
    const data = await redis.get(key);

    if (!data) {
      console.log(`Cache MISS: ${key}`);
      return null;
    }

    console.log(`Cache HIT: ${key}`);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al leer caché Redis:", error.message);
    return null;
  }
};

const setCache = async (key, value) => {
  try {
    const redis = getRedisPublisher();

    await redis.set(
      key,
      JSON.stringify(value),
      "EX",
      CACHE_TTL_SECONDS
    );

    console.log(`Cache SET: ${key}`);
  } catch (error) {
    console.error("Error al guardar caché Redis:", error.message);
  }
};

const deleteCache = async (key) => {
  try {
    const redis = getRedisPublisher();
    await redis.del(key);

    console.log(`Cache DELETE: ${key}`);
  } catch (error) {
    console.error("Error al eliminar caché Redis:", error.message);
  }
};

const getSesionesCache = async () => {
  return await getCache(CACHE_KEYS.SESIONES_LIST);
};

const setSesionesCache = async (sesiones) => {
  await setCache(CACHE_KEYS.SESIONES_LIST, sesiones);
};

const getSesionByIdCache = async (id) => {
  return await getCache(CACHE_KEYS.SESION_BY_ID(id));
};

const setSesionByIdCache = async (id, sesion) => {
  await setCache(CACHE_KEYS.SESION_BY_ID(id), sesion);
};

const invalidateSesionCache = async (id) => {
  await deleteCache(CACHE_KEYS.SESIONES_LIST);
  await deleteCache(CACHE_KEYS.SESION_BY_ID(id));
};

const invalidateAllSesionesCache = async () => {
  try {
    const redis = getRedisPublisher();

    await deleteCache(CACHE_KEYS.SESIONES_LIST);

    let cursor = "0";

    do {
      const result = await redis.scan(
        cursor,
        "MATCH",
        "cache:sesiones:*",
        "COUNT",
        100
      );

      cursor = result[0];
      const keys = result[1];

      if (keys.length > 0) {
        await redis.del(...keys);
        console.log(`Cache DELETE múltiple: ${keys.length} claves`);
      }
    } while (cursor !== "0");
  } catch (error) {
    console.error("Error al invalidar todo el caché:", error.message);
  }
};

module.exports = {
  getSesionesCache,
  setSesionesCache,
  getSesionByIdCache,
  setSesionByIdCache,
  invalidateSesionCache,
  invalidateAllSesionesCache
};