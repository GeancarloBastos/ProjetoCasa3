import { MovelI } from "@/utils/types/movel";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { TipoI } from "@/utils/types/tipos";
import { CorI } from "@/utils/types/cores";

type Inputs = {
  search: string;
  colecao: number;
  precoMin: number;
  precoMax: number;
  cor: number;
};

type InputPesquisaProps = {
  setMoveis: React.Dispatch<React.SetStateAction<MovelI[]>>;
};

export function InputPesquisa({ setMoveis }: InputPesquisaProps) {
  const { register, handleSubmit, reset } = useForm<Inputs>();
   const [cores, setCores] = useState<CorI[]>([]); 
   const [tipos, setTipos] = useState<TipoI[]>([]);
   const [isMenuOpen, setIsMenuOpen] = useState(false) 

  async function mostraDestaques() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos`);
    const dados = await response.json();
    reset({ search: "", colecao: 0, precoMin: 0, precoMax: 0, cor: 0 });
    setMoveis(dados);
  }

  function capitalizar(palavra:string) {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1);
  }

  const buscarProdutos = async (data: any) => {
    try {
      const params = new URLSearchParams();
      if (data.colecao) params.append("tipoProdutoId", data.colecao);
      if (data.cor) params.append("cor", data.cor);
      if (data.precoMin) params.append("precoMin", data.precoMin);
      if (data.precoMax) params.append("precoMax", data.precoMax);
      if (data.search) params.append("search", data.search);

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos?${params.toString()}`);
      const dados = await response.json();
      setMoveis(dados);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

    useEffect(() => {
      async function fetchCores() {
        try {
          const response = await fetch("http://localhost:3004/cores"); // Use o URL correto para a API
          const data = await response.json();
          setCores(data);
        } catch (error) {
          console.error("Erro ao buscar cores:", error);
        }
        try {
          const response2 = await fetch("http://localhost:3004/tipos"); // Use o URL correto para a API
          const data2 = await response2.json();
          setTipos(data2);
        } catch (error) {
          console.error("Erro ao buscar cores:", error);
        }
      }

      fetchCores();
    }, []);

  return (
    <div>
      <div className="hidden md:block bg-gray-100 p-6 rounded-lg shadow-md max-w-5xl mx-auto mt-8">
        <form onSubmit={handleSubmit(buscarProdutos)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label
                htmlFor="colecao"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Coleção:
              </label>
              <select
                id="colecao"
                {...register("colecao")}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Selecione a coleção</option>
                {tipos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {capitalizar(tipo.nome)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="cor"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cor:
              </label>
              <select
                id="cor"
                {...register("cor")}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Selecione uma cor</option>
                {cores.map((cor) => (
                  <option key={cor.id} value={cor.id}>
                    {cor.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="precoMin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Preço Mínimo:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  R$
                </span>
                <input
                  type="number"
                  id="precoMin"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  {...register("precoMin")}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  onWheel={(e) => e.currentTarget.blur()} // Previne mudança de valor com scroll do mouse
                  onChange={(e) => {
                    // Formata o número para ter sempre 2 casas decimais
                    const value = e.target.value;
                    if (value) {
                      e.target.value = parseFloat(value).toFixed(2);
                    }
                  }}
                />
              </div>
              <span className="text-xs text-gray-500 mt-1">
                Digite o valor sem pontos ou vírgulas
              </span>
            </div>

            <div>
              <label
                htmlFor="precoMax"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Preço Máximo:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  R$
                </span>
                <input
                  type="number"
                  id="precoMax"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  {...register("precoMax")}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  onWheel={(e) => e.currentTarget.blur()} // Previne mudança de valor com scroll do mouse
                  onChange={(e) => {
                    // Formata o número para ter sempre 2 casas decimais
                    const value = e.target.value;
                    if (value) {
                      e.target.value = parseFloat(value).toFixed(2);
                    }
                  }}
                />
              </div>
              <span className="text-xs text-gray-500 mt-1">
                Digite o valor sem pontos ou vírgulas
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row items-center space-x-4">
            <input
              type="text"
              placeholder="Pesquisar..."
              {...register("search")}
              className="flex-grow w-full md:w-auto p-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              Buscar
            </button>
            <button
              type="button"
              onClick={mostraDestaques}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Limpar Filtros
            </button>
          </div>
        </form>
      </div>

      <div className="-mr-2 flex md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className=" mx-auto inline-flex items-center justify-center  gap-4 text-sm  p-2 rounded-md  bg-zinc-900 text-colorc3offbranco hover:text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white"
        >
          {!isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="block h-6 w-6 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="block h-6 w-6 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
              />
            </svg>
          )}
          Filtros
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-100 p-6 rounded-lg shadow-md max-w-5xl mx-auto mt-8">
          <form onSubmit={handleSubmit(buscarProdutos)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="colecao"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Coleção:
                </label>
                <select
                  id="colecao"
                  {...register("colecao")}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecione a coleção</option>
                  {tipos.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {capitalizar(tipo.nome)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="cor"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Cor:
                </label>
                <select
                  id="cor"
                  {...register("cor")}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecione uma cor</option>
                  {cores.map((cor) => (
                    <option key={cor.id} value={cor.id}>
                      {cor.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="precoMin"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Preço Mínimo:
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    R$
                  </span>
                  <input
                    type="number"
                    id="precoMin"
                    step="0.01"
                    min="0"
                    placeholder="0,00"
                    {...register("precoMin")}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    onWheel={(e) => e.currentTarget.blur()} // Previne mudança de valor com scroll do mouse
                    onChange={(e) => {
                      // Formata o número para ter sempre 2 casas decimais
                      const value = e.target.value;
                      if (value) {
                        e.target.value = parseFloat(value).toFixed(2);
                      }
                    }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  Digite o valor sem pontos ou vírgulas
                </span>
              </div>

              <div>
                <label
                  htmlFor="precoMax"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Preço Máximo:
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    R$
                  </span>
                  <input
                    type="number"
                    id="precoMax"
                    step="0.01"
                    min="0"
                    placeholder="0,00"
                    {...register("precoMax")}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    onWheel={(e) => e.currentTarget.blur()} // Previne mudança de valor com scroll do mouse
                    onChange={(e) => {
                      // Formata o número para ter sempre 2 casas decimais
                      const value = e.target.value;
                      if (value) {
                        e.target.value = parseFloat(value).toFixed(2);
                      }
                    }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  Digite o valor sem pontos ou vírgulas
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row items-center space-x-4">
              <input
                type="text"
                placeholder="Pesquisar..."
                {...register("search")}
                className="flex-grow w-full md:w-auto p-2 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
              >
                Buscar
              </button>
              <button
                type="button"
                onClick={mostraDestaques}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Limpar Filtros
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}