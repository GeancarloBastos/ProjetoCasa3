import { MovelI } from "@/utils/types/movel";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";

type Inputs = {
  termo: string;
  search: string;
  material: string;
  precoMin: number;
  precoMax: number;
  cor: string;
};

type InputPesquisaProps = {
  setMoveis: React.Dispatch<React.SetStateAction<MovelI[]>>;
};

export function InputPesquisa({ setMoveis }: InputPesquisaProps) {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  // async function enviaPesquisa(data: Inputs) {
  //   if (data.termo.length < 2) {
  //     alert("Informe, no mínimo, 2 caracteres para a pesquisa");
  //     return;
  //   }
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_URL_API}/moveis/pesquisa/${data.termo}`
  //   );
  //   const dados = await response.json();
  //   if (dados.length == 0) {
  //     alert(
  //       "Não há informações para a sua pesquisa... Realize uma nova pesquisa."
  //     );
  //     reset({ termo: "" });
  //     return;
  //   }
  //   setMoveis(dados);
  // }

  async function mostraDestaques() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/moveis`);
    const dados = await response.json();
    reset({ termo: "" });
    setMoveis(dados);
  }

  const buscarProdutos = async (data: any) => {
    try {
      // Montando a query string dinamicamente
      const params = new URLSearchParams();
      if (data.material) params.append("tipoMaterial", data.material);
      if (data.cor) params.append("cor", data.cor);
      if (data.precoMin) params.append("precoMin", data.precoMin);
      if (data.precoMax) params.append("precoMax", data.precoMax);
      if (data.search) params.append("search", data.search);

     
      // const response = await axios.get(`/api/catalogo?${params.toString()}`);
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/moveis?${params.toString()}`);
      const dados = await response.json();
      setMoveis(dados);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  return (
    <div className="flex max-w-5xl mx-auto mt-3">
      <form onSubmit={handleSubmit(buscarProdutos)}>
        {/* Dropdown de Categoria */}
        <label htmlFor="material">Material:</label>
        <select id="material" {...register("material")}>
          <option value="">Selecione o material</option>
          <option value="MDF">MDF</option>
          <option value="MDP">MDP</option>
          <option value="MADEIRA">MADEIRA</option>
          {/* Adicione mais opções conforme necessário */}
        </select>

        {/* Dropdown de Cor */}
        <label htmlFor="cor">Cor:</label>
        <select id="cor" {...register("cor")}>
          <option value="">Selecione a cor</option>
          <option value="preto">Preto</option>
          <option value="branco">Branco</option>
          <option value="marrom">Marrom</option>
          {/* Adicione mais opções conforme necessário */}
        </select>

        {/* Inputs de Preço e Barra de Pesquisa */}
        <input
          type="number"
          placeholder="Preço Mínimo"
          {...register("precoMin")}
        />
        <input
          type="number"
          placeholder="Preço Máximo"
          {...register("precoMax")}
        />
        <input type="text" placeholder="Pesquisar..." {...register("search")} />

        {/* Botão para enviar */}
        <button type="submit">Buscar</button>
      </form>

      {/* <form className="flex-1" onSubmit={handleSubmit(buscarProdutos)}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12l5 5L20 7"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Qual os móveis você procura? (modelo, marca, ano ou preço máximo)"
            required
            {...register("termo")}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Buscar
          </button>
        </div>
      </form>

      <button
        type="button"
        className="ms-3 mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
        onClick={mostraDestaques}
      >
        Limpa Filtros
      </button>
      */}
    </div>
  );
}
