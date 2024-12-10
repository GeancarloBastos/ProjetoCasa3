"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Users,
  ShoppingBag,
  FileText,
  TrendingUp,
  Package,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Chart } from "react-google-charts";

interface GeralDadosI {
  clientes: number;
  produtos: number;
  orcamentos: number;
}

interface CarrinhoData {
  // totalClientes: number;
  // orcamentosPorStatus: { status: string; count: number }[];
  // produtosPorTipo: { nome: string; count: number }[];
  createdAt: string;
  _sum: { valor: number };
}

interface ProdutoData {
  nome: string;
  createdAt: string;
  _count: { produtos: number };
}

export default function Principal() {
  const router = useRouter();
  const [dados, setDados] = useState<GeralDadosI>({} as GeralDadosI);
  const [carrinhos, setCarrinhos] = useState<CarrinhoData[] | null>(null);
  const [produtos, setProdutos] = useState<ProdutoData[] | null>(null);
  const handleRedirect = (route: string) => {  
    window.location.href = `http://localhost:3000${route}`;  
  }; 
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
      const dados = await response.json();
      setDados(dados);
    }

    getDadosGerais();

    async function getDadosDashboard() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/dashboard/carrinhosMensal`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: ("Bearer " +
              Cookies.get("admin_logado_token")) as string,
          },
        }
      );

      const response2 = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/dashboard/produtosTipo`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: ("Bearer " +
              Cookies.get("admin_logado_token")) as string,
          },
        }
      );

      const dadosCarrinhos = await response.json();
      const dadosProdutos = await response2.json();
      setCarrinhos(dadosCarrinhos);
      setProdutos(dadosProdutos)
    }

    getDadosDashboard();

  }, []);

  if (!carrinhos || !produtos) {
    return <p>Carregando...</p>;
  }

  const carrinhosChart2 = [
    ["Mês", "Valor Total"],
    ...carrinhos.map((item) => [
      new Date(item.createdAt).toLocaleDateString("pt-br", {
        month: "long",
        year: "numeric",
      }),
      Number(item._sum.valor),
    ]),
  ];

  const produtosChartData = [
    ["Tipo de Produto", "Quantidade"],
    ...produtos.map((item) => [item.nome, Number(item._count.produtos)]),
  ];

  console.log(produtosChartData);
  return (
    <div className="p-6 max-w-7xl mx-auto mt-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Bem-vindo ao painel de controle da Casa 3.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Clientes Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-600">
                  Total de Clientes
                </h2>
                <p className="text-2xl font-bold text-gray-800">
                  {dados.clientes}
                </p>
              </div>
            </div>
            <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Cadastrados
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <UserPlus className="h-4 w-4 mr-1" />
            <span>Clientes</span>
          </div>
        </div>

        {/* Produtos Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <Package className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-600">
                  Total de Produtos
                </h2>
                <p className="text-2xl font-bold text-gray-800">
                  {dados.produtos}
                </p>
              </div>
            </div>
            <span className="bg-red-50 text-red-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Cadastrados
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <ShoppingBag className="h-4 w-4 mr-1" />
            <span>Produtos</span>
          </div>
        </div>

        {/* Orçamentos Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-600">
                  Total de Orçamentos
                </h2>
                <p className="text-2xl font-bold text-gray-800">
                  {dados.orcamentos}
                </p>
              </div>
            </div>
            <span className="bg-green-50 text-green-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Em análise
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>Orçamentos</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Ações Rápidas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
          className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          onClick={() => handleRedirect('/cadastro')}
          >
            <Users className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-blue-600 font-medium">Novo Cliente</span>
          </button>
          <button
            className="flex items-center justify-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            onClick={() => router.push("/principal/produtos/novo")}
          >
            <Package className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-600 font-medium">Novo Produto</span>
          </button>
          <button
           className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
           onClick={() => handleRedirect('/orcamento')}>
            <FileText className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-600 font-medium">Novo Orçamento</span>
          </button>
          <button
           className="flex items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
           onClick={() => router.push("/principal/orcamentos")}
           >
            <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
            <span className="text-purple-600 font-medium">Ver Orçamentos</span>
          </button>
        </div>
      </div>
      <Chart
        chartType="LineChart"
        data={carrinhosChart2}
        options={{
          title: "Valor Total dos Carrinhos por Mês",
          hAxis: {
            title: "Mês",
            format: "MMM yyyy", // Formata o eixo X como mês e ano
          },
          vAxis: { title: "Valor Total (R$)" },
          legend: { position: "bottom" }, // Legenda na parte inferior
          series: {
            0: { color: "green" }, // Defina a cor da linha
          },
        }}
        width="100%"
        height="400px"
      />

      <Chart
        chartType="BarChart"
        data={produtosChartData}
        options={{
          title: "Produtos por Tipo",
          colors: ["#1c241c", "#343c34", "#404d43"],
        }}
        width="100%"
        height="400px"
      />
    </div>
  );
}
