import { PrismaClient } from "@prisma/client";
import { Router } from "express";

// const prisma = new PrismaClient()
import { prisma } from "../prisma";
import { verificaAutenticacao } from "../middlewares/verificaAutenticacao";
import { verificaAdmin } from "../middlewares/verificaAdmin";



const router = Router();

router.get("/", async (req, res) => {
  try {
    const cores = await prisma.cor.findMany();
    res.status(200).json(cores);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", verificaAutenticacao, verificaAdmin, async (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    res.status(400).json({ erro: "Informe nome do cor" });
    return;
  }

  try {
    const cor = await prisma.cor.create({
      data: { nome },
    });
    res.status(201).json(cor);
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
