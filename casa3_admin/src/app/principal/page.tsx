'use client'  
import { useEffect, useState } from "react";  
import Cookies from "js-cookie";  
import { Users, ShoppingBag, FileText, TrendingUp, Package, UserPlus } from 'lucide-react';  
import { useRouter } from "next/navigation";

interface GeralDadosI {  
  clientes: number;  
  produtos: number;  
  orcamentos: number;  
}  

export default function Principal() {  
  const router = useRouter();
  const [dados, setDados] = useState<GeralDadosI>({} as GeralDadosI);  

  useEffect(() => {  
    async function getDadosGerais() {  
      const response = await fetch(  
        `${process.env.NEXT_PUBLIC_URL_API}/dashboard/gerais`,  
        {  
          headers: {  
            "Content-type": "application/json",  
            Authorization: ("Bearer " + Cookies.get("admin_logado_token")) as string,  
          },  
        }  
      );  
      const dados = await response.json();  
      setDados(dados);  
    }  
    getDadosGerais();  
  }, []);  

  return (  
    <div className="p-6 max-w-7xl mx-auto mt-20">  
      {/* Header */}  
      <div className="mb-8">  
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>  
        <p className="text-gray-600">Bem-vindo ao painel de controle da Casa 3.</p>  
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
                <h2 className="text-sm font-medium text-gray-600">Total de Clientes</h2>  
                <p className="text-2xl font-bold text-gray-800">{dados.clientes || 0}</p>  
              </div>  
            </div>  
            <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-0.5 rounded-full">  
              Ativos  
            </span>  
          </div>  
          <div className="flex items-center text-sm text-gray-500">  
            <UserPlus className="h-4 w-4 mr-1" />  
            <span>+12% desde o último mês</span>  
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
                <h2 className="text-sm font-medium text-gray-600">Total de Produtos</h2>  
                <p className="text-2xl font-bold text-gray-800">{dados.produtos || 0}</p>  
              </div>  
            </div>  
            <span className="bg-red-50 text-red-600 text-xs font-medium px-2.5 py-0.5 rounded-full">  
              Cadastrados  
            </span>  
          </div>  
          <div className="flex items-center text-sm text-gray-500">  
            <ShoppingBag className="h-4 w-4 mr-1" />  
            <span>5 produtos adicionados hoje</span>  
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
                <h2 className="text-sm font-medium text-gray-600">Total de Orçamentos</h2>  
                <p className="text-2xl font-bold text-gray-800">{dados.orcamentos || 0}</p>  
              </div>  
            </div>  
            <span className="bg-green-50 text-green-600 text-xs font-medium px-2.5 py-0.5 rounded-full">  
              Em análise  
            </span>  
          </div>  
          <div className="flex items-center text-sm text-gray-500">  
            <TrendingUp className="h-4 w-4 mr-1" />  
            <span>Taxa de conversão: 68%</span>  
          </div>  
        </div>  
      </div>  

      {/* Quick Actions */}  
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">  
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Ações Rápidas</h2>  
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">  
          <button className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">  
            <Users className="h-5 w-5 text-blue-600 mr-2" />  
            <span className="text-blue-600 font-medium">Novo Cliente</span>  
          </button>  
          <button 
            className="flex items-center justify-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            onClick={() => router.push('/principal/produtos/novo')}
          >
            <Package className="h-5 w-5 text-red-600 mr-2" />  
            <span className="text-red-600 font-medium">Novo Produto</span>  
          </button>  
          <button className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">  
            <FileText className="h-5 w-5 text-green-600 mr-2" />  
            <span className="text-green-600 font-medium">Novo Orçamento</span>  
          </button>  
          <button className="flex items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">  
            <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />  
            <span className="text-purple-600 font-medium">Ver Relatórios</span>  
          </button>  
        </div>  
      </div>  
    </div>  
  );  
}