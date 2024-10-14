import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.post("/", async (req, res) => {
  const { clienteId, itens } = req.body;

  if (!clienteId || !itens) {
    res
      .status(400)
      .json({ erro: "Informe clienteId e os itens" });
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

    res.status(201).json(orcamento);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router