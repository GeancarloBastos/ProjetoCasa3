import { PrismaClient } from "@prisma/client";
import { Router } from "express";

// const prisma = new PrismaClient();
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const orcamentos = await prisma.orcamento.findMany({
      include: {
        itens: true,
        imagens: true,
        cores: true,
        adicionais: true
      },
      where: {
        clienteId: id,
      },
    });
    res.status(200).json(orcamentos);
  } catch (error) {
    res.status(400).json(error);
  }
});



router.post("/", async (req, res) => {
  const {
    clienteId,
    itens,
    cores,
    adicionais,
    urlReferencia,
    urlPlanta,
    acabamento,
    ambiente,
    faixaPreco,
    observacoes,
    prazo,
  } = req.body;

  // COMENTADO VERIFICAÇÃO DE TODAS VARIAVEIS RECEBIDAS, ATÉ CONFIRMAR COM CLIENTE QUAIS SERIAM OBRIGATÓRIOS NO FORM.
  
  // if (!clienteId || !itens || !cores || !adicionais || !urlReferencia || !urlPlanta || !acabamento || !ambiente || !faixaPreco
  //   || !observacoes || !prazo
  // ) {
  //   res
  //     .status(400)
  //     .json({ erro: "Informações de formulário faltando" });
  //   return;
  // }

  try {
    const resultado = await prisma.$transaction(async (prisma) => {
      const orcamento = await prisma.orcamento.create({
        data: {
          clienteId,
          acabamento,
          ambiente,
          faixaPreco,
          observacoes,
          prazo,
        },
      });

      const itemPromises = itens.map((itemId: number) =>
        prisma.itemOrcamento.create({
          data: { orcamentoId: orcamento.id, itemId },
        })
      );

      const corPromises = cores.map((corId: number) =>
        prisma.corOrcamento.create({
          data: { orcamentoId: orcamento.id, corId },
        })
      );

      const adicionalPromises = adicionais.map((adicionalId: number) =>
        prisma.adicionalOrcamento.create({
          data: { orcamentoId: orcamento.id, adicionalId },
        })
      );

      const imagemPromise = prisma.imagemOrcamento.create({
        data: {
          urlPlanta: urlPlanta,
          urlReferencia: urlReferencia,
          orcamentoId: orcamento.id,
        },
      });

      await Promise.all([
        ...itemPromises,
        ...corPromises,
        ...adicionalPromises,
        imagemPromise,
      ]);

    });
    res.status(201).json(resultado);
  } catch (error) {
    console.error("Erro ao processar orçamento:", error);
    res.status(400).json(error);
  }
});

export default router;
