import { Prisma, PrismaClient } from "@prisma/client";
import { Router } from "express";
import { TipoMaterial } from "@prisma/client";
import { verificaAutenticacao } from "../middlewares/verificaAutenticacao";
import { verificaAdmin } from "../middlewares/verificaAdmin";

import {prisma} from '../prisma'

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

router.post("/", verificaAutenticacao, verificaAdmin, async (req, res) => {
  const { descricao, preco, foto, tipoMaterial, corId, tipoProdutoId } = req.body;

  if (!descricao || !preco || !foto || !tipoMaterial || !corId || !tipoProdutoId ) {
    res
      .status(400)
      .json({ erro: "Informe nome, preco, foto, tipoMaterial e tipoProdutoId" });
    return;
  }

  try {
    const movel = await prisma.produto.create({
      data: { descricao, preco, foto, tipoMaterial, corId, tipoProdutoId },
    });
    res.status(201).json(movel);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", verificaAutenticacao, verificaAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const movel = await prisma.produto.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(movel);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.patch("/:id", verificaAutenticacao, verificaAdmin, async (req, res) => {
  const { id } = req.params;
  const { descricao, preco, foto, tipoProdutoId, corId } = req.body;

  // Verifica se pelo menos um campo foi enviado
  if (!descricao && !preco && !foto && !tipoProdutoId && !corId) {
    return res
      .status(400)
      .json({ erro: "Informe pelo menos um campo para atualizar" });
  }

  try {
    // Atualiza apenas os campos fornecidos
    const movel = await prisma.produto.update({
      where: { id: Number(id) },
      data: {
        descricao: descricao ?? undefined, // Só atualiza se fornecido
        preco: Number(preco) ?? undefined, // Só atualiza se fornecido
        foto: foto ?? undefined, // Só atualiza se fornecido
        tipoProdutoId: Number(tipoProdutoId) ?? undefined, // Só atualiza se fornecido
        corId: Number(corId) ?? undefined, // Só atualiza se fornecido
      },
    });

    res.status(200).json(movel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar o produto" });
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
    const { tipoProdutoId, cor, precoMin, precoMax, search } = req.query;
    try {
        const filtros: Prisma.ProdutoWhereInput = {}; // Usando a interface atualizada
        console.log(req.query)
  
        if (tipoProdutoId) {
          filtros.tipoProdutoId = {
            equals: Number(tipoProdutoId)
          }
        }
  
        if (cor) {
          filtros.corId = {
            equals: Number(cor), // Converta `cor` para número, pois é o `id` da cor
          };
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
      const produtos = await prisma.produto.findMany({
        where: filtros,
        include: { cor: true, tipoProduto: true } 
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
    const movel = await prisma.produto.findUnique({
      where: { id: Number(id) },
      include: {
        cor: true,
        tipoProduto: true
      },
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
