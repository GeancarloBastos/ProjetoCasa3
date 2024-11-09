/*
  Warnings:

  - You are about to drop the column `cargo` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the `moveis` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "cargo";

-- DropTable
DROP TABLE "moveis";

-- DropEnum
DROP TYPE "Cargo";

-- CreateTable
CREATE TABLE "produtos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(40) NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "foto" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "tipoMaterial" "TipoMaterial",
    "tipoProdutoId" INTEGER NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_produtos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60) NOT NULL,

    CONSTRAINT "tipo_produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "senha" VARCHAR(60) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_tipoProdutoId_fkey" FOREIGN KEY ("tipoProdutoId") REFERENCES "tipo_produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
