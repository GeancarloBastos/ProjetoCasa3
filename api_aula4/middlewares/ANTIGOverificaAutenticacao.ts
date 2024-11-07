import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from 'express'

interface TokenI {
  userLogadoId: number
  userLogadoNome: string
  userLogadoCargo: string
}

// interface CustomRequest extends Request {
//   userLogadoId?: string;
//   userLogadoNome?: string;
// }
// uma solução seria colocar essa interface como tipo de req, chatgpt disse que é melhor que any ali


export function verificaAutenticacao(req: Request | any, res: Response, next: NextFunction) {
  const { authorization } = req.headers
  console.log(authorization)

  if (!authorization) {
    res.status(401).json({ error: "Token não informado" })
    return
  }

  const token = authorization.split(" ")[1]

  console.log("Token depois do split: " + token)

  try {
    const decode = jwt.verify(token, process.env.JWT_KEY as string)
    console.log(decode)
    const { userLogadoId, userLogadoNome, userLogadoCargo } = decode as TokenI
    console.log(userLogadoCargo)

    req.userLogadoId   = userLogadoId
    req.userLogadoNome = userLogadoNome
    req.userLogadoCargo = userLogadoCargo

    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
}