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


---

# Actividad 03 - BD en la Nube + Redis Integrado

## Descripción general

En la Actividad 03 se integró la API REST de **StudySync** con una base de datos en la nube utilizando **Supabase PostgreSQL** y **Prisma ORM**.

El objetivo principal fue reemplazar el almacenamiento en memoria por una base de datos persistente, manteniendo la integración con Redis para eventos en tiempo real y agregando caché para mejorar el rendimiento de las consultas.

Con esta implementación, la API ahora permite:

- Guardar sesiones de estudio en una base de datos real.
- Consultar datos persistentes aunque el servidor se reinicie.
- Publicar eventos en Redis Pub/Sub cuando cambia la base de datos.
- Utilizar Redis Cache para acelerar lecturas frecuentes.
- Invalidar el caché cuando se crea, actualiza, elimina, llena o vacía una sesión.

---

## Objetivo de la actividad

Integrar los componentes desarrollados en actividades anteriores:

```txt
Actividad 01 → API REST
Actividad 02 → Redis Pub/Sub
Actividad 03 → Supabase PostgreSQL + Prisma ORM
```

El resultado final es una API con base de datos en la nube, mensajería asíncrona y caché integrado.

---

## Tecnologías utilizadas

| Tecnología | Uso dentro del proyecto |
|---|---|
| Node.js | Entorno de ejecución del backend. |
| Express | Framework para construir la API REST. |
| Supabase | Plataforma cloud utilizada para la base de datos PostgreSQL. |
| PostgreSQL | Motor de base de datos relacional. |
| Prisma ORM | ORM utilizado para mapear modelos del código hacia tablas de la base de datos. |
| Upstash Redis | Servicio Redis en la nube. |
| Redis Pub/Sub | Publicación de eventos en tiempo real. |
| Redis Cache | Almacenamiento temporal para acelerar consultas. |
| Swagger | Documentación interactiva de endpoints. |
| Render | Plataforma de despliegue de la API. |
| GitHub | Control de versiones y repositorio del proyecto. |

---

## ¿Qué es un ORM?

Un ORM significa **Object Relational Mapping**, o en español, **Mapeo Objeto-Relacional**.

Un ORM permite trabajar con una base de datos usando modelos y objetos del lenguaje de programación, sin escribir SQL manualmente para cada operación.

En este proyecto, el ORM utilizado es:

```txt
Prisma ORM
```

Ejemplo de consulta con Prisma:

```js
await prisma.sesion.findMany();
```

Esto reemplaza una consulta SQL tradicional como:

```sql
SELECT * FROM "Sesion";
```

---

## Aplicación de Prisma ORM en el proyecto

Prisma se aplica principalmente en estos archivos:

| Archivo | Función |
|---|---|
| `prisma/schema.prisma` | Define los modelos de datos y sus relaciones. |
| `prisma.config.ts` | Configura la conexión hacia la base de datos. |
| `src/config/prisma.js` | Crea la instancia de Prisma Client para usarla en el backend. |
| `src/controllers/sesiones.controller.js` | Usa Prisma para realizar operaciones CRUD sobre Supabase. |

---

## Modelos definidos en Prisma

Se definieron dos modelos principales:

```prisma
model Usuario {
  id        Int      @id @default(autoincrement())
  nombre    String
  email     String   @unique
  sesiones  Sesion[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Sesion {
  id         Int      @id @default(autoincrement())
  titulo     String
  materia    String
  fecha      String
  hora       String
  lugar      String
  cupos      Int
  completada Boolean  @default(false)

  usuarioId  Int?
  usuario    Usuario? @relation(fields: [usuarioId], references: [id])

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([materia])
  @@index([fecha])
  @@index([usuarioId])
  @@index([completada])
  @@index([materia, fecha])
}
```

---

## Relación entre modelos

La relación definida es:

```txt
Usuario 1 ---- N Sesion
```

Esto significa que un usuario puede tener muchas sesiones de estudio, pero cada sesión pertenece a un solo usuario.

Esta relación permite estructurar mejor la información y cumplir con una arquitectura de base de datos más sólida.

---

## Índices justificados

Para mejorar el rendimiento de las consultas en Supabase PostgreSQL, se agregaron índices en campos estratégicos del modelo `Sesion`.

| Índice | Justificación |
|---|---|
| `materia` | Permite optimizar búsquedas o filtros por materia. |
| `fecha` | Permite consultar sesiones por día o fecha específica. |
| `usuarioId` | Optimiza la relación entre usuarios y sesiones. |
| `completada` | Permite filtrar sesiones pendientes o completadas. |
| `materia + fecha` | Optimiza búsquedas combinadas por materia y fecha. |

Estos índices ayudan a que la base de datos responda de forma más eficiente cuando existan muchos registros.

---

## Arquitectura general del sistema

La arquitectura final del proyecto integra API REST, base de datos, ORM, Redis Pub/Sub y Redis Cache.

```txt
┌──────────────────────┐
│ Cliente / Thunder    │
│ Client / Swagger     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ API REST StudySync   │
│ Node.js + Express    │
└──────────┬───────────┘
           │
           ├────────────────────────────┐
           │                            │
           ▼                            ▼
┌──────────────────────┐      ┌──────────────────────┐
│ Prisma ORM           │      │ Redis Cache           │
│ Mapeo objeto-relac.  │      │ Lecturas rápidas      │
└──────────┬───────────┘      └──────────────────────┘
           │
           ▼
┌──────────────────────┐
│ Supabase PostgreSQL  │
│ Base de datos nube   │
└──────────────────────┘


┌──────────────────────┐
│ API REST StudySync   │
└──────────┬───────────┘
           │ Publica eventos
           ▼
┌──────────────────────┐
│ Redis Pub/Sub        │
│ Upstash Redis        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Subscriber           │
│ Notificaciones       │
└──────────────────────┘
```

---

## Explicación de la arquitectura

Supabase PostgreSQL se utiliza como base de datos principal para almacenar la información de forma persistente.

Prisma ORM permite comunicar la API con la base de datos mediante modelos y métodos de consulta, evitando escribir SQL manualmente en cada operación.

Redis se utiliza con dos propósitos:

1. **Redis Pub/Sub:** para publicar eventos cuando ocurren cambios en la base de datos.
2. **Redis Cache:** para almacenar temporalmente consultas frecuentes y mejorar el rendimiento.

Redis no reemplaza a la base de datos. La complementa.

```txt
La base de datos guarda la información.
Redis acelera lecturas y notifica cambios.
```

---

## Flujo del CRUD persistente

Antes, las sesiones se almacenaban en memoria mediante un arreglo local.

Ahora, las operaciones se realizan directamente en Supabase PostgreSQL usando Prisma.

| Operación | Antes | Ahora |
|---|---|---|
| Listar sesiones | Arreglo en memoria | `prisma.sesion.findMany()` |
| Buscar por ID | `sesiones.find()` | `prisma.sesion.findUnique()` |
| Crear sesión | `sesiones.push()` | `prisma.sesion.create()` |
| Actualizar sesión | Reemplazo en arreglo | `prisma.sesion.update()` |
| Eliminar sesión | `sesiones.splice()` | `prisma.sesion.delete()` |
| Vaciar sesiones | `sesiones.length = 0` | `TRUNCATE` o `deleteMany()` |

---

## Endpoints principales

| Método | Endpoint | Función |
|---|---|---|
| `GET` | `/api/sesiones` | Lista las sesiones registradas. |
| `GET` | `/api/sesiones/:id` | Obtiene una sesión por ID. |
| `POST` | `/api/sesiones` | Crea una nueva sesión. |
| `PUT` | `/api/sesiones/:id` | Actualiza una sesión existente. |
| `POST` | `/api/sesiones/:id/llenar` | Marca una sesión como llena. |
| `DELETE` | `/api/sesiones/:id` | Elimina una sesión por ID. |
| `DELETE` | `/api/sesiones` | Elimina todas las sesiones. |
| `GET` | `/api/sesiones/buscar?q=texto` | Busca sesiones por texto. |

---

## Integración Redis + Base de Datos

Cada vez que se modifica la base de datos, la API publica un evento en Redis Pub/Sub.

| Acción | Endpoint | Evento Redis |
|---|---|---|
| Crear sesión | `POST /api/sesiones` | `study-session.created` |
| Actualizar sesión | `PUT /api/sesiones/:id` | `study-session.updated` |
| Eliminar sesión | `DELETE /api/sesiones/:id` | `study-session.deleted` |
| Marcar sesión llena | `POST /api/sesiones/:id/llenar` | `study-session.full` |
| Vaciar sesiones | `DELETE /api/sesiones` | `study-session.cleared` |

El flujo es:

```txt
Cliente realiza petición
        ↓
API modifica Supabase con Prisma
        ↓
API invalida caché Redis
        ↓
API publica evento Redis Pub/Sub
        ↓
Subscriber recibe notificación
```

---

## Redis Cache

Se agregó caché Redis para acelerar las consultas frecuentes.

Cuando se ejecuta:

```txt
GET /api/sesiones
```

la API primero intenta obtener los datos desde Redis Cache.

Si los datos existen en caché:

```txt
Cache HIT → Responde desde Redis
```

Si los datos no existen:

```txt
Cache MISS → Consulta Supabase → Guarda resultado en Redis
```

---

## Invalidación de caché

Para evitar datos desactualizados, el caché se invalida cuando se modifica la base de datos.

| Acción | Caché invalidado |
|---|---|
| Crear sesión | Lista general y sesión creada. |
| Actualizar sesión | Lista general y sesión actualizada. |
| Eliminar sesión | Lista general y sesión eliminada. |
| Marcar sesión llena | Lista general y sesión modificada. |
| Vaciar sesiones | Todo el caché de sesiones. |

Esto garantiza que después de una modificación, la siguiente consulta vuelva a consultar Supabase y actualice el caché.

---

## Evidencia de caché

Primera consulta:

```txt
GET /api/sesiones
```

Respuesta esperada:

```json
{
  "error": false,
  "mensaje": "Sesiones obtenidas desde Supabase",
  "origen": "supabase",
  "data": []
}
```

Segunda consulta al mismo endpoint:

```json
{
  "error": false,
  "mensaje": "Sesiones obtenidas desde Redis Cache",
  "origen": "redis-cache",
  "data": []
}
```

En consola se puede observar:

```txt
Cache MISS: cache:sesiones:list
Cache SET: cache:sesiones:list
Cache HIT: cache:sesiones:list
```

---

## Variables de entorno

Para que el sistema funcione correctamente, se utilizan las siguientes variables:

```env
PORT=3000
REDIS_URL=rediss://default:TU_TOKEN@TU_HOST.upstash.io:6379
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/postgres"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/postgres"
```

Estas variables no deben subirse a GitHub en el archivo `.env`.

Se debe incluir un archivo `.env.example` con valores de referencia sin credenciales reales.

---

## Comandos utilizados

| Comando | Función |
|---|---|
| `npm install prisma --save-dev` | Instala Prisma como dependencia de desarrollo. |
| `npm install @prisma/client` | Instala Prisma Client para usarlo en el código. |
| `npm install @prisma/adapter-pg pg` | Instala el adaptador PostgreSQL requerido por Prisma 7. |
| `npx prisma init` | Inicializa Prisma en el proyecto. |
| `npx prisma db push` | Sincroniza los modelos con la base de datos. |
| `npx prisma generate` | Genera Prisma Client. |
| `npm run dev` | Ejecuta la API localmente. |
| `npm run subscriber` | Ejecuta el suscriptor Redis Pub/Sub. |
| `npm run test:redis` | Prueba la conexión con Redis. |
| `npm run test:publisher` | Publica un evento de prueba. |

---

## Pruebas realizadas

### 1. Crear sesión

```txt
POST /api/sesiones
```

Resultado esperado:

```txt
La sesión se guarda en Supabase.
Se invalida el caché.
Se publica el evento study-session.created.
El subscriber recibe la notificación.
```

---

### 2. Consultar sesiones

```txt
GET /api/sesiones
```

Resultado esperado:

```txt
Primera consulta: origen supabase.
Segunda consulta: origen redis-cache.
```

---

### 3. Actualizar sesión

```txt
PUT /api/sesiones/:id
```

Resultado esperado:

```txt
La sesión se actualiza en Supabase.
El caché se invalida.
Se publica el evento study-session.updated.
```

---

### 4. Eliminar sesión

```txt
DELETE /api/sesiones/:id
```

Resultado esperado:

```txt
La sesión se elimina de Supabase.
El caché se invalida.
Se publica el evento study-session.deleted.
```

---

### 5. Vaciar sesiones

```txt
DELETE /api/sesiones
```

Resultado esperado:

```txt
Las sesiones se eliminan de Supabase.
Se invalida todo el caché de sesiones.
Se publica el evento study-session.cleared.
```

---

## Prueba de persistencia

Para comprobar que los datos ya no se guardan en memoria:

1. Crear una sesión con `POST /api/sesiones`.
2. Verificar que aparece en Supabase.
3. Reiniciar el servidor.
4. Ejecutar `GET /api/sesiones`.
5. Confirmar que la sesión sigue existiendo.

Esto demuestra que los datos son persistentes y se almacenan en una base de datos en la nube.

---

## Despliegue en Render

La API fue desplegada en Render.

En Render se configuraron las siguientes variables de entorno:

```txt
REDIS_URL
DATABASE_URL
```

Además, para que Prisma funcione correctamente en producción, se agregó generación del cliente Prisma durante el proceso de instalación o despliegue.

URL de producción:

```txt
https://TU-URL-DE-RENDER.onrender.com
```

---

## Swagger

La documentación interactiva de la API se mantiene disponible en:

```txt
/api-docs
```

Ejemplo local:

```txt
http://localhost:3000/api-docs
```

Ejemplo en producción:

```txt
https://TU-URL-DE-RENDER.onrender.com/api-docs
```

---

## Rate Limiting

La API mantiene protección básica contra exceso de solicitudes mediante `express-rate-limit`.

Configuración:

```txt
100 solicitudes cada 15 minutos por IP
```

Cuando se supera el límite, la API responde:

```json
{
  "error": true,
  "mensaje": "Demasiadas solicitudes. Intente nuevamente más tarde."
}
```

Código HTTP:

```txt
429 Too Many Requests
```

---

## Nivel estratégico alcanzado

| Criterio | Implementación realizada |
|---|---|
| BD en la nube funcional | Supabase PostgreSQL, Prisma ORM, modelos relacionados e índices justificados. |
| Integración Redis + BD | Redis Pub/Sub, Redis Cache e invalidación de caché al modificar la base de datos. |
| Arquitectura documentada | Diagrama de API, Prisma, Supabase, Redis Cache y Redis Pub/Sub. |
| Pruebas de integración | Pruebas de CRUD, persistencia, eventos Redis y validación en Supabase. |

---

## Conclusión

La Actividad 03 permitió evolucionar StudySync API hacia una arquitectura más completa y cercana a un entorno real.

La API ya no depende de datos en memoria, sino que utiliza Supabase PostgreSQL para almacenar la información de forma persistente. Prisma ORM permite trabajar con la base de datos mediante modelos y métodos de consulta. Redis se utiliza tanto para eventos Pub/Sub como para caché, lo que mejora la comunicación y el rendimiento del sistema.

Con esta integración, StudySync API cuenta con una base de datos en la nube, comunicación asíncrona, invalidación de caché, documentación interactiva y despliegue en Render.