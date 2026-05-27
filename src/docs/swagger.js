const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "StudySync API",
    version: "2.0.0",
    description:
      "API REST para gestionar sesiones de estudio del proyecto StudySync. Incluye CRUD, búsqueda, eventos Pub/Sub con Redis y documentación Swagger."
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local"
    },
    {
      url: "https://studysync-api-ivi1.onrender.com",
      description: "Servidor en producción"
    }
  ],
  tags: [
    {
      name: "Sesiones",
      description: "Endpoints para gestionar sesiones de estudio"
    },
    {
      name: "Sistema",
      description: "Endpoints generales de la API"
    }
  ],
  paths: {
    "/": {
      get: {
        tags: ["Sistema"],
        summary: "Verificar estado de la API",
        description: "Endpoint principal para comprobar que la API está funcionando.",
        responses: {
          200: {
            description: "API funcionando correctamente"
          }
        }
      }
    },
    "/api/sesiones": {
      get: {
        tags: ["Sesiones"],
        summary: "Listar sesiones",
        description: "Devuelve todas las sesiones de estudio registradas en memoria.",
        responses: {
          200: {
            description: "Sesiones obtenidas correctamente"
          }
        }
      },
      post: {
        tags: ["Sesiones"],
        summary: "Crear sesión",
        description:
          "Crea una nueva sesión de estudio y publica el evento study-session.created en Redis Pub/Sub.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SesionInput"
              },
              example: {
                titulo: "Repaso para examen",
                materia: "Programacion IV",
                fecha: "2026-06-01",
                hora: "18:00",
                lugar: "Biblioteca UPDS",
                cupos: 5,
                completada: false
              }
            }
          }
        },
        responses: {
          201: {
            description: "Sesión creada correctamente"
          },
          400: {
            description: "Faltan campos obligatorios"
          }
        }
      },
      delete: {
        tags: ["Sesiones"],
        summary: "Vaciar sesiones",
        description:
          "Elimina todas las sesiones almacenadas en memoria y publica el evento study-session.cleared.",
        responses: {
          200: {
            description: "Todas las sesiones fueron eliminadas correctamente"
          }
        }
      }
    },
    "/api/sesiones/buscar": {
      get: {
        tags: ["Sesiones"],
        summary: "Buscar sesiones",
        description:
          "Busca sesiones por título, materia o lugar. La búsqueda ignora mayúsculas, minúsculas y tildes.",
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            description: "Texto de búsqueda",
            schema: {
              type: "string"
            },
            example: "programacion"
          }
        ],
        responses: {
          200: {
            description: "Búsqueda realizada correctamente"
          },
          400: {
            description: "El parámetro q es obligatorio"
          }
        }
      }
    },
    "/api/sesiones/{id}": {
      get: {
        tags: ["Sesiones"],
        summary: "Obtener sesión por ID",
        description: "Devuelve una sesión específica según su ID.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID de la sesión",
            schema: {
              type: "integer"
            },
            example: 1
          }
        ],
        responses: {
          200: {
            description: "Sesión encontrada correctamente"
          },
          404: {
            description: "No se encontró una sesión con el ID proporcionado"
          }
        }
      },
      put: {
        tags: ["Sesiones"],
        summary: "Actualizar sesión",
        description:
          "Actualiza una sesión existente y publica el evento study-session.updated.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID de la sesión",
            schema: {
              type: "integer"
            },
            example: 1
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SesionInput"
              },
              example: {
                titulo: "Sesión modificada con PubSub",
                materia: "Programacion IV",
                fecha: "2026-06-02",
                hora: "19:00",
                lugar: "Aula 205",
                cupos: 10,
                completada: false
              }
            }
          }
        },
        responses: {
          200: {
            description: "Sesión actualizada correctamente"
          },
          400: {
            description: "Faltan campos obligatorios"
          },
          404: {
            description: "No se encontró una sesión con el ID proporcionado"
          }
        }
      },
      delete: {
        tags: ["Sesiones"],
        summary: "Eliminar sesión",
        description:
          "Elimina una sesión por ID y publica el evento study-session.deleted.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID de la sesión",
            schema: {
              type: "integer"
            },
            example: 1
          }
        ],
        responses: {
          200: {
            description: "Sesión eliminada correctamente"
          },
          404: {
            description: "No se encontró una sesión con el ID proporcionado"
          }
        }
      }
    },
    "/api/sesiones/{id}/llenar": {
      post: {
        tags: ["Sesiones"],
        summary: "Marcar sesión como llena",
        description:
          "Cambia los cupos de una sesión a 0 y publica el evento study-session.full.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID de la sesión",
            schema: {
              type: "integer"
            },
            example: 1
          }
        ],
        responses: {
          200: {
            description: "La sesión fue marcada como llena correctamente"
          },
          404: {
            description: "No se encontró una sesión con el ID proporcionado"
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Sesion: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1
          },
          titulo: {
            type: "string",
            example: "Repaso de Programación IV"
          },
          materia: {
            type: "string",
            example: "Programación IV"
          },
          fecha: {
            type: "string",
            example: "2026-05-20"
          },
          hora: {
            type: "string",
            example: "18:00"
          },
          lugar: {
            type: "string",
            example: "Biblioteca UPDS"
          },
          cupos: {
            type: "integer",
            example: 5
          },
          completada: {
            type: "boolean",
            example: false
          }
        }
      },
      SesionInput: {
        type: "object",
        required: ["titulo", "materia", "fecha", "hora", "lugar", "cupos", "completada"],
        properties: {
          titulo: {
            type: "string"
          },
          materia: {
            type: "string"
          },
          fecha: {
            type: "string"
          },
          hora: {
            type: "string"
          },
          lugar: {
            type: "string"
          },
          cupos: {
            type: "integer"
          },
          completada: {
            type: "boolean"
          }
        }
      }
    }
  }
};

module.exports = swaggerDocument;