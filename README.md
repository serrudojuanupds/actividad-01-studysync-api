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
│   ├── routes/
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

Pendiente de despliegue en Render.

## Autor

Actividad desarrollada para la materia **Programación IV | UPDS 2026**.

Universidad Privada Domingo Savio  
Facultad de Ingeniería  
Carrera de Ingeniería de Sistemas