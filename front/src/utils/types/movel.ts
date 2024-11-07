import { MarcaI } from "./marcas"

export interface MovelI {
  id: number
  nome: string
  descricao: String
  preco: number
  foto: string
  observacao: string
  destaque: boolean
  createdAt: Date
  updatedAt: Date
  tipoMaterial: string
  marca: MarcaI
  marcaId: number
}