'use client';  
import { useCarrinho } from '@/context/CarrinhoContext';  
import { ShoppingCart, ArrowLeft } from 'lucide-react';  
import Link from 'next/link';  

export default function CarrinhoPage() {  
  const {   
    itens,   
    removerDoCarrinho,   
    atualizarQuantidade,  
    valorTotal,
    totalItens   
  } = useCarrinho();

  return (  
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">  
      <div className="max-w-7xl mx-auto px-4 py-8">  
        {/* Header */}  
        <div className="flex items-center justify-between mb-8">  
          <Link   
            href="/"  
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"  
          >  
            <ArrowLeft className="w-5 h-5 mr-2" />  
            Voltar para o Catálogo 
          </Link>  
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">  
            Carrinho de Compras  
          </h1>  
        </div>  

        {/* Conteúdo do Carrinho */}  
        {totalItens === 0 ? (  
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-8">  
            <div className="flex flex-col items-center justify-center text-center">  
              <ShoppingCart size={64} className="text-gray-400 dark:text-gray-500 mb-4" />  
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">  
                Seu carrinho está vazio  
              </h2>  
              <p className="text-gray-500 dark:text-gray-400 mb-6">  
                Adicione alguns produtos para começar suas compras  
              </p>  
              <Link  
                href="/"  
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"  
              >  
                Continuar Comprando  
              </Link>  
            </div>  
          </div>  
        ) : (  
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">  
            {/* Lista de Produtos */}  
            <div className="lg:col-span-2 space-y-4">  
              {itens.map((item) => (  
                <div   
                  key={item.id}  
                  className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 flex items-center gap-4"  
                >  
                  <img  
                    src={item.foto}  
                    alt={item.nome}  
                    className="w-24 h-24 object-cover rounded-md"  
                  />  
                  
                  <div className="flex-1">  
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">  
                      {item.nome}  
                    </h3>  
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">  
                      {item.marca}
                    </p>  
                    <div className="flex items-center justify-between">  
                      <p className="text-green-600 dark:text-green-400 font-semibold">  
                        R$ {item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}  
                      </p>  
                      <div className="flex items-center gap-3">  
                        <button  
                          onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}  
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400"  
                        >  
                          -  
                        </button>  
                        <span className="w-8 text-center font-medium text-gray-900 dark:text-white">  
                          {item.quantidade}  
                        </span>  
                        <button  
                          onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}  
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400"  
                        >  
                          +  
                        </button>  
                        <button  
                          onClick={() => removerDoCarrinho(item.id)}  
                          className="ml-4 text-red-500 hover:text-red-700 text-sm"  
                        >  
                          Remover  
                        </button>  
                      </div>  
                    </div>  
                  </div>  
                </div>  
              ))}  
            </div>  

            {/* Resumo do Pedido */}  
            <div className="lg:col-span-1">  
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-6 sticky top-4">  
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">  
                  Resumo do Pedido  
                </h2>  
                <div className="space-y-3">  
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">  
                    <span>Subtotal ({totalItens} itens)</span>  
                    <span>R$ {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>  
                  </div>  
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">  
                    <span>Frete</span>  
                    <span className="text-green-600 dark:text-green-400">Grátis</span>  
                  </div>  
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">  
                    <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">  
                      <span>Total</span>  
                      <span>R$ {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>  
                    </div>  
                  </div>  
                </div>  
                <button   
                  className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"  
                  onClick={() => alert('Função de finalizar compra será implementada!')}  
                >  
                  Finalizar Compra  
                </button>  
              </div>  
            </div>  
          </div>  
        )}  
      </div>  
    </div>  
  );  
}