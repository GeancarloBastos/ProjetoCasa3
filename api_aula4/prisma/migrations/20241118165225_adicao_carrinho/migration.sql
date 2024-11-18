/*
  Warnings:

  - Made the column `corId` on table `produtos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "produtos" DROP CONSTRAINT "produtos_corId_fkey";

-- AlterTable
ALTER TABLE "produtos" ALTER COLUMN "corId" SET NOT NULL;

-- CreateTable
CREATE TABLE "req_carrinho" (
    "id" SERIAL NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clienteId" TEXT NOT NULL,

    CONSTRAINT "req_carrinho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carrinho_produtos" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "carrinhoId" INTEGER NOT NULL,

    CONSTRAINT "carrinho_produtos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_corId_fkey" FOREIGN KEY ("corId") REFERENCES "cores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "req_carrinho" ADD CONSTRAINT "req_carrinho_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrinho_produtos" ADD CONSTRAINT "carrinho_produtos_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrinho_produtos" ADD CONSTRAINT "carrinho_produtos_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "req_carrinho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
