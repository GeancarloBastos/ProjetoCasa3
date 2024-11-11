import { ItemI } from "./itens";

export interface ItemRelationI {
  id: number;
  orcamentoId: number;
  itemId: number;
  item: ItemI;
}
