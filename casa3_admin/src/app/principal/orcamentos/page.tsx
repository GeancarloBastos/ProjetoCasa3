'use client'
import { useEffect, useState } from "react"
{/*import Link from 'next/link'*/}

import ItemOrcamento from '@/components/ItemOrcamento'
import { OrcamentoI } from "@/utils/types/orcamentos"

function Cadprodutos() {
  const [orcamentos, setOrcamento] = useState<OrcamentoI[]>([])


  useEffect(() => {
    async function getprodutos() {

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/orcamentos`);
      const dados = await response.json();

      const orcamentosCompletos = dados.map((orcamento: OrcamentoI) => {
        return {
          ...orcamento
        };
      });

      setOrcamento(orcamentosCompletos); // Atualiza o estado com os dados ajustados
    }

    getprodutos();
  }, []);
  

  const listaorcamentos = orcamentos.map((orcamento) => (
    <ItemOrcamento
      key={orcamento.id}
      orcamento={orcamento}
      orcamentos={orcamentos}
      setOrcamento={setOrcamento}
    />
  ));

  return (
    <div className="m-4 mt-24">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-zinc-900 md:text-3xl lg:text-4xl">
          Controle de Orçamentos
        </h1>
        {/* <Link href="produtos/novo" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Novo produto
        </Link> */}
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-100">
          <thead className="text-xs text-gray-100 uppercase bg-zinc-900">
            <tr>
              <th scope="col" className="px-6 py-3">
                FotoReferencia
              </th>
              <th scope="col" className="px-6 py-3">
                Prazo
              </th>
              <th scope="col" className="px-6 py-3">
                Faixa Preço
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              {/* <th scope="col" className="px-6 py-3"></th> */}
              {/* <th scope="col" className="px-6 py-3">
                Preço R$
              </th> */}
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>{listaorcamentos}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Cadprodutos