import { AdicionalI } from "./adicionais";


export interface AdicionalRelationI {
  id: number;
  orcamentoId: number;
  adicionalId: number;
  adicional: AdicionalI;
}


