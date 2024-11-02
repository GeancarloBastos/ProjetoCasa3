/*
  Warnings:

  - You are about to drop the column `itemId` on the `orcamento_cores` table. All the data in the column will be lost.
  - You are about to drop the column `gavetas` on the `orcamentos` table. All the data in the column will be lost.
  - You are about to drop the column `iluminacao` on the `orcamentos` table. All the data in the column will be lost.
  - You are about to drop the column `largura` on the `orcamentos` table. All the data in the column will be lost.
  - You are about to drop the column `metragem` on the `orcamentos` table. All the data in the column will be lost.
  - You are about to drop the column `portas` on the `orcamentos` table. All the data in the column will be lost.
  - You are about to drop the column `profundidade` on the `orcamentos` table. All the data in the column will be lost.
  - Added the required column `corId` to the `orcamento_cores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orcamento_cores" DROP CONSTRAINT "orcamento_cores_itemId_fkey";

-- AlterTable
ALTER TABLE "orcamento_cores" DROP COLUMN "itemId",
ADD COLUMN     "corId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "orcamentos" DROP COLUMN "gavetas",
DROP COLUMN "iluminacao",
DROP COLUMN "largura",
DROP COLUMN "metragem",
DROP COLUMN "portas",
DROP COLUMN "profundidade";

-- CreateTable
CREATE TABLE "adicionais" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60) NOT NULL,

    CONSTRAINT "adicionais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orcamento_adicionais" (
    "id" SERIAL NOT NULL,
    "orcamentoId" INTEGER NOT NULL,
    "adicionalId" INTEGER NOT NULL,

    CONSTRAINT "orcamento_adicionais_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orcamento_adicionais" ADD CONSTRAINT "orcamento_adicionais_orcamentoId_fkey" FOREIGN KEY ("orcamentoId") REFERENCES "orcamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orcamento_adicionais" ADD CONSTRAINT "orcamento_adicionais_adicionalId_fkey" FOREIGN KEY ("adicionalId") REFERENCES "adicionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orcamento_cores" ADD CONSTRAINT "orcamento_cores_corId_fkey" FOREIGN KEY ("corId") REFERENCES "cores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
