# StudySync API - Actividad 01

API REST desarrollada para la **Actividad 01** de la materia **Programación IV | UPDS 2026**.

## Descripción

Esta API forma parte del proyecto socioformativo **StudySync**, una plataforma orientada a la coordinación de grupos de estudio entre estudiantes universitarios.

El objetivo de esta API es permitir la gestión de **sesiones de estudio**, facilitando operaciones básicas como listar, buscar, crear, actualizar y eliminar sesiones mediante endpoints REST.

Los datos se almacenan temporalmente en memoria utilizando un arreglo, ya que en esta actividad no se requiere todavía una base de datos.

## Entidad gestionada

La entidad principal de esta API es:

**Sesiones de estudio**

Cada sesión contiene los siguientes campos:

| Campo | Descripción |
|---|---|
| id | Identificador único de la sesión |
| titulo | Nombre o título de la sesión de estudio |
| materia | Materia relacionada con la sesión |
| fecha | Fecha programada para la sesión |
| hora | Hora de inicio de la sesión |
| lugar | Lugar donde se realizará la sesión |
| cupos | Cantidad de cupos disponibles |
| completada | Estado de la sesión |

## Tecnologías utilizadas

- Node.js
- Express
- Dotenv
- Git
- GitHub
- Render

## Instalación local

Clonar el repositorio:

```bash
git clone https://github.com/serrudojuanupds/actividad-01-studysync-api.git
```

Entrar a la carpeta generada:

```bash
cd actividad-01-studysync-api
```

Instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=3000
```

Ejecutar el proyecto:

```bash
npm run dev
```

URL local:

```txt
http://localhost:3000
```

## Endpoints disponibles

| Método | Ruta | Descripción | Status esperado |
|---|---|---|---|
| GET | `/` | Verifica que la API está funcionando | 200 |
| GET | `/api/sesiones` | Lista todas las sesiones de estudio | 200 |
| GET | `/api/sesiones/:id` | Obtiene una sesión por ID | 200 / 404 |
| POST | `/api/sesiones` | Crea una nueva sesión de estudio | 201 / 400 |
| PUT | `/api/sesiones/:id` | Actualiza una sesión existente | 200 / 400 / 404 |
| DELETE | `/api/sesiones/:id` | Elimina una sesión existente | 200 / 404 |
| GET | `/api/sesiones/buscar?q=texto` | Busca sesiones por título, materia o lugar | 200 / 400 |

## Ejemplo de respuesta principal

Ruta:

```txt
GET /
```

Respuesta:

```json
{
  "mensaje": "API StudySync funcionando correctamente"
}
```

## Ejemplo de JSON para crear una sesión

Ruta:

```txt
POST /api/sesiones
```

Body:

```json
{
  "titulo": "Repaso para examen",
  "materia": "Programacion IV",
  "fecha": "2026-05-25",
  "hora": "18:00",
  "lugar": "Biblioteca UPDS",
  "cupos": 6,
  "completada": false
}
```

Respuesta esperada:

```json
{
  "error": false,
  "mensaje": "Sesión creada correctamente",
  "data": {
    "id": 3,
    "titulo": "Repaso para examen",
    "materia": "Programacion IV",
    "fecha": "2026-05-25",
    "hora": "18:00",
    "lugar": "Biblioteca UPDS",
    "cupos": 6,
    "completada": false
  }
}
```

## Ejemplo de actualización

Ruta:

```txt
PUT /api/sesiones/1
```

Body:

```json
{
  "titulo": "Repaso actualizado",
  "materia": "Programacion IV",
  "fecha": "2026-05-28",
  "hora": "19:30",
  "lugar": "Aula 204",
  "cupos": 8,
  "completada": false
}
```

## Ejemplo de búsqueda

Ruta:

```txt
GET /api/sesiones/buscar?q=programacion
```

Esta búsqueda permite encontrar sesiones por:

- título
- materia
- lugar

La búsqueda ignora diferencias entre mayúsculas, minúsculas y tildes.

## Manejo de errores

La API maneja errores básicos mediante respuestas JSON.

Ejemplo cuando un ID no existe:

```json
{
  "error": true,
  "mensaje": "No se encontró una sesión con el ID proporcionado"
}
```

Ejemplo cuando falta un campo obligatorio:

```json
{
  "error": true,
  "mensaje": "El campo titulo es obligatorio"
}
```

Ejemplo cuando una ruta no existe:

```json
{
  "error": true,
  "mensaje": "La ruta /api/noexiste no existe"
}
```

## Estructura del proyecto

```txt
studysync-api/
│
├── src/
│   ├── controllers/
│   │   └── sesiones.controller.js
│   ├── middlewares/
│   │   └── error.middleware.js
│   ├── models/
│   │   └── sesiones.model.js
│   ├── routes/g    
│   │   └── sesiones.routes.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## URL de producción

https://studysync-api-ivi1.onrender.com

## Pruebas en producción

- https://studysync-api-ivi1.onrender.com/
- https://studysync-api-ivi1.onrender.com/api/sesiones
- https://studysync-api-ivi1.onrender.com/api/sesiones/buscar?q=programacion



-----------------------------------------------------------------------------


# Actividad 02 - Mensajería Asíncrona con Redis Pub/Sub

## Descripción

En esta segunda actividad se implementó un sistema de mensajería asíncrona utilizando Redis Pub/Sub mediante la plataforma Upstash.

El objetivo fue permitir que la API de StudySync pueda publicar eventos cuando ocurre una acción importante dentro del sistema, y que otro proceso independiente pueda escuchar esos eventos en tiempo real.

En este caso, la API actúa como publicador y un proceso separado actúa como suscriptor.

## ¿Qué es Redis Pub/Sub?

Redis Pub/Sub es un mecanismo de publicación y suscripción de mensajes.

Su funcionamiento se basa en tres elementos principales:

- Publicador: envía un mensaje a un canal.
- Canal: medio por donde viaja el mensaje.
- Suscriptor: escucha uno o varios canales y recibe los mensajes publicados.

El flujo general implementado fue:

```txt
API StudySync
     ↓
Publicador
     ↓
Redis Pub/Sub - Upstash
     ↓
Suscriptor
     ↓
Notificación en consola


## Autor

Actividad 1 desarrollada para la materia **Programación IV | UPDS 2026**.

Universidad Privada Domingo Savio  
Facultad de Ingeniería  
Carrera de Ingeniería de Sistemas
Alumno: Juan Rodrigo Serrudo Fernandez

---

# Actividad 02 - Mensajería Asíncrona, Swagger y Rate Limiting

## Descripción general

En esta etapa del proyecto se extendió la API REST de **StudySync** incorporando mensajería asíncrona mediante **Redis Pub/Sub** utilizando **Upstash Redis**.

La API ahora permite publicar eventos cuando ocurre una acción importante sobre las sesiones de estudio. Estos eventos son escuchados por un suscriptor independiente, simulando un sistema de notificaciones en tiempo real.

Además, se incorporó documentación interactiva con **Swagger** y protección básica mediante **Rate Limiting**.

---

## Tecnologías agregadas

| Tecnología | Uso dentro del proyecto |
|---|---|
| Upstash Redis | Servicio Redis en la nube utilizado para Pub/Sub. |
| ioredis | Librería para conectar Node.js con Redis. |
| Swagger UI Express | Permite mostrar documentación interactiva de la API. |
| Express Rate Limit | Limita la cantidad de solicitudes por IP. |

---

## Arquitectura de mensajería

El flujo implementado es el siguiente:

```txt
Cliente / Thunder Client
        ↓
API StudySync
        ↓
Publicador de eventos
        ↓
Redis Pub/Sub - Upstash
        ↓
Suscriptor
        ↓
Notificación en consola
```

La API actúa como **publicador**, mientras que el suscriptor se ejecuta como un proceso separado que escucha los canales definidos.

---

## Canales Pub/Sub implementados

| Acción | Endpoint | Canal publicado |
|---|---|---|
| Crear sesión | `POST /api/sesiones` | `study-session.created` |
| Marcar sesión como llena | `POST /api/sesiones/:id/llenar` | `study-session.full` |
| Actualizar sesión | `PUT /api/sesiones/:id` | `study-session.updated` |
| Eliminar sesión | `DELETE /api/sesiones/:id` | `study-session.deleted` |
| Vaciar sesiones | `DELETE /api/sesiones` | `study-session.cleared` |

---

## Estructura agregada al proyecto

```txt
src/
├── config/
│   └── redis.js
├── docs/
│   └── swagger.js
├── events/
│   ├── channels.js
│   └── publisher.js
├── middlewares/
│   └── rateLimit.middleware.js
├── scripts/
│   ├── test-redis.js
│   └── test-publisher.js
├── subscribers/
│   └── notification.subscriber.js
```

---

## Descripción de archivos agregados

| Archivo | Descripción |
|---|---|
| `src/config/redis.js` | Configura la conexión con Upstash Redis. |
| `src/events/channels.js` | Centraliza los nombres de los canales Pub/Sub. |
| `src/events/publisher.js` | Contiene la función encargada de publicar eventos en Redis. |
| `src/subscribers/notification.subscriber.js` | Escucha los canales de Redis y muestra notificaciones en consola. |
| `src/scripts/test-redis.js` | Prueba la conexión con Redis mediante PING. |
| `src/scripts/test-publisher.js` | Publica un evento manual de prueba. |
| `src/docs/swagger.js` | Define la documentación Swagger/OpenAPI de la API. |
| `src/middlewares/rateLimit.middleware.js` | Limita la cantidad de solicitudes permitidas por IP. |

---

## Variables de entorno

Para ejecutar correctamente Redis Pub/Sub, se debe crear un archivo `.env` en la raíz del proyecto.

```env
PORT=3000
REDIS_URL=rediss://default:TU_TOKEN@TU_HOST.upstash.io:6379
```

El archivo `.env` no debe subirse a GitHub porque contiene credenciales privadas.

También se incluye un archivo `.env.example` como referencia:

```env
PORT=3000
REDIS_URL=rediss://default:TU_TOKEN@TU_HOST.upstash.io:6379
```

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia la API localmente. |
| `npm start` | Inicia la API en producción. |
| `npm run subscriber` | Inicia el suscriptor de Redis Pub/Sub. |
| `npm run test:redis` | Prueba la conexión con Redis. |
| `npm run test:publisher` | Publica un evento de prueba. |

---

## Prueba de conexión con Redis

Para verificar la conexión con Upstash Redis:

```bash
npm run test:redis
```

Respuesta esperada:

```txt
Redis Publisher conectado correctamente
Respuesta de Redis: PONG
Conexión con Upstash Redis funcionando correctamente
```

---

## Prueba del publicador

Para publicar un evento manual de prueba:

```bash
npm run test:publisher
```

Respuesta esperada:

```txt
Redis Publisher conectado correctamente
Evento publicado en el canal: study-session.created
```

Si el suscriptor está activo, también mostrará el evento recibido.

---

## Prueba completa con suscriptor

Para probar el sistema Pub/Sub completo se usan dos terminales.

### Terminal 1 - Suscriptor

```bash
npm run subscriber
```

Respuesta esperada:

```txt
Redis Subscriber conectado correctamente
Suscriptor iniciado correctamente
Escuchando canales:
- study-session.created
- study-session.updated
- study-session.deleted
- study-session.full
- study-session.cleared
```

### Terminal 2 - API

```bash
npm run dev
```

Luego, desde Thunder Client, se ejecutan las acciones sobre la API.

---

## Ejemplo: crear sesión y publicar evento

Endpoint:

```txt
POST /api/sesiones
```

Body:

```json
{
  "titulo": "Prueba con Redis PubSub",
  "materia": "Programacion IV",
  "fecha": "2026-06-01",
  "hora": "18:00",
  "lugar": "Biblioteca UPDS",
  "cupos": 5,
  "completada": false
}
```

Evento publicado:

```txt
study-session.created
```

El suscriptor recibe una notificación indicando que se creó una nueva sesión de estudio.

---

## Ejemplo: marcar sesión como llena

Endpoint:

```txt
POST /api/sesiones/1/llenar
```

Evento publicado:

```txt
study-session.full
```

El suscriptor recibe una notificación indicando que la sesión ya no tiene cupos disponibles.

---

## Ejemplo: actualizar sesión

Endpoint:

```txt
PUT /api/sesiones/1
```

Body:

```json
{
  "titulo": "Sesión modificada con PubSub",
  "materia": "Programacion IV",
  "fecha": "2026-06-02",
  "hora": "19:00",
  "lugar": "Aula 205",
  "cupos": 10,
  "completada": false
}
```

Evento publicado:

```txt
study-session.updated
```

---

## Ejemplo: eliminar sesión

Endpoint:

```txt
DELETE /api/sesiones/1
```

Evento publicado:

```txt
study-session.deleted
```

---

## Ejemplo: vaciar sesiones

Endpoint:

```txt
DELETE /api/sesiones
```

Evento publicado:

```txt
study-session.cleared
```

Este evento indica que todas las sesiones almacenadas en memoria fueron eliminadas.

---

## Swagger

Se agregó documentación interactiva mediante Swagger.

Ruta local:

```txt
http://localhost:3000/api-docs
```

Ruta en producción:

```txt
https://studysync-api-ivi1.onrender.com/api-docs
```

Swagger permite visualizar los endpoints disponibles, revisar sus parámetros, observar ejemplos de request body y probar las rutas directamente desde el navegador.

---

## Rate Limiting

Se agregó Rate Limiting para proteger la API contra demasiadas solicitudes repetidas.

Configuración aplicada:

```txt
100 solicitudes cada 15 minutos por IP
```

Cuando se supera el límite, la API responde con:

```json
{
  "error": true,
  "mensaje": "Demasiadas solicitudes. Intente nuevamente más tarde."
}
```

Código HTTP aplicado:

```txt
429 Too Many Requests
```

---

## Manejo de errores

La API maneja errores mediante respuestas JSON.

| Código | Descripción | Caso de uso |
|---|---|---|
| `400` | Solicitud incorrecta | Faltan campos obligatorios. |
| `404` | No encontrado | El ID o la ruta no existe. |
| `429` | Demasiadas solicitudes | Se superó el límite de peticiones. |
| `500` | Error interno | Error inesperado del servidor. |

---

## Pruebas recomendadas

| Prueba | Endpoint | Resultado esperado |
|---|---|---|
| Ver API activa | `GET /` | `200 OK` |
| Listar sesiones | `GET /api/sesiones` | Lista de sesiones |
| Crear sesión | `POST /api/sesiones` | Evento `study-session.created` |
| Llenar sesión | `POST /api/sesiones/:id/llenar` | Evento `study-session.full` |
| Actualizar sesión | `PUT /api/sesiones/:id` | Evento `study-session.updated` |
| Eliminar sesión | `DELETE /api/sesiones/:id` | Evento `study-session.deleted` |
| Vaciar sesiones | `DELETE /api/sesiones` | Evento `study-session.cleared` |
| Ver documentación | `GET /api-docs` | Swagger UI |
| Ruta inexistente | `GET /api/noexiste` | `404 Not Found` |

---

## Despliegue en Render

La API fue desplegada en Render y conectada al repositorio de GitHub.

Para que Redis funcione en producción, se configuró la variable de entorno `REDIS_URL` dentro del panel de Render.

URL de producción:

```txt
https://studysync-api-ivi1.onrender.com
```

---

## Conclusión

Con esta implementación, la API StudySync evolucionó de una API REST básica a un sistema más completo, incorporando mensajería asíncrona, documentación interactiva y protección contra exceso de solicitudes.

Redis Pub/Sub permite desacoplar procesos, ya que la API publica eventos y otros componentes pueden reaccionar a ellos de manera independiente. Swagger facilita la documentación y prueba de endpoints, mientras que Rate Limiting agrega una capa básica de seguridad para el consumo de la API.  git