/*
  Warnings:

  - You are about to drop the column `url` on the `imagens_orcamentos` table. All the data in the column will be lost.
  - Added the required column `urlPlanta` to the `imagens_orcamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlReferencia` to the `imagens_orcamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acabamento` to the `orcamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ambiente` to the `orcamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faixaPreco` to the `orcamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gavetas` to the `orcamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iluminacao` to the `orcamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `largura` to the `orcamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metragem` to the `orcamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observacoes` to the `orcamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portas` to the `orcamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prazo` to the `orcamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profundidade` to the `orcamentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "imagens_orcamentos" DROP COLUMN "url",
ADD COLUMN     "urlPlanta" VARCHAR(255) NOT NULL,
ADD COLUMN     "urlReferencia" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "orcamentos" ADD COLUMN     "acabamento" VARCHAR(60) NOT NULL,
ADD COLUMN     "ambiente" VARCHAR(60) NOT NULL,
ADD COLUMN     "faixaPreco" VARCHAR(120) NOT NULL,
ADD COLUMN     "gavetas" BOOLEAN NOT NULL,
ADD COLUMN     "iluminacao" BOOLEAN NOT NULL,
ADD COLUMN     "largura" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "metragem" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "observacoes" VARCHAR(255) NOT NULL,
ADD COLUMN     "portas" BOOLEAN NOT NULL,
ADD COLUMN     "prazo" VARCHAR(255) NOT NULL,
ADD COLUMN     "profundidade" DECIMAL(65,30) NOT NULL;

-- CreateTable
CREATE TABLE "cores" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60) NOT NULL,

    CONSTRAINT "cores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orcamento_cores" (
    "id" SERIAL NOT NULL,
    "orcamentoId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "orcamento_cores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orcamento_cores" ADD CONSTRAINT "orcamento_cores_orcamentoId_fkey" FOREIGN KEY ("orcamentoId") REFERENCES "orcamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orcamento_cores" ADD CONSTRAINT "orcamento_cores_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "cores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
