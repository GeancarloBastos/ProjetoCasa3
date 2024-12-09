"use client";



import { OrcamentoI } from "@/utils/types/orcamentos";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";



import { useRouter } from "next/navigation";




export default function Detalhes() {
  const params = useParams();
  
  const [orcamento, setOrcamento] = useState<OrcamentoI | null>(null);
  const [statusAtual, setStatus] = useState("");
  const [telCliente, setTel] = useState("");
  const [nomeCliente, setNome] = useState("")
  // const { register, handleSubmit, reset } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getDados() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/orcamentos/pesq/${params.orcamento_id}`
      );
      const dados = await response.json();

      // Usa a informação do get do orçamento pra chamar a rota pra pegar o tel do cliente para exibir depois
      const responseTel = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/clientes/${dados[0].clienteId}`
      );
      const dadosTelefone = await responseTel.json();
      setTel(dadosTelefone.telefone);
      setNome(dadosTelefone.nome)

      


      setOrcamento(dados[0]);
      setStatus(dados[0].status);
      setIsLoading(false);
    }
    getDados();
  }, []);

  async function alterarStatus() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/orcamentos/status/${params.orcamento_id}`
    );
    const updatedStatus = await response.json();

    setStatus(updatedStatus.status);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center mt-32">Carregando...</div>
    );
  }

  if (!orcamento) {
    return (
      <div className="flex flex-col items-center mt-32">
        Dados não encontrados.
      </div>
    );
  }

  
  return (
    <div className="flex flex-col items-center mt-32 bg-zinc-300 p-20 rounded-xl shadow-lg max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-zinc-900 mb-6">
        Detalhes do Orçamento
      </h1>

      {/* Prazo */}
      <div className="mb-4 w-full">
        <p className="text-lg font-bold text-zinc-900">Prazo:</p>
        <p className="text-xl text-zinc-900">{orcamento.prazo}</p>
      </div>

      {/* NOME CLIENTE */}
      <div className="mb-4 w-full">
        <p className="text-lg font-bold text-zinc-900">Nome do Cliente:</p>
        <p className="text-xl text-zinc-900">{nomeCliente}</p>
      </div>

      {/* TELEFONE */}
      <div className="mb-4 w-full">
        <p className="text-lg font-bold text-zinc-900">Telefone:</p>
        <p className="text-xl text-zinc-900">{telCliente}</p>
      </div>

      {/* ACABAMENTO */}
      <div className="mb-4 w-full">
        <p className="text-lg font-bold text-zinc-900">Acabamento:</p>
        <p className="text-xl text-zinc-900">{orcamento.acabamento}</p>
      </div>

      {/* FAIXA PREÇO */}
      <div className="mb-4 w-full">
        <p className="text-lg font-bold text-zinc-900">Faixa preço:</p>
        <p className="text-xl text-zinc-900">{orcamento.faixaPreco}</p>
      </div>

      {/* OBSERVAÇÕES */}
      <div className="mb-4 w-full">
        <p className="text-lg font-bold text-zinc-900">Observações:</p>
        <p className="text-xl text-zinc-900">{orcamento.observacoes}</p>
      </div>

      {/* AMBIENTE */}
      <div className="mb-4 w-full">
        <p className="text-lg font-bold text-zinc-900">Ambiente:</p>
        <p className="text-xl text-zinc-900">{orcamento.ambiente}</p>
      </div>

      {/* Itens */}
      <div className="mb-4 w-full">
        <p className="text-lg font-bold text-zinc-900">Itens:</p>
        <p className="text-xl text-zinc-900">
          {orcamento.itens.map((itemRel) => itemRel.item.nome).join(", ")}
        </p>
      </div>

      {/* Adicionais */}
      <div className="mb-4 w-full">
        <p className="text-lg font-bold text-zinc-900">Adicionais:</p>
        <p className="text-xl text-zinc-900">
          {orcamento.adicionais
            .map((itemRel) => itemRel.adicional.nome)
            .join(", ")}
        </p>
      </div>

      {/* Cores */}
      <div className="mb-4 w-full">
        <p className="text-lg font-bold text-zinc-900">Cores:</p>
        <p className="text-xl text-zinc-900">
          {orcamento.cores.map((itemRel) => itemRel.cor.nome).join(", ")}
        </p>
      </div>

      {/* Imagens */}
      <div className="mb-4 w-full">
        {/* Imagem de referência */}
        {orcamento.imagens[0].urlReferencia ? (
          <div className="mb-4">
            <p className="text-lg font-bold text-zinc-900">
              Imagem de Referência:
            </p>
            <img
              src={orcamento.imagens[0].urlReferencia}
              className="max-w-sm rounded-lg shadow-md"
              alt="Foto Referencia"
            />
          </div>
        ) : (
          <p className="text-lg text-zinc-900">Sem imagem de referência</p>
        )}

        {/* Imagem de planta */}
        {orcamento.imagens[0].urlPlanta ? (
          <div className="mb-4">
            <p className="text-lg font-bold text-zinc-900">
              Imagem de Planta:
            </p>
            <img
              src={orcamento.imagens[0].urlPlanta}
              className="max-w-sm rounded-lg shadow-md"
              alt="Foto Planta"
            />
          </div>
        ) : (
          <p className="text-lg text-zinc-900">Sem imagem de Planta</p>
        )}
      </div>

      {/* Botão de mudança de status */}
      <div className="mt-6 gap-4 flex items-center">
        {statusAtual}
        <button
          onClick={alterarStatus}
          className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-900 transition duration-200"
        >
          Trocar Status
        </button>
        <button
          onClick={() => router.push('/principal/orcamentos')}
          className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition duration-200"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
