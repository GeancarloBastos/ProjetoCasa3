import { OrcamentoI } from "./orcamentos";


export interface ImagemOrcamentoI {
  id: number;
  urlReferencia: string;
  urlPlanta: string;
  orcamento: OrcamentoI
  orcamentoId: number;
  uploadedAt: Date;
}

