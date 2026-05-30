const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no está configurada en el archivo .env");
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({
  adapter
});

module.exports = prisma;