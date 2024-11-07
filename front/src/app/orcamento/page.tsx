
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Camera, X } from "lucide-react";
import { useClienteStore } from "@/context/cliente"; 

// Interfaces
interface FormInputs {
  // Informações do Ambiente
  ambiente: string;

  // Detalhes do Projeto
  itens: string[];
  cores: string[];
  acabamento: string;
  adicionais: string[];

  // Informações Adicionais
  observacoes: string;
  referencias: FileList | null;
  plantas: FileList | null;

  // Orçamento
  faixaPreco: string;
  prazo: string;
}

export default function Orcamento() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const { cliente, deslogaCliente } = useClienteStore(); 
 
  const router = useRouter();

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
  { id: 1, nome: "Branco" },
  { id: 2, nome: "Preto" },
  { id: 3, nome: "Madeira Clara" },
  { id: 4, nome: "Madeira Escura" },
  { id: 5, nome: "Cinza" },
  { id: 6, nome: "Bege" },
  { id: 7, nome: "Azul" },
  { id: 8, nome: "Verde" },
];

  const acabamentos = [
    "Fosco",
    "Brilhante",
    "Acetinado",
    "Texturizado",
    "Alto Brilho",
    "Laca",
    "Verniz",
    "Porta Americana",
    "Vidro Reflecta Bronze",
    "Vidro Incolor",
    "Vidro Canelado",
    "Espelho",
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
    { id: 11, nome: "Armários Inferiores Suspensos" },
    { id: 12, nome: "Armários Inferiores com pés de mdf" },
    { id: 13, nome: "Armários Superiores com pés para por granito" },
  ];

  const adicionais = [
    { id: 1, nome: "Puxadores" },
    { id: 2, nome: "Rodapé" },
    { id: 3, nome: "Pedras" },
    { id: 4, nome: "Gavetas" },
    { id: 5, nome: "Portas" },
    { id: 6, nome: "Corrediças" },
    { id: 7, nome: "Dobradiças" },
    { id: 8, nome: "Prateleiras" },
    { id: 9, nome: "Nichos" },
    { id: 10, nome: "Vidros" },
    { id: 11, nome: "Espelhos" },
    { id: 12, nome: "Iluminação" },
    { id: 13, nome: "Vidro Temperado" },
    { id: 14, nome: "Vidro Canelado" },
    { id: 15, nome: "Vidro Incolor" },
    { id: 16, nome: "Vidro Reflecta Bronze" },
    { id: 17, nome: "Divisória" },
    { id: 18, nome: "Porta de Correr" },
    { id: 19, nome: "Porta de Abrir" },
    { id: 20, nome: "Porta de Correr com Espelho" },
    { id: 21, nome: "Porta de Correr com Vidro" },
    { id: 22, nome: "Porta de Correr com Vidro Reflecta Bronze" },
    { id: 23, nome: "Porta de Correr com Vidro Incolor" },
    { id: 24, nome: "Porta de Correr com Vidro Canelado" },
    { id: 25, nome: "Porta de Correr com Vidro Temperado" },
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

  const enviarArquivo = async (arquivo: File | FileList) => {
    const formData = new FormData();
    

        if (arquivo instanceof FileList) {
          // Se for FileList, pega o primeiro arquivo
          formData.append("file", arquivo[0]);
        } else {
          // Se for File individual
          formData.append("file", arquivo);
        }

    formData.forEach((value, key) => {
      console.log(key, value);
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/fotos/upload`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${cliente.token}`,
          // "Content-Type": "multipart/form-data", // Adiciona o tipo de conteúdo, se necessário
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text(); 
      console.error("Erro no upload:", errorMessage); 
      throw new Error("Erro ao enviar o arquivo");
    }

    const data = await response.json();
    return data.url;
  };




  const onSubmit = async (data: FormInputs) => {
    setIsSubmitting(true);
    try {
      
    // let urlReferencia = "";
    // let urlPlanta = "";

    
    // if (data.referencias) {
    //   urlReferencia = await enviarArquivo(data.referencias); 
    // }

    // if (data.plantas) {
    //   urlPlanta = await enviarArquivo(data.plantas); 
    // }
    console.log(data.referencias)
    console.log(data.plantas)
        let urlReferencia = "";
        let urlPlanta = "";

        // Verifica se há arquivos de referência e se há pelo menos um arquivo
        if (data.referencias && data.referencias.length > 0) {
          urlReferencia = await enviarArquivo(data.referencias);
        }

        // Verifica se há plantas e se há pelo menos um arquivo
        if (data.plantas && data.plantas.length > 0) {
          urlPlanta = await enviarArquivo(data.plantas);
        }

   console.log("url da foto planta: " + urlReferencia)
    const orcamentoData = {
      ...data,
      urlReferencia,
      urlPlanta,
      // status: "PENDENTE", Não precisa ele ja tem um default("PENDENTE")
      // dataCriacao: new Date().toISOString(),
      clienteId: cliente.id,
      itens: data.itens.map((item) => parseInt(item, 10)), // Converte para inteiro
      cores: data.cores.map((cor) => parseInt(cor, 10)),
      adicionais: data.adicionais.map((adc) => parseInt(adc, 10)),
    };

    console.log("Tudo do data: " + data)
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/orcamentos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orcamentoData),
        }
      );

      if (response.ok) {
        alert("Orçamento enviado com sucesso!");
        // router.push("/dashboard"); de onde saiu essa rota? n tem dashboard
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Solicitar Orçamento</h1>
          <p className="mt-2 text-gray-600">
            Preencha as informações abaixo para recebermos sua solicitação de projeto 
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Informações do Ambiente</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
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
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Detalhes do Projeto</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Móveis Desejados
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {moveis.map(movel => (
                  <label key={movel.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register("itens")}
                      value={movel.id}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{movel.nome}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cores Preferidas
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cores.map(cor => (
                  <label key={cor.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register("cores")}
                      value={cor.id}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{cor.nome}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
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

            <div className="block text-sm text-gray-700 mb-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Adicionais</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {adicionais.map(adc => (
                <label key={adc.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register("adicionais")}
                      value={adc.id}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{adc.nome}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Imagens e Observações</h2>
          
          <div className="space-y-6">
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
                        accept="image/*"
                        multiple
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plantas ou Desenhos Técnicos
              </label>
              <input
                type="file"
                accept=".pdf,.dwg,.dxf,image/*"
                multiple
                {...register("plantas")}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Aceitos: PDF ou imagens
              </p>
            </div>

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