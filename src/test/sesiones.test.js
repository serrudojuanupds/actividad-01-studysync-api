const request = require("supertest");
const app = require("../server");
const prisma = require("../config/prisma");
const { closeRedisConnections } = require("../config/redis");

jest.setTimeout(20000);

const testPrefix = "TEST_JEST_";
let createdId = null;

describe("StudySync API - Pruebas de integración", () => {
  afterAll(async () => {
    await prisma.sesion.deleteMany({
      where: {
        titulo: {
          startsWith: testPrefix
        }
      }
    });

    await prisma.$disconnect();
    closeRedisConnections();
  });

  test("GET / debe verificar que la API esté activa", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.mensaje).toBe("API StudySync funcionando correctamente");
  });

  test("GET /api/sesiones debe listar sesiones", async () => {
    const response = await request(app).get("/api/sesiones");

    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test("POST /api/sesiones debe crear una sesión en Supabase", async () => {
    const response = await request(app)
      .post("/api/sesiones")
      .send({
        titulo: `${testPrefix}Sesion creada desde Jest`,
        materia: "Programacion IV",
        fecha: "2026-06-10",
        hora: "18:00",
        lugar: "Biblioteca UPDS",
        cupos: 5,
        completada: false
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBe(false);
    expect(response.body.data).toHaveProperty("id");

    createdId = response.body.data.id;
  });

  test("GET /api/sesiones/:id debe obtener la sesión creada", async () => {
    const response = await request(app).get(`/api/sesiones/${createdId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data.id).toBe(createdId);
  });

  test("PUT /api/sesiones/:id debe actualizar la sesión creada", async () => {
    const response = await request(app)
      .put(`/api/sesiones/${createdId}`)
      .send({
        titulo: `${testPrefix}Sesion actualizada desde Jest`,
        materia: "Programacion IV",
        fecha: "2026-06-11",
        hora: "19:00",
        lugar: "Aula 205",
        cupos: 10,
        completada: false
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data.titulo).toBe(`${testPrefix}Sesion actualizada desde Jest`);
    expect(response.body.data.cupos).toBe(10);
  });

  test("POST /api/sesiones/:id/llenar debe marcar la sesión como llena", async () => {
    const response = await request(app).post(`/api/sesiones/${createdId}/llenar`);

    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data.cupos).toBe(0);
  });

  test("DELETE /api/sesiones/:id debe eliminar la sesión creada", async () => {
    const response = await request(app).delete(`/api/sesiones/${createdId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data.id).toBe(createdId);
  });

  test("GET /api/sesiones/:id debe devolver 404 si la sesión fue eliminada", async () => {
    const response = await request(app).get(`/api/sesiones/${createdId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
  });
});