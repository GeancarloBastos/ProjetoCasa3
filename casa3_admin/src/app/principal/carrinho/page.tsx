'use client'
import { useEffect, useState } from "react"
//import Link from 'next/link'

//import ItemOrcamento from '@/components/ItemOrcamento'
//import { OrcamentoI } from "@/utils/types/orcamentos"
import { CarrinhoI } from "@/utils/types/carrinhos"
//import ItemCarro from "@/components/ItemCarrinho"
import ItemCarrinho from "@/components/ItemCarrinho"

function Cadprodutos() {
  const [carrinhos, setCarrinho] = useState<CarrinhoI[]>([])


  useEffect(() => {
    async function getprodutos() {

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/carrinhos`);
      const dados = await response.json();

      const carrinhosCompletos = dados.map((carrinho: CarrinhoI) => {
        return {
          ...carrinho
        };
      });

      setCarrinho(carrinhosCompletos); // Atualiza o estado com os dados ajustados
    }

    getprodutos();
  }, []);
  

  const listacarrinhos = carrinhos.map((carrinho) => (
    <ItemCarrinho
      key={carrinho.id}
      carrinho={carrinho}
      carrinhos={carrinhos}
      setCarrinho={setCarrinho}
    />
  ));

  return (
    <div className="m-4 mt-24">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
          Requisições Carrinho
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
                Produtos
              </th>
              <th scope="col" className="px-6 py-3">
                Valor Total
              </th>
              <th scope="col" className="px-6 py-3">
                Data
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
          <tbody>{listacarrinhos}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Cadprodutos