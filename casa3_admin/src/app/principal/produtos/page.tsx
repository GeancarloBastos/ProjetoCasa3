'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'

import ItemProduto from '@/components/ItemProduto'
import { ProdutoI } from "@/utils/types/produtos"

function Cadprodutos() {
  const [produtos, setProdutos] = useState<ProdutoI[]>([])


  useEffect(() => {
    async function getprodutos() {

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos`);
      const dados = await response.json();

      const produtosCompletos = dados.map((produto: ProdutoI) => {
        return {
          ...produto,
          tipoProduto: {
            id: produto.tipoProduto?.id, // Acessa o id de tipoProduto se ele existir
            nome: produto.tipoProduto?.nome, // Acessa o nome de tipoProduto se ele existir
          },
          cor: {
            id: produto.cor?.id, // Acessa o id de cor se ele existir
            nome: produto.cor?.nome, // Acessa o nome de cor se ele existir
          },
        };
      });

      setProdutos(produtosCompletos); // Atualiza o estado com os dados ajustados
    }

    getprodutos();
  }, []);
  

  const listaprodutos = produtos.map(produto => (
    <ItemProduto key={produto.id} produto={produto} produtos={produtos} setProdutos={setProdutos} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 mt-2 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
          Cadastro de produtos
        </h1>
        <Link href="produtos/novo" 
          className="text-gray-100 mt-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
          Novo produto
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-50">
          <thead className="text-xs text-gray-100 uppercase bg-zinc-900">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Descricao
              </th>
              <th scope="col" className="px-6 py-3">
                Tipo
              </th>
              <th scope="col" className="px-6 py-3">
                Cor
              </th>
              <th scope="col" className="px-6 py-3">
                Preço R$
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaprodutos}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Cadprodutos