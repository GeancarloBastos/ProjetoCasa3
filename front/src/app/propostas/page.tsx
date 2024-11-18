'use client'
import './page.css'
import { use, useEffect, useState } from "react";
import { useClienteStore } from '@/context/cliente';
import { OrcamentoI } from '@/utils/types/orcamentos';
import { Heading1 } from 'lucide-react';
import { CarrinhoI } from '@/utils/types/carrinhos';


export default function Propostas() {
  const [orcamentos, setOrcamentos] = useState<OrcamentoI[]>([])
  const [carrinhos, setCarrinhos] = useState<CarrinhoI[]>([])
  const { cliente } = useClienteStore()
  const [selecionado, setSelecionado] = useState("orcamento");


  useEffect(() => {
    async function buscaDados() {
      console.log(cliente.id)
      console.log(
        `${process.env.NEXT_PUBLIC_URL_API}/orcamentos/${cliente.id}`
      );
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/orcamentos/${cliente.id}`)
      const dados = await response.json()
      
      setOrcamentos(dados)
    }
    buscaDados()

    async function buscaDados2() {
            console.log(
              `${process.env.NEXT_PUBLIC_URL_API}/carrinhos/${cliente.id}`
            );
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/carrinhos/${cliente.id}`)
      const dados = await response.json()
      
      setCarrinhos(dados)
    }
    buscaDados2()
    console.log(carrinhos)
  }, [])

  // para retornar apenas a data do campo no banco de dados
  // 2024-10-10T22:46:27.227Z => 10/10/2024
  function dataDMA(data: string) {
    const ano = data.substring(0, 4)
    const mes = data.substring(5, 7)
    const dia = data.substring(8, 10)
    return dia + "/" + mes + "/" + ano
  }



  const propostasTable = orcamentos.map((orcamento) => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {orcamento.itens.map((itemRel) => itemRel.item.nome).join(", ")}
      </th>
      <td className="px-6 py-4">
        {orcamento.imagens.length > 0 ? (
          <img
            src={orcamento.imagens[0].urlReferencia}
            className="fotoReferencia"
            alt="Foto Referencia"
          />
        ) : (
          <span>Sem imagens</span> // Caso não haja imagens
        )}
      </td>
      <td className="px-6 py-4">
        <p>
          <b>{orcamento.observacoes}</b>
        </p>
        <p>
          <i>Enviado em: {dataDMA(orcamento.createdAt)}</i>
        </p>
      </td>
      <td className="px-6 py-4">
        {orcamento.status}
      </td>
    </tr>
  ));

  const propostasTable2 = carrinhos.map((carrinho) => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {carrinho.produtos
          .map((itemRel) => itemRel.produto.descricao)
          .join(", ")}
      </th>
      <td className="px-6 py-4">
        {carrinho.produtos.length > 0 ? (
          <img
            src={carrinho.produtos[0].produto.foto}
            className="fotoReferencia"
            alt="Foto Referencia"
          />
        ) : (
          <span>Sem imagens</span> // Caso não haja imagens
        )}
      </td>
      <td className="px-6 py-4">
        <p>
          <b>{carrinho.valor}</b>
        </p>
      </td>

      <td className="px-6 py-4">
        <p>
          <i>Enviado em: {dataDMA(carrinho.createdAt)}</i>
        </p>
      </td>
    </tr>
  ));

  return (
    <section className="max-w-7xl mx-auto">
      <div className="mt-4 flex gap-4">
        <button
          type="button"
          className="bg-colorc3verde hover:bg-green-800 text-white px-3 py-2 rounded-md text-sm font-medium uppercase"
          onClick={() => setSelecionado("carrinho")}
        >
          carrinho
        </button>
        <button
          type="button"
          className="bg-colorc3verde hover:bg-green-800 text-white px-3 py-2 rounded-md text-sm font-medium uppercase"
          onClick={() => setSelecionado("orcamento")}
        >
          orcamentos
        </button>
      </div>

      {selecionado === "orcamento" ? (
        <>
          <h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-zinc-900 md:text-4xl lg:text-5xl underline underline-offset-8">
            Listagem de Orçamentos
          </h1>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Itens
                </th>
                <th scope="col" className="px-6 py-3">
                  Foto Referencia
                </th>
                <th scope="col" className="px-6 py-3">
                  Observações
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>{propostasTable}</tbody>
          </table>
        </>
      ) : (
        <>
          <h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-zinc-900 md:text-4xl lg:text-5xl underline underline-offset-8">
            Listagem de Requisições Carrinho
          </h1>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Produtos
                </th>
                <th scope="col" className="px-6 py-3">
                  Foto Referencia
                </th>
                <th scope="col" className="px-6 py-3">
                  Valor Total
                </th>
                <th scope="col" className="px-6 py-3">
                  Data
                </th>
              </tr>
            </thead>
            <tbody>{propostasTable2}</tbody>
          </table>
        </>
      )}
    </section>
  );
}