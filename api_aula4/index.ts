import express from 'express'
import marcasRoutes from './routes/marcas'
import moveisRoutes from './routes/moveis'
import fotosRoutes from './routes/fotos'
import clientesRoutes from './routes/clientes'
import orcamentoRoutes from './routes/orcamento'
import cors from 'cors'
const app = express()
const port = 3004

app.use(express.json())
app.use(cors())

app.use("/marcas", marcasRoutes)
app.use("/moveis", moveisRoutes)
app.use("/fotos", fotosRoutes)
app.use("/clientes", clientesRoutes)
app.use("/orcamentos", orcamentoRoutes)

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