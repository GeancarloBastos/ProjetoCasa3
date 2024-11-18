/*
  Warnings:

  - Added the required column `quantidade` to the `carrinho_produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carrinho_produtos" ADD COLUMN     "quantidade" INTEGER NOT NULL;
