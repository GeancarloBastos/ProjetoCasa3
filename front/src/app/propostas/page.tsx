'use client'
import './page.css'
import { use, useEffect, useState } from "react";
import { useClienteStore } from '@/context/cliente';
import { OrcamentoI } from '@/utils/types/orcamentos';
import { Heading1 } from 'lucide-react';
import Image from 'next/image';
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
    <tr className="bg-white border-b dark:bg-zinc-900 dark:border-gray-700">
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



  const propostasTableCarrinho = carrinhos.map((carrinho) => (
    <tr className="bg-white border-b dark:bg-zinc-900 dark:border-gray-700 hidden md:table-row">
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
      <div className="mt-4 flex gap-4 justify-evenly md:justify-normal">
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
          orçamentos
        </button>
      </div>

      {selecionado === "orcamento" ? (
        <>
          <h1 className="mb-6 mt-4 text-2xl text-center md:text-start font-extrabold leading-none tracking-tight text-zinc-900 md:text-4xl lg:text-5xl">
            Listagem de Orçamentos
          </h1>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-200">
              <thead className="hidden md:table-header-group text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-700 dark:text-gray-50 underline">
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
          </div>

          <div className="md:hidden">
            {orcamentos.map((orcamento) => (
              <div className="border rounded-lg p-4 mb-4 shadow-md bg-zinc-800 text-center mx-4">
                <h3 className="font-bold text-lg text-colorc3offbranco">
                  Itens
                </h3>
                <p className="text-gray-200">
                  {orcamento.itens
                    .map((itemRel) => itemRel.item.nome)
                    .join(", ")}
                </p>
                <h3 className="font-bold text-lg mt-4 text-colorc3offbranco">
                  Foto Referencia
                </h3>
                {orcamento.imagens.length > 0 ? (
                  <img
                    src={orcamento.imagens[0].urlReferencia}
                    className="w-full max-w-xs rounded-md mx-auto"
                    alt="Foto Referencia"
                  />
                ) : (
                  <p>Sem imagens</p>
                )}
                <h3 className="font-bold text-lg mt-4 text-colorc3offbranco">
                  Observações
                </h3>
                <p className="text-gray-200">{orcamento.observacoes}</p>
                <h3 className="font-bold text-lg mt-4 text-colorc3offbranco">
                  Status
                </h3>
                <p className="text-gray-400 font-semibold">{orcamento.status}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="mb-6 mt-4  text-xl text-center md:text-start  font-extrabold leading-none tracking-tight text-zinc-900 md:text-4xl lg:text-5xl">
            Listagem de Requisições Carrinho
          </h1>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-100 dark:text-gray-100 mb-24">
              <thead className="text-xs text-gray-100 uppercase bg-zinc-700 dark:bg-zinc-700 dark:text-gray-200 underline">
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
              <tbody>{propostasTableCarrinho}</tbody>
            </table>
          </div>

          <div className="md:hidden">
            {carrinhos.map((carrinho) => (
              <div className="border rounded-lg p-4 mb-24 shadow-md bg-zinc-900 text-center mx-4">
                <h3 className="font-bold text-lg text-colorc3offbranco">
                  Produtos
                </h3>
                <p className="text-gray-200">
                  {carrinho.produtos
                    .map((itemRel) => itemRel.produto.descricao)
                    .join(", ")}
                </p>
                <h3 className="font-bold text-lg mt-4 text-colorc3offbranco ">
                  Foto Referencia
                </h3>
                {carrinho.produtos.length > 0 ? (
                  <img
                    src={carrinho.produtos[0].produto.foto}
                    className="w-full max-w-xs rounded-md mx-auto"
                    alt="Foto Referencia"
                  />
                ) : (
                  <p>Sem imagens</p>
                )}
                <h3 className="font-bold text-lg mt-4 text-colorc3offbranco">
                  Valor Total
                </h3>
                <p className="text-gray-200">{carrinho.valor}</p>
                <h3 className="font-bold text-lg mt-4 text-colorc3offbranco">
                  Data
                </h3>
                <p className="text-gray-200">{dataDMA(carrinho.createdAt)}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}