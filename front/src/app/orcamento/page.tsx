"use client";

import { useForm, UseFormHandleSubmit } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useClienteStore } from "@/context/cliente";
import { useEffect } from "react";

interface FormInputs {
  itens: string[]; // Array de itens selecionados
  observacoes: string; // Campo de observações
  imagem?: FileList; // Campo de imagem (opcional)
}

export default function Orcamento() {
  const { register, handleSubmit, watch } = useForm<FormInputs>();
  const itensSelecionados = watch("itens") || [];
  const router = useRouter();
  const { cliente } = useClienteStore();

  const enviarArquivo = async (arquivo: File) => {
    const formData = new FormData();
    formData.append("file", arquivo);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      headers: {
        // TEM QUE ADICIONAR O AUTHORIZATION BEAR TOKEN AQUI, E ATT CONTEXTO PRA TER O TOKEN
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar o arquivo");
    }

    const data = await response.json();
    return data.url; // Retorna a URL da imagem enviada
  };

  const enviarOrcamento = async (data: FormInputs) => {
    const { observacoes, imagem } = data;
    let urlImagem = "";

    // Verifica se a imagem foi enviada
    if (imagem && imagem.length > 0) {
      try {
        urlImagem = await enviarArquivo(imagem[0]); // Chama a função de upload com a imagem
      } catch (error) {
        alert("Erro ao enviar a imagem");
        return; // Retorna se houver erro no upload
      }
    }

    // Envia os dados do orçamento
    const novoOrcamento = await fetch("/api/orcamentos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clienteId: cliente.id,
        status: "PENDENTE",
        itens: itensSelecionados,
        urlImagem, // Inclui a URL da imagem
        observacoes, // Inclui as observações do orçamento
      }),
    });

    if (novoOrcamento.ok) {
      alert("Orçamento solicitado com sucesso!");
    } else {
      alert("Erro ao solicitar o orçamento.");
    }
  };

    const itens = [
      { id: 1, nome: "geladeira" },
      { id: 2, nome: "balcao" },
      { id: 3, nome: "mesa" },
      { id: 4, nome: "cadeira" },
      { id: 5, nome: "sofa" },
    ];

  return (
    <form
      id="orcamentoForm"
      onSubmit={handleSubmit(enviarOrcamento)}
      className="p-4 border border-gray-300 rounded"
    >
      <h2 className="text-xl font-bold mb-4">Requisição de Orçamento</h2>

      <div className="mb-4">
        <label className="block mb-2">Observações:</label>
        <textarea
          {...register("observacoes", { required: true })} // Registra o campo de observações
          className="w-full p-2 border border-gray-300 rounded"
          //   rows="4"
          placeholder="Descreva sua solicitação..."
        />
      </div>

      <fieldset className="mb-4">
        <legend className="font-semibold mb-2">Selecione as opções:</legend>
        {itens.map((item) => (
          <div key={item.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              {...register("itens")} // Registra o checkbox como um grupo
              value={item.id} // O valor agora é o ID do item
              className="mr-2"
            />
            <label>
              {item.nome.charAt(0).toUpperCase() + item.nome.slice(1)}
            </label>
          </div>
        ))}
      </fieldset>

      <div className="mb-4">
        <label className="block mb-2">Adicionar Imagem:</label>
        <input
          type="file"
          accept="image/*"
          {...register("imagem")} // Registra o campo de imagem, se necessário
          className="border border-gray-300 rounded p-2"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          //   onClick={enviarImagem}
        >
          Adicionar Imagem
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}
