import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import supabase from '../supabaseClient';
import authenticateUser from "../middlewares/verificaToken";

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany()
    res.status(200).json(clientes)
  } catch (error) {
    res.status(400).json(error)
  }
})

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

// Rota para registrar usuários
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios!' });
  }

  const erros = validaSenha(password)
  if (erros.length > 0) {
    res.status(400).json({ erro: erros.join("; ") })
    return
  }

  // Cria o usuário no Supabase
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({
    message: 'Usuário criado com sucesso!',
    user: data.user,
  });
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({
    message: 'Login bem-sucedido!',
    token: data.session.access_token,
    refresh: data.session.refresh_token
  });
});




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
        email: cliente.email
      })
   } 
  } catch (error) {
    res.status(400).json(error)
  }
})








// router.post("/login", async (req, res) => {
//   const { email, senha } = req.body

//   // em termos de segurança, o recomendado é exibir uma mensagem padrão
//   // a fim de evitar de dar "dicas" sobre o processo de login para hackers
//   const mensaPadrao = "Login ou senha incorretos"

//   if (!email || !senha) {
//     // res.status(400).json({ erro: "Informe e-mail e senha do usuário" })
//     res.status(400).json({ erro: mensaPadrao })
//     return
//   }

//   try {
//     const cliente = await prisma.cliente.findUnique({
//       where: { email }
//     })

//     if (cliente == null) {
//       // res.status(400).json({ erro: "E-mail inválido" })
//       res.status(400).json({ erro: mensaPadrao })
//       return
//     }

//     // se o e-mail existe, faz-se a comparação dos hashs
//     if (bcrypt.compareSync(senha, cliente.senha)) {
//       res.status(200).json({
//         id: cliente.id,
//         nome: cliente.nome,
//         email: cliente.email
//       })
//     } else {
//       // res.status(400).json({ erro: "Senha incorreta" })
//       res.status(400).json({ erro: mensaPadrao })
//     }
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })




export default router