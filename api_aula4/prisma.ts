import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // Ativa logs úteis para depuração
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma; // Garante que no desenvolvimento usamos a mesma instância
}
