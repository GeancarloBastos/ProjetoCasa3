import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface TokenI {
  userLogadoId: number;
  userLogadoNome: string;
}

// Middleware de autenticação para qualquer usuário logado
export function verificaAutenticacao(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  console.log(authorization)

  if (!authorization) {
    return res.status(401).json({ error: "Token não informado" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_KEY as string) as TokenI;
    const { userLogadoId, userLogadoNome } = decode;

    console.log(userLogadoNome, userLogadoId)

    // Passa o ID e nome do usuário para o próximo middleware
    req.userLogadoId = userLogadoId;
    req.userLogadoNome = userLogadoNome;

    next();
  } catch (error) {
    return res.status(402).json({ error: "Token inválido" });
  }
}
