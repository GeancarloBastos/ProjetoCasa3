import { Prisma, PrismaClient } from "@prisma/client";
import { Router } from "express";
import { TipoMaterial } from "@prisma/client";

// const prisma = new PrismaClient();
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
const router = Router();

// router.get("/", async (req, res) => {
//   try {
//     const moveis = await prisma.movel.findMany({
//       // include: {
//       //   marca: true,
//       // },
//     });
//     res.status(200).json(moveis);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

router.post("/", async (req, res) => {
  const { descricao, preco, foto, tipoMaterial, cor } = req.body;

  if (!descricao || !preco || !foto || !tipoMaterial || !cor ) {
    res
      .status(400)
      .json({ erro: "Informe nome, preco, foto, tipoMaterial e marcaId" });
    return;
  }

  try {
    const movel = await prisma.movel.create({
      data: { descricao, preco, foto, tipoMaterial, cor },
    });
    res.status(201).json(movel);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const movel = await prisma.movel.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(movel);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { descricao, preco, foto, tipoMaterial } = req.body;

  if (!descricao || !preco || !foto || !tipoMaterial ) {
    res
      .status(400)
      .json({ erro: "Informe nome, preco, foto, tipoMaterial e marcaId" });
    return;
  }

  try {
    const movel = await prisma.movel.update({
      where: { id: Number(id) },
      data: { descricao, preco, foto, tipoMaterial },
    });
    res.status(200).json(movel);
  } catch (error) {
    res.status(400).json(error);
  }
});

// router.get("/pesquisa/:termo", async (req, res) => {
//   const { termo } = req.params;

//   // tenta converter o termo em número
//   const termoNumero = Number(termo);

//   // se não é número (Not a Number)
//   if (isNaN(termoNumero)) {
//     try {
//       const moveis = await prisma.movel.findMany({
//         include: {
//           marca: true,
//         },
//         where: {
//           OR: [
//             {
//               nome: { contains: termo },
//             },
//             {
//               marca: { nome: termo },
//             },
//           ],
//         },
//       });
//       res.status(200).json(moveis);
//     } catch (error) {
//       res.status(400).json(error);
//     }
//   } else {
//     try {
//       const moveis = await prisma.movel.findMany({
//         include: {
//           marca: true,
//         },
//         where: {
//           OR: [
//             {
//               preco: { lte: termoNumero },
//             },
//           ],
//         },
//       });
//       res.status(200).json(moveis);
//     } catch (error) {
  //       res.status(400).json(error);
  //     }
  //   }
  // });
  
  router.get("/", async (req, res) => {
    const { tipoMaterial, cor, precoMin, precoMax, search } = req.query;
    try {
        const filtros: Prisma.MovelWhereInput = {}; // Usando a interface atualizada
        console.log(req.query)
  
        if (tipoMaterial) {
          filtros.tipoMaterial = {
            equals: tipoMaterial as TipoMaterial
          }
        }
  
        if (cor) {
          filtros.cor = {
            equals: cor as string
          }
        }
  
        if (precoMin || precoMax) {
          filtros.preco = {};
          if (precoMin) {
            filtros.preco.gte = Number(precoMin);
          }
          if (precoMax) {
            filtros.preco.lte = Number(precoMax);
          }
        }
  
  
        if (search) {
          filtros.descricao = {contains: search as string}
        }
      console.log("filtros aplicados=" + filtros)
      // Consulta com where e busca combinados
      const produtos = await prisma.movel.findMany({
        where: filtros
      });
      console.log("Filtros aplicados:", JSON.stringify(filtros, null, 2));
      res.json(produtos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar produtos." });
    }
  });
  
router.get("/teste/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movel = await prisma.movel.findUnique({
      where: { id: Number(id) },
      // include: {
      //   marca: true,
      // },
    });
    res.status(200).json(movel);
  } catch (error) {
    res.status(400).json(error);
  }
});

// interface FiltroNomeDescricao {
//   nome?: { contains: string; mode: "insensitive" };
//   descricao?: { contains: string; mode: "insensitive" };
// }

// interface where {
//   tipoMaterial?: TipoMaterial;
//   cor?: string;
//   preco?: {
//     gte?: number;
//     lte?: number;
//   };
//   OR?: FiltroNomeDescricao[]; // Adiciona a propriedade OR
//   search?: string;
// }


export default router;
