/*
  Warnings:

  - Added the required column `cargo` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('COMUM', 'ADMIN');

-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "cargo" "Cargo" NOT NULL;
