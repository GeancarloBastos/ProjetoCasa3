import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

export async function verificaAdmin(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const { userLogadoId } = req;
  const prisma = new PrismaClient();
  try {

    const admin = await prisma.admin.findUnique({
        where: {id: Number(userLogadoId)}
    })

    console.log(admin)

    if (!admin) {
      return res
        .status(403)
        .json({ error: "Acesso negado. Admin necessário." });
    }

    next(); 
  } catch (error) {
    return res.status(500).json({ error: "Erro ao verificar admin." });
  }
}
