
import { ProdutoI } from "./produtos";

export interface carrinhoRelationI {
  id: number;
  quantidade: number;
  carrinhoId: number;
  produtoId: number;
  produto: ProdutoI;
}
