"use client";

import { CarrinhoI } from "@/utils/types/carrinhos";
import { FotoI } from "@/utils/types/fotos";

import { OrcamentoI } from "@/utils/types/orcamentos";
import { log } from "console";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Inputs = {
  descricao: string;
  dataSolicitada: Date;
};

export default function Detalhes() {
  const router = useRouter();
  const params = useParams();

  const [carrinho, setCarrinho] = useState<CarrinhoI | null>(null);
  const [telCliente, setTel] = useState("");
  const [nomeCliente, setNome] = useState("");
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDados() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/carrinhos/pesq/${params.carrinho_id}`
      );
      const dados = await response.json();

      // Usa a informação do get do orçamento pra chamar a rota pra pegar o tel do cliente para exibir depois
      const responseTel = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/clientes/${dados.clienteId}`
      );
      const dadosTelefone = await responseTel.json();
      setTel(dadosTelefone.telefone);
      setNome(dadosTelefone.nome)




      setCarrinho(dados);
      setIsLoading(false);
    }
    getDados();
  }, []);


  return (
    <div className="flex flex-col items-center mt-32 bg-gray-300 p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-zinc-900 mb-6">
        Detalhes do Orçamento
      </h1>

      {/* Valor Total */}
      <div className="mb-6 w-full">
        <p className="text-lg font-bold text-zinc-900">Valor Total:</p>
        <p className="text-2xl text-green-600 font-bold">
          R$ {carrinho?.valor}
        </p>
      </div>

      {/* Nome cliente */}
      <div className="mb-6 w-full">
        <p className="text-lg font-bold text-zinc-900">Nome do Cliente:</p>
        <p className="text-xl text-zinc-900">{nomeCliente}</p>
      </div>

      {/* Telefone */}
      <div className="mb-6 w-full">
        <p className="text-lg font-bold text-zinc-900">Telefone:</p>
        <p className="text-xl text-zinc-900">{telCliente}</p>
      </div>

      {/* Produtos */}
      <div className="w-full">
        <p className="text-lg font-bold text-zinc-900 mb-4">Produtos:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carrinho?.produtos.map((itemRel) => (
            <div
              key={itemRel.id}
              className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center text-center"
            >
              {/* Imagem do Produto */}
              <img
                src={itemRel.produto.foto || "/placeholder.png"}
                alt={itemRel.produto.descricao}
                className="w-24 h-24 object-cover mb-4 rounded-lg"
              />
              {/* Nome do Produto */}
              <p className="text-lg font-bold text-zinc-800">
                {itemRel.produto.descricao}
              </p>
              {/* Quantidade */}
              <p className="text-zinc-600 font-semibold">Quantidade: {itemRel.quantidade}</p>
            </div>
          ))}
        </div>
        <div>
          <button
            onClick={() => router.push('/principal/carrinho')}
            className="px-6 py-2 mt-5 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition duration-200"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}