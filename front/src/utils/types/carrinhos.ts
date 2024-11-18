import { carrinhoRelationI } from "./carrinhoRelation";

export interface CarrinhoI {
  id: string;
  valor: number;
  createdAt: string;
  clienteId: number;
  produtos:  carrinhoRelationI[];
}

