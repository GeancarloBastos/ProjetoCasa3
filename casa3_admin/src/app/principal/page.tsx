'use client'
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Cookies from "js-cookie";

interface produtosTipoI {
  tipo: string
  num: number
}

interface geralDadosI {
  clientes: number
  produtos: number
  orcamentos: number
}

type DataRow = [string, number, string]

export default function Principal() {
  const [produtosTipo, setProdutosTipo] = useState<produtosTipoI[]>([])
  const [dados, setDados] = useState<geralDadosI>({} as geralDadosI)

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/dashboard/gerais`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: ("Bearer " +
              Cookies.get("admin_logado_token")) as string,
          },
        }
      );
      const dados = await response.json()
      setDados(dados)
    }
    getDadosGerais()

    async function getDadosGrafico() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/dashboard/produtosTipo`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: ("Bearer " +
              Cookies.get("admin_logado_token")) as string,
          },
        }
      );
      const dados = await response.json()
      setProdutosTipo(dados)
    }
    getDadosGrafico()
  }, [])

  const data: (["Tipo", "NºProdutos", { role: string }] | DataRow)[] = [
    ["Tipo", "NºProdutos", { role: "style" }],
  ];
  
  const cores = ["red", "blue", "violet", "green", "gold", "cyan", "chocolate", "purple", "brown", "orangered"]

  produtosTipo.forEach((produto, index) => {
    data.push([produto.tipo, produto.num, cores[index%10]])
  })

  return (
    <div className="container mt-24">
      <h2 className="text-3xl mb-4 font-bold">Visão Geral do Sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-5">
        <div className="border-blue-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-blue-100 text-blue-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-blue-900 dark:text-blue-300">
            {dados.clientes}</span>
          <p className="font-bold mt-2 text-center">Nº Clientes</p>
        </div>
        <div className="border-red-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">
            {dados.produtos}</span>
          <p className="font-bold mt-2 text-center">Nº Produtos</p>
        </div>
        <div className="border-green-600 border rounded p-6 w-1/3">
          <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-green-900 dark:text-green-300">
            {dados.orcamentos}</span>
          <p className="font-bold mt-2 text-center">Nº Orcamentos</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-4">Gráfico: Nº de Produtos por Tipo</h2>
      <Chart chartType="ColumnChart" width="95%" height="380px" data={data} />

    </div>
  )
}