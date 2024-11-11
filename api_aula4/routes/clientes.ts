import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
// import supabase from '../supabaseClient';
// import authenticateUser from "../middlewares/DESCONTINUADOverificaToken";

const prisma = new PrismaClient()
const router = Router()

// router.get("/", async (req, res) => {
//   try {
//     const clientes = await prisma.cliente.findMany()
//     res.status(200).json(clientes)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

function validaSenha(senha: string) {

  const mensa: string[] = []

  // .length: retorna o tamanho da string (da senha)
  if (senha.length < 8) {
    mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres")
  }

  // contadores
  let pequenas = 0
  let grandes = 0
  let numeros = 0
  let simbolos = 0

  // senha = "abc123"
  // letra = "a"

  // percorre as letras da variável senha
  for (const letra of senha) {
    // expressão regular
    if ((/[a-z]/).test(letra)) {
      pequenas++
    }
    else if ((/[A-Z]/).test(letra)) {
      grandes++
    }
    else if ((/[0-9]/).test(letra)) {
      numeros++
    } else {
      simbolos++
    }
  }

  if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
    mensa.push("Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos")
  }

  return mensa
}


router.get("/:id", async (req, res) => {
  const { id } = req.params


  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id }
    })

    if (cliente == null) {
      res.status(400).json({ erro: "Não cadastrado"})
      return
    } else {
      res.status(200).json({
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone
      })
   } 
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const { nome, email, senha, telefone,  } = req.body

  if (!nome || !email || !senha || !telefone) {
    res.status(400).json({ erro: "Informe nome, email, senha e telefone" })
    return
  }

  const erros = validaSenha(senha)

  if (erros.length > 0) {
    res.status(400).json({ erro: erros.join("; ") })
    return
  }

  // 12 é o número de voltas (repetições) que o algoritmo faz
  // para gerar o salt (sal/tempero)
  const salt = bcrypt.genSaltSync(12)
  // gera o hash da senha acrescida do salt
  const hash = bcrypt.hashSync(senha, salt)

  // para o campo senha, atribui o hash gerado
  try {
    const cliente = await prisma.cliente.create({
      data: { nome, email, senha: hash, telefone }
    })
    res.status(201).json(cliente)
  } catch (error) {
    res.status(400).json(error)
  }
})//testee







router.post("/login", async (req, res) => {
  const { email, senha } = req.body



  const mensaPadrao = "Login ou senha incorretos"

  if (!email || !senha) {
    // res.status(400).json({ erro: "Informe e-mail e senha do usuário" })
    res.status(400).json({ erro: mensaPadrao })
    return
  }

  try {
    const usuario = await prisma.cliente.findFirst({
      where: { email }
    })

    if (usuario == null) {
      // res.status(400).json({ erro: "E-mail inválido" })
      res.status(400).json({ erro: mensaPadrao })
      return
    }

    // se o e-mail existe, faz-se a comparação dos hashs
    if (bcrypt.compareSync(senha, usuario.senha)) {
      // se confere, gera e retorna o token
      const token = jwt.sign({
        userLogadoId: usuario.id,
        userLogadoNome: usuario.nome,
      },
        process.env.JWT_KEY as string,
        { expiresIn: "1h" }
      )

      res.status(200).json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        token
      })

    } else {
      res.status(400).json({ erro: mensaPadrao })
    }
  } catch (error) {
    res.status(400).json(error)
  }
})




export default router