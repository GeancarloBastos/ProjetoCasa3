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
import { verificaAdmin } from "../middlewares/verificaAdmin";

const router = Router();

  prisma.$use(async (params, next) => {
    // Check incoming query type
    if (params.model == "Carrinho") {
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

router.get("/", async (req, res) => {
  try {
    const cores = await prisma.carrinho.findMany({
        include: {
            produtos: {
                include: {
                    produto: true
                }
            }
            
        },
        where: {deleted: false}
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
      deleted: false
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

router.delete("/:id", verificaAutenticacao, verificaAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const movel = await prisma.carrinho.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(movel);
  } catch (error) {
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
