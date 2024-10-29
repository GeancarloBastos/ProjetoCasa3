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


router.post("/", async (req, res) => {
  const { clienteId, itens, urlImagem } = req.body;

  if (!clienteId || !itens || !urlImagem) {
    res
      .status(400)
      .json({ erro: "Informe clienteId, os itens e o url da imagem" });
    return;
  }

  try {
    const orcamento = await prisma.orcamento.create({
      data: { clienteId },
    });

    for (const itemId of itens) {
        await prisma.itemOrcamento.create({
            data: {orcamentoId:orcamento.id, itemId}
        })
    }

      await prisma.imagemOrcamento.create({
        data: {
          url: urlImagem,
          orcamentoId: orcamento.id,
        },
      });

    res.status(201).json(orcamento);
  } catch (error) {
    res.status(400).json(error);
  }
});



export default router