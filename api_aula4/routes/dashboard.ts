import { PrismaClient } from "@prisma/client"
import { Router } from "express"

import { prisma } from "../prisma";
import { verificaAutenticacao } from "../middlewares/verificaAutenticacao";
import { verificaAdmin } from "../middlewares/verificaAdmin";
const router = Router()

router.get("/gerais", verificaAutenticacao, verificaAdmin, async (req, res) => {
  try {
    const clientes = await prisma.cliente.count()
    const moveis = await prisma.produto.count()
    const orcamento = await prisma.orcamento.count()
    res.status(200).json({ clientes, moveis, orcamento })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/produtosTipo", verificaAutenticacao, verificaAdmin, async (req, res) => {
  try {
    const produtos = await prisma.produto.groupBy({
      by: ['tipoProdutoId'],
      _count: {
        id: true, 
      }
    })

    // Para cada produto, inclui o nome do tipo relacionada ao tipoProdutoId
    const produtosTipo = await Promise.all(
      produtos.map(async (produto) => {
        const tipo = await prisma.tipoProduto.findUnique({
          where: { id: produto.tipoProdutoId }
        })
        return {
          tipo: tipo?.nome, 
          num: produto._count.id
        }
      })
    )
    res.status(200).json(produtosTipo)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
