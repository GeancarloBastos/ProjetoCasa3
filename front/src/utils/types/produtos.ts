import { CorI } from "./cores"
import { TipoI } from "./tipos"

export interface ProdutoI {
  id: number
  descricao: string
  preco: number
  foto: string
  tipoMaterial: TipoMaterial
  tipoProduto: TipoI
  tipoProdutoId: number
  cor: CorI
  corId: number
}

enum TipoMaterial {
  MADEIRA = "MADEIRA",
  MDF = "MDF",
  MDP = "MDP",
  PEDRA = "PEDRA",
  ESTOFADO = "ESTOFADO",
  // AROMA = "AROMA",  // 
  // MANTA = "MANTA",
  // ESPELHO = "ESPELHO"
}