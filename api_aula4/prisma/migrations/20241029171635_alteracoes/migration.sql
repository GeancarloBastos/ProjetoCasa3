/*
  Warnings:

  - The values [MADEIRAS,PEDRAS,ESTOFADOS,AROMAS,MANTAS,ESPELHOS] on the enum `TipoMaterial` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `createdAt` on the `moveis` table. All the data in the column will be lost.
  - You are about to drop the column `marcaId` on the `moveis` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `moveis` table. All the data in the column will be lost.
  - You are about to drop the column `observacao` on the `moveis` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `moveis` table. All the data in the column will be lost.
  - You are about to drop the `marcas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cor` to the `moveis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `moveis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipoMaterial_new" AS ENUM ('MADEIRA', 'MDF', 'MDP', 'PEDRA', 'ESTOFADO');
ALTER TABLE "moveis" ALTER COLUMN "tipoMaterial" TYPE "TipoMaterial_new" USING ("tipoMaterial"::text::"TipoMaterial_new");
ALTER TYPE "TipoMaterial" RENAME TO "TipoMaterial_old";
ALTER TYPE "TipoMaterial_new" RENAME TO "TipoMaterial";
DROP TYPE "TipoMaterial_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "moveis" DROP CONSTRAINT "moveis_marcaId_fkey";

-- AlterTable
ALTER TABLE "moveis" DROP COLUMN "createdAt",
DROP COLUMN "marcaId",
DROP COLUMN "nome",
DROP COLUMN "observacao",
DROP COLUMN "updatedAt",
ADD COLUMN     "cor" TEXT NOT NULL,
ADD COLUMN     "descricao" VARCHAR(40) NOT NULL;

-- DropTable
DROP TABLE "marcas";
