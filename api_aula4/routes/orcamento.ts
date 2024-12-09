import { PrismaClient } from "@prisma/client";
import { Router } from "express";

// const prisma = new PrismaClient();
// const prisma = new PrismaClient({
//   log: ["query", "info", "warn", "error"],
// });

import { prisma } from "../prisma";
import { verificaAutenticacao } from "../middlewares/verificaAutenticacao";
import { verificaAdmin } from "../middlewares/verificaAdmin";

const router = Router();

  prisma.$use(async (params, next) => {
    // Check incoming query type
    if (params.model == "Orcamento") {
      if (params.action == "delete") {
        // Delete queries
        // Change action to an update
        params.action = "update";
        params.args["data"] = { deleted: true };
      }
      if (params.action == "deleteMany") {
        // Delete many queries
        params.action = "updateMany";
        if (params.args.data != undefined) {
          params.args.data["deleted"] = true;
        } else {
          params.args["data"] = { deleted: true };
        }
      }
    }
    return next(params);
  });

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const orcamentos = await prisma.orcamento.findMany({
      include: {
        itens: {
          include: {
            item: true,
          },
        },
        imagens: true,
        cores: {
          include: {
            cor: true,
          },
        },
        adicionais: {
          include: {
            adicional: true,
          },
        },
      },
      where: {
        clienteId: id,
        deleted: false 
      },
    });
    res.status(200).json(orcamentos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const orcamentos = await prisma.orcamento.findMany({
      include: {
        itens: {
          include: {
            item: true,
          },
        },
        imagens: true,
        cores: {
          include: {
            cor: true,
          },
        },
        adicionais: {
          include: {
            adicional: true,
          },
        },
      },
      where: {  deleted: false  },
    });
    res.status(200).json(orcamentos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/pesq/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const orcamentos = await prisma.orcamento.findMany({
      include: {
        itens: {
          include: {
            item: true
          }
        },
        imagens: true,
        cores: {
          include: {
            cor: true
          }
        },
        adicionais: {
          include: {
            adicional: true
          }
        }
      },
      where: {
        id: Number(id)
      }
    });
    res.status(200).json(orcamentos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/status/:id", async (req, res) => {
  const { id } = req.params;
  
  try {

    const orcamento = await prisma.orcamento.findUnique({
      where: { id: Number(id) },
      select: { status: true }
    });

    if (!orcamento) {
      return res.status(404).json({ error: "Orçamento não encontrado" });
    }

    let novoStatus:string

    
    if (orcamento.status === "PENDENTE") {
      novoStatus = "RESPONDIDO";
    } else {
      novoStatus = "PENDENTE";
    }

    const orcamentos = await prisma.orcamento.update({
      where: {
        id: Number(id),
      },
      data: {
        status: novoStatus
      }
    });
    res.status(200).json(orcamentos);
  } catch (error) {
    res.status(400).json(error);
  }
});



router.post("/", verificaAutenticacao, async (req, res) => {
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

router.delete("/:id", verificaAutenticacao, verificaAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const movel = await prisma.orcamento.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(movel);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
