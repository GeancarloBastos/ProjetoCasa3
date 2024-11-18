import express from 'express'
// import marcasRoutes from './routes/marcas'
import moveisRoutes from './routes/produtos'
import fotosRoutes from './routes/fotos'
import clientesRoutes from './routes/clientes'
import orcamentoRoutes from './routes/orcamento'
import itensRoutes from './routes/itens'
import coresRoutes from './routes/cores'
import cors from 'cors'
import adminRoutes from './routes/admins'
import dashbourdRoutes from './routes/dashboard'
import tiposRoutes from './routes/tipos'
import carrinhoRoutes from './routes/carrinhos'
const app = express()
const port = 3004

app.use(express.json())
app.use(cors())

// app.use("/marcas", marcasRoutes)
app.use("/moveis", moveisRoutes)
app.use("/fotos", fotosRoutes)
app.use("/clientes", clientesRoutes)
app.use("/orcamentos", orcamentoRoutes)
app.use("/itens", itensRoutes)
app.use("/cores", coresRoutes)
app.use("/admins", adminRoutes)
app.use("/dashboard", dashbourdRoutes)
app.use("/tipos", tiposRoutes)
app.use("/carrinhos", carrinhoRoutes)

app.get('/', (req, res) => {
  res.send('API: Sistema de Venda de Móveis')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})

declare global {
  namespace Express {
    interface Request {
      user?: any; // Defina o tipo que você espera para user
      session?: any; // Defina o tipo que você espera para session
    }
  }
}