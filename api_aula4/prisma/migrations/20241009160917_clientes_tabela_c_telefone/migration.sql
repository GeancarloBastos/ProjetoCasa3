/*
  Warnings:

  - Added the required column `telefone` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "telefone" VARCHAR(20) NOT NULL;
