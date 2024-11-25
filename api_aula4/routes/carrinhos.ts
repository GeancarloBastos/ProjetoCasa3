import { PrismaClient, Produto } from "@prisma/client";
import { Router } from "express";

// const prisma = new PrismaClient()
// const prisma = new PrismaClient({
//   log: [
//     {
//       emit: "event",
//       level: "query",
//     },
//     {
//       emit: "stdout",
//       level: "error",
//     },
//     {
//       emit: "stdout",
//       level: "info",
//     },
//     {
//       emit: "stdout",
//       level: "warn",
//     },
//   ],
// });

// prisma.$on("query", (e) => {
//   console.log("Query: " + e.query);
//   console.log("Params: " + e.params);
//   console.log("Duration: " + e.duration + "ms");
// });

import { prisma } from "../prisma";
import { verificaAutenticacao } from "../middlewares/verificaAutenticacao";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const cores = await prisma.carrinho.findMany({
        include: {
            produtos: {
                include: {
                    produto: true
                }
            }
        }
    });
    res.status(200).json(cores);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const carrinhos = await prisma.carrinho.findMany({
      include: {
        produtos: {
          include: {
            produto: true
          },
        }
    },
    where: {
      clienteId: id,
    },
});
    res.status(200).json(carrinhos);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/pesq/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const carrinhos = await prisma.carrinho.findUnique({
      include: {
        produtos: {
          include: {
            produto: true
          },
        }
    },
    where: {
      id: Number(id),
    },
});
    res.status(200).json(carrinhos);
  } catch (error) {
    res.status(400).json(error);
  }
});


 interface ProdutoCarrinho {
  id: number;
  descricao: string;
  preco: number;
  foto: string;
  quantidade: number;
  observacao?: string;
  material?: string;
}

router.post("/", verificaAutenticacao, async (req, res) => {
  const {
    clienteId,
    produtos,
    valor
  } = req.body;


  try {
    const resultado = await prisma.$transaction(async (prisma) => {
      const carrinho = await prisma.carrinho.create({
        data: {
          clienteId,
          valor,
        },
      });

      const produtosPromises = produtos.map((produto: ProdutoCarrinho) =>
        prisma.carrinhoProduto.create({
          data: { carrinhoId: carrinho.id, produtoId: produto.id, quantidade:produto.quantidade },
        })
      );

      await Promise.all([
        ...produtosPromises,
      ]);


    });
    res.status(201).json(resultado);
  } catch (error) {
    console.error("Erro ao processar carrinho:", error);
    res.status(400).json(error);
  }
});

// router.delete("/:id", async (req, res) => {
//   const { id } = req.params

//   try {
//     const marca = await prisma.marca.delete({
//       where: { id: Number(id) }
//     })
//     res.status(200).json(marca)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// router.put("/:id", async (req, res) => {
//   const { id } = req.params
//   const { nome } = req.body

//   if (!nome) {
//     res.status(400).json({ "erro": "Informe nome da marca" })
//     return
//   }

//   try {
//     const marca = await prisma.marca.update({
//       where: { id: Number(id) },
//       data: { nome }
//     })
//     res.status(200).json(marca)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

export default router;
