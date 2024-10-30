
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Camera, X } from "lucide-react";

// Interfaces
interface FormInputs {
  // Informações do Ambiente
  ambiente: string;
  metragem: number;
  altura: number;
  largura: number;
  profundidade: number;
  
  // Detalhes do Projeto
  itens: string[];
  cores: string[];
  acabamento: string;
  iluminacao: boolean;
  gavetas: boolean;
  portas: boolean;
  
  // Informações Adicionais
  observacoes: string;
  referencias: FileList;
  plantas: FileList;
  
  // Orçamento
  faixaPreco: string;
  prazo: string;
}

export default function Orcamento() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Dados estáticos
  const ambientes = [
    "Cozinha",
    "Quarto",
    "Sala",
    "Escritório",
    "Banheiro",
    "Lavanderia",
    "Closet",
    "Área Gourmet",
  ];

  const cores = [
    "Branco",
    "Preto",
    "Madeira Clara",
    "Madeira Escura",
    "Cinza",
    "Bege",
    "Azul",
    "Verde",
  ];

  const acabamentos = [
    "Fosco",
    "Brilhante",
    "Acetinado",
    "Texturizado",
    "Alto Brilho",
  ];

  const moveis = [
    { id: 1, nome: "Armários Superiores" },
    { id: 2, nome: "Armários Inferiores" },
    { id: 3, nome: "Bancada" },
    { id: 4, nome: "Ilha" },
    { id: 5, nome: "Prateleiras" },
    { id: 6, nome: "Nichos" },
    { id: 7, nome: "Guarda-roupa" },
    { id: 8, nome: "Cama Planejada" },
    { id: 9, nome: "Mesa" },
    { id: 10, nome: "Painel TV" },
  ];

  const faixasPreco = [
    "Até R$ 5.000",
    "R$ 5.000 - R$ 10.000",
    "R$ 10.000 - R$ 20.000",
    "R$ 20.000 - R$ 30.000",
    "Acima de R$ 30.000"
  ];

  const prazos = [
    "Urgente (até 15 dias)",
    "Curto (15-30 dias)",
    "Médio (30-60 dias)",
    "Longo (60+ dias)",
    "Flexível"
  ];

  // Handlers
  const handleImagePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
      setPreviewImages(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const enviarArquivo = async (arquivo: File) => {
    const formData = new FormData();
    formData.append("file", arquivo);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar o arquivo");
    }

    const data = await response.json();
    return data.url;
  };

  const onSubmit = async (data: FormInputs) => {
    setIsSubmitting(true);
    try {
      const imagensUrls = [];
      
      if (data.referencias) {
        for (let i = 0; i < data.referencias.length; i++) {
          const url = await enviarArquivo(data.referencias[i]);
          imagensUrls.push(url);
        }
      }

      const plantasUrls = [];
      if (data.plantas) {
        for (let i = 0; i < data.plantas.length; i++) {
          const url = await enviarArquivo(data.plantas[i]);
          plantasUrls.push(url);
        }
      }

      const orcamentoData = {
        ...data,
        referencias: imagensUrls,
        plantas: plantasUrls,
        status: "PENDENTE",
        dataCriacao: new Date().toISOString(),
      };

      const response = await fetch("/api/orcamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orcamentoData),
      });

      if (response.ok) {
        alert("Orçamento enviado com sucesso!");
        router.push("/dashboard");
      } else {
        throw new Error("Erro ao enviar orçamento");
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert("Erro ao processar sua solicitação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Solicitar Orçamento</h1>
          <p className="mt-2 text-gray-600">
            Preencha as informações abaixo para recebermos sua solicitação de projeto
          </p>
        </div>

        {/* Informações do Ambiente */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Informações do Ambiente</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Ambiente
              </label>
              <select
                {...register("ambiente", { required: "Selecione o ambiente" })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecione...</option>
                {ambientes.map(amb => (
                  <option key={amb} value={amb}>{amb}</option>
                ))}
              </select>
              {errors.ambiente && (
                <p className="mt-1 text-sm text-red-600">{errors.ambiente.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Metragem (m²)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("metragem", { 
                  required: "Informe a metragem",
                  min: { value: 1, message: "Metragem mínima de 1m²" }
                })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.metragem && (
                <p className="mt-1 text-sm text-red-600">{errors.metragem.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Altura (m)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("altura", { required: "Informe a altura" })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Largura (m)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("largura", { required: "Informe a largura" })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profundidade (m)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("profundidade", { required: "Informe a profundidade" })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Detalhes do Projeto */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Detalhes do Projeto</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Móveis Desejados
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {moveis.map(movel => (
                  <label key={movel.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register("itens")}
                      value={movel.nome}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{movel.nome}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cores Preferidas
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cores.map(cor => (
                  <label key={cor} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register("cores")}
                      value={cor}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{cor}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Acabamento
              </label>
              <select
                {...register("acabamento")}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecione...</option>
                {acabamentos.map(acab => (
                  <option key={acab} value={acab}>{acab}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register("iluminacao")}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Iluminação LED</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register("gavetas")}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Gavetas</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register("portas")}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Portas</span>
              </label>
            </div>
          </div>
        </div>

        {/* Imagens e Observações */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Imagens e Observações</h2>
          
          <div className="space-y-6">
            {/* Upload de Imagens de Referência */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagens de Referência
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="referencias" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload de imagens</span>
                      <input
                        id="referencias"
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        {...register("referencias")}
                        onChange={handleImagePreview}
                      />
                    </label>
                    <p className="pl-1">ou arraste e solte</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF até 10MB
                  </p>
                </div>
              </div>

              {/* Preview de Imagens */}
              {previewImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="h-24 w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upload de Plantas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plantas ou Desenhos Técnicos
              </label>
              <input
                type="file"
                multiple
                accept=".pdf,.dwg,.dxf,image/*"
                {...register("plantas")}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Aceitos: PDF ou imagens
              </p>
            </div>

            {/* Observações */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações Adicionais
              </label>
              <textarea
                {...register("observacoes")}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Descreva detalhes adicionais, preferências específicas ou outras informações relevantes..."
              />
            </div>
          </div>
        </div>

        {/* Orçamento e Prazo */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Orçamento e Prazo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Faixa de Preço Pretendida
              </label>
              <select
                {...register("faixaPreco")}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecione...</option>
                {faixasPreco.map(faixa => (
                  <option key={faixa} value={faixa}>{faixa}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prazo Desejado
              </label>
              <select
                {...register("prazo")}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecione...</option>
                {prazos.map(prazo => (
                  <option key={prazo} value={prazo}>{prazo}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Botão de Submitar */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              px-6 py-3 bg-blue-600 text-white rounded-md font-medium
              hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200
            `}
          >
            {isSubmitting ? "Enviando..." : "Solicitar Orçamento"}
          </button>
        </div>
      </form>
    </div>
  );
}