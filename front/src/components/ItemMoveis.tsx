import { useState } from "react";
import { useCarrinho } from "../context/CarrinhoContext";
import { ProdutoI } from "@/utils/types/produtos";

export function ItemMoveis({ data }: { data: ProdutoI }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { adicionarAoCarrinho, totalItens, itens } = useCarrinho();
    console.log("Itens no Carrinho:", totalItens);
    console.log("Itens no Carrinho:", itens);

  const handleAddToCart = () => {
    adicionarAoCarrinho({
      id: data.id,
      // nome: data.nome,
      descricao: data.descricao?.toString() ?? '',
      preco: data.preco,
      foto: data.foto,
      material: data.tipoMaterial,
      // marca: data.marca?.nome,
      // observacao: data.observacao
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-72 md:w-96 mt-20 mb-20 bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-900 dark:border-white">
        <div className="w-full aspect-[16/10] overflow-hidden rounded-t-lg">
          <img className="w-full h-full object-cover" src={data.foto} alt={`Imagem do ${data.descricao}`} />
        </div>
        <div className="p-6 min-h-[240px] flex flex-col">
          <div className="flex-1">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {data.descricao}
            </h5>
            <p className="mb-3 font-bold text-gray-900 dark:text-white">
              Preço R$ {Number(data.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
            </p>
            <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
              {data.tipoProduto.nome}
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="items-center px-3 py-2 text-xs font-medium text-center text-white bg-green-800 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-700 dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            Ver detalhes
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 p-8 rounded-lg  max-w-2xl w-full mx-4 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <img src={data.foto} alt={data.descricao} className="w-full h-auto rounded-lg" />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">{data.descricao}</h2>
                <p className="text-lg font-bold mb-4 text-green-600 dark:text-green-400">
                  R$ {Number(data.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
                </p>
                {data.tipoProdutoId && (
                  <p className="mb-2 text-gray-600 dark:text-gray-300">
                    Coleção: {data.tipoProduto.nome}
                  </p>
                )}
                {data.tipoMaterial && (
                  <p className="mb-2 text-gray-600 dark:text-gray-300">
                    Material: {data.tipoMaterial}
                  </p>
                )}
                {data.descricao && (
                  <p className="mb-4 text-gray-600 dark:text-gray-300">{data.descricao}</p>
                )}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}