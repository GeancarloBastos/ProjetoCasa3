/*
  Warnings:

  - You are about to drop the column `cor` on the `produtos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "cor",
ADD COLUMN     "corId" INTEGER;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_corId_fkey" FOREIGN KEY ("corId") REFERENCES "cores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
