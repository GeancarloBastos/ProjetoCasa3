import { AdicionalI } from "./adicionais";
import { AdicionalRelationI } from "./adicionaisRelation";
import { ClienteI } from "./clientes";
import { CorI } from "./cores";
import { CorRelationI } from "./coresRelation";
import { ImagemOrcamentoI } from "./imagemOrcamentos";
import { ItemI } from "./itens";
import { ItemRelationI } from "./itensRelation";

export interface OrcamentoI {
  id: number;
  cliente: ClienteI
  status: string;
  acabamento: string;
  ambiente: string;
  faixaPreco: string;
  observacoes: string;
  prazo: string;
  createdAt: string;
  updatedAt: Date;
  itens:  ItemRelationI[];
  cores: CorRelationI[];
  imagens:  ImagemOrcamentoI[];
  adicionais: AdicionalRelationI[];
}



// model Orcamento {
//   id          Int               @id @default(autoincrement())
//   cliente     Cliente           @relation(fields: [clienteId], references: [id])
//   clienteId   String
//   status      String            @default("PENDENTE") @db.VarChar(60)
//   acabamento  String            @db.VarChar(60)
//   ambiente    String            @db.VarChar(60)
//   faixaPreco  String            @db.VarChar(120)
//   observacoes String            @db.VarChar(255)
//   prazo       String            @db.VarChar(255)
//   createdAt   DateTime          @default(now())
//   updatedAt   DateTime          @updatedAt
//   itens       ItemOrcamento[]
//   cores       CorOrcamento[]
//   imagens     ImagemOrcamento[]
//   adicionais AdicionalOrcamento[]

//   @@map("orcamentos")
// }
