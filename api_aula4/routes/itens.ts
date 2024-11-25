import { PrismaClient } from "@prisma/client"
import { Router } from "express"

// const prisma = new PrismaClient()
// const prisma = new PrismaClient({
//   log: [
//     {
//       emit: 'event',
//       level: 'query',
//     },
//     {
//       emit: 'stdout',
//       level: 'error',
//     },
//     {
//       emit: 'stdout',
//       level: 'info',
//     },
//     {
//       emit: 'stdout',
//       level: 'warn',
//     },
//   ],
// })

// prisma.$on('query', (e) => {
//   console.log('Query: ' + e.query)
//   console.log('Params: ' + e.params)
//   console.log('Duration: ' + e.duration + 'ms')
// })

import { prisma } from "../prisma";
import { verificaAutenticacao } from "../middlewares/verificaAutenticacao";
import { verificaAdmin } from "../middlewares/verificaAdmin";

const router = Router()

router.get("/", async (req, res) => {
  try {
    const itens = await prisma.item.findMany()
    res.status(200).json(itens)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", verificaAutenticacao, verificaAdmin, async (req, res) => {
  const { nome } = req.body

  if (!nome) {
    res.status(400).json({ "erro": "Informe nome do item" })
    return
  }

  try {
    const marca = await prisma.item.create({
      data: { nome }
    })
    res.status(201).json(marca)
  } catch (error) {
    res.status(400).json(error)
  }
})

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

export default router
