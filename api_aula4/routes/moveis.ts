import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const moveis = await prisma.movel.findMany({
      include: {
        marca: true,
      }
    })
    res.status(200).json(moveis)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const { nome, preco, foto, tipoMaterial, marcaId } = req.body

  if (!nome || !preco || !foto || !tipoMaterial || !marcaId) {
    res.status(400).json({ "erro": "Informe nome, preco, foto, tipoMaterial e marcaId" })
    return
  }

  try {
    const movel = await prisma.movel.create({
      data: { nome, preco, foto, tipoMaterial, marcaId }
    })
    res.status(201).json(movel)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const movel = await prisma.movel.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(movel)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nome, preco, foto, tipoMaterial, marcaId } = req.body

  if (!nome || !preco || !foto || !tipoMaterial || !marcaId) {
    res.status(400).json({ "erro": "Informe nome, preco, foto, tipoMaterial e marcaId" })
    return
  }

  try {
    const movel = await prisma.movel.update({
      where: { id: Number(id) },
      data: { nome, preco, foto, tipoMaterial, marcaId }
    })
    res.status(200).json(movel)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/pesquisa/:termo", async (req, res) => {
  const { termo } = req.params

  // tenta converter o termo em número
  const termoNumero = Number(termo)

  // se não é número (Not a Number)
  if (isNaN(termoNumero)) {

    try {
      const moveis = await prisma.movel.findMany({
        include: {
          marca: true,
        },
        where: {
          OR: [
            {
              nome: { contains: termo }
            },
            {
              marca: { nome: termo }
            }
          ]
        }
      })
      res.status(200).json(moveis)
    } catch (error) {
      res.status(400).json(error)
    }

  } else {

    try {
      const moveis = await prisma.movel.findMany({
        include: {
          marca: true,
        },
        where: {
          OR: [
            {
              preco: { lte: termoNumero }
            },
          ]
        }
      })
      res.status(200).json(moveis)
    } catch (error) {
      res.status(400).json(error)
    }

  }

})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const movel = await prisma.movel.findUnique({
      where: { id: Number(id) },
      include: {
        marca: true,
      }
    })
    res.status(200).json(movel)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router