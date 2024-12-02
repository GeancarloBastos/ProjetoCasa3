import { PrismaClient } from "@prisma/client"
import { Router } from "express"

import { prisma } from "../prisma";
import { verificaAutenticacao } from "../middlewares/verificaAutenticacao";
import { verificaAdmin } from "../middlewares/verificaAdmin";
const router = Router()

router.get("/gerais", verificaAutenticacao, verificaAdmin, async (req, res) => {
  try {
    const clientes = await prisma.cliente.count()
    const produtos = await prisma.produto.count()
    const orcamentos = await prisma.orcamento.count()
    res.status(200).json({ clientes, produtos, orcamentos })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/carrinhosMensal", verificaAutenticacao, verificaAdmin, async (req, res) => {
  try {
    const valorCarrinhosMensal = await prisma.carrinho.groupBy({
      by: ["createdAt"],
      _sum: { valor: true },
      orderBy: { createdAt: "asc" },
    });
    res.status(200).json(valorCarrinhosMensal)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/produtosTipo", verificaAutenticacao, verificaAdmin, async (req, res) => {
  try {
    const produtosPorTipo = await prisma.tipoProduto.findMany({
      select: {
        nome: true,
        _count: { select: { produtos: true } },
      },
    });

    res.status(200).json(produtosPorTipo)
  } catch (error) {
    res.status(400).json(error)
  }
})






export default router
