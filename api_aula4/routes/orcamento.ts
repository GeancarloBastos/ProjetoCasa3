import { PrismaClient } from "@prisma/client";
import { Router } from "express";

// const prisma = new PrismaClient();
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
const router = Router();


router.get("/:id", async (req, res) => {
  const {id} = req.params
  try {
    const orcamentos = await prisma.orcamento.findMany({
      include: {
        itens: true,
        imagens: true,
      },
      where: {
        clienteId: id
      }
    });
    res.status(200).json(orcamentos);
  } catch (error) {
    res.status(400).json(error);
  }
});



// model Orcamento {
//   id            Int               @id @default(autoincrement())
//   cliente       Cliente           @relation(fields: [clienteId], references: [id])
//   clienteId     String
//   status        String            @default("PENDENTE") @db.VarChar(60)
//   acabamento    String           @db.VarChar(60)
//   ambiente      String           @db.VarChar(60)
//   faixaPreco    String           @db.VarChar(120)
//   observacoes   String          @db.VarChar(255)
//   prazo         String          @db.VarChar(255)
//   gavetas       Boolean    
//   iluminacao    Boolean
//   portas        Boolean
//   largura       Decimal
//   metragem      Decimal
//   profundidade  Decimal
//   createdAt     DateTime          @default(now())
//   updatedAt     DateTime          @updatedAt
//   itens     ItemOrcamento[]
//   cores     CorOrcamento[]
//   imagens   ImagemOrcamento[]

//   @@map("orcamentos")
// }


router.post("/", async (req, res) => {
  const { clienteId, itens, cores, urlReferencia, urlPlanta, acabamento, ambiente, faixaPreco, observacoes,
    prazo, gavetas, iluminacao, portas, largura, metragem, profundidade
   } = req.body;

  // if (!clienteId || !itens || !cores || !urlReferencia || !urlPlanta || !acabamento || !ambiente || !faixaPreco
  //   || !observacoes || !prazo || !gavetas || !iluminacao || !portas || !largura || !metragem || !profundidade
  // ) {
  //   res
  //     .status(400)
  //     .json({ erro: "Informe clienteId, os itens e o url da imagem" });
  //   return;
  // }

  try {
    const orcamento = await prisma.orcamento.create({
      data: { clienteId, acabamento, ambiente, faixaPreco, observacoes, prazo, gavetas, iluminacao, portas, largura, metragem, profundidade },
    });

    for (const itemId of itens) {
        await prisma.itemOrcamento.create({
            data: {orcamentoId:orcamento.id, itemId}
        })
    }

    for (const corId of cores) {
        await prisma.corOrcamento.create({
            data: {orcamentoId:orcamento.id, corId}
        })
    }

      await prisma.imagemOrcamento.create({
        data: {
          urlPlanta: urlPlanta,
          urlReferencia: urlReferencia,
          orcamentoId: orcamento.id,
        },
      });

    res.status(201).json(orcamento);
  } catch (error) {
    res.status(400).json(error);
  }
});



export default router