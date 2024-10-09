-- CreateEnum
CREATE TYPE "TipoMaterial" AS ENUM ('MADEIRAS', 'PEDRAS', 'ESTOFADOS', 'AROMAS', 'MANTAS', 'ESPELHOS');

-- CreateTable
CREATE TABLE "marcas" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(30) NOT NULL,

    CONSTRAINT "marcas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moveis" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(40) NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "foto" TEXT NOT NULL,
    "observacao" TEXT,
    "destaque" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tipoMaterial" "TipoMaterial" NOT NULL,
    "marcaId" INTEGER NOT NULL,

    CONSTRAINT "moveis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "moveis" ADD CONSTRAINT "moveis_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "marcas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
