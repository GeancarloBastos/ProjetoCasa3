'use client'
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { CorI } from "@/utils/types/cores"
import { TipoI } from "@/utils/types/tipos"
import { useRouter } from "next/navigation"

enum TipoMaterial {
  MADEIRA = "MADEIRA",
  MDF = "MDF",
  MDP = "MDP",
  PEDRA = "PEDRA",
  ESTOFADO = "ESTOFADO",
}

interface Inputs {
  descricao: string
  preco: number
  foto: string
  tipoMaterial: TipoMaterial
  tipoProdutoId: number
  corId: number
}


function NovoProduto() {
  const router = useRouter()

  const [cores, setCores] = useState<CorI[]>([])
  const [tipos, setTipos] = useState<TipoI[]>([])

  const {
    register,
    handleSubmit,
    reset,
    //setFocus
  } = useForm<Inputs>()
  
  useEffect(() => {
    async function getCores() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/cores`)
      const dados = await response.json()
      setCores(dados)
    }
    getCores()
    async function getTipos() {
      const response2 = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tipos`)
      const dados2 = await response2.json()
      setTipos(dados2)
    }
    getTipos()
    // setFocus("")
  }, [])

  const optionsCores = cores.map(cor => (
    <option key={cor.id} value={cor.id}>{cor.nome}</option>
  ))

  const optionsTipos = tipos.map(tipo => (
    <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
  ))

  const materiais = Object.values(TipoMaterial);

  const optionsMaterial = materiais.map(material => (
    <option key={material} value={material}>{material}</option>
  ))

  async function incluirProduto(data: Inputs) {

    const novoProduto: Inputs = {
      descricao: data.descricao,
      corId: Number(data.corId),
      tipoProdutoId: Number(data.tipoProdutoId),
      preco: Number(data.preco),
      foto: data.foto,
      tipoMaterial: data.tipoMaterial
    }

    console.log(novoProduto)

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
        body: JSON.stringify(novoProduto)
      },
    )
    console.log(response)

    if (response.status == 201) {
      toast.success("Ok! Produto cadastrado com sucesso")
      reset()
    } else {
      toast.error("Erro no cadastro do Produto...")
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-center text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl me-56">
        Inclusão de Produtos
      </h1>

      <form
        className="max-w-xl mx-auto shadow-md rounded-lg p-10 bg-zinc-900"
        onSubmit={handleSubmit(incluirProduto)}
      >
        <div className="mb-3">
          <label
            htmlFor="descricao"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Descrição do produto
          </label>
          <input
            type="text"
            id="modelo"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            required
            {...register("descricao")}
          />
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label
              htmlFor="corId"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Cor
            </label>
            <select
              id="corId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              required
              {...register("corId")}
            >
              {optionsCores}
            </select>
          </div>
          <div className="mb-3">
            <label
              htmlFor="tipoProdutoId"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Coleção
            </label>
            <select
              id="tipoProdutoid"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              required
              {...register("tipoProdutoId")}
            >
              {optionsTipos}
            </select>
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label
              htmlFor="preco"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Preço R$
            </label>
            <input
              type="number"
              id="preco"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              required
              {...register("preco")}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="tipoMaterial"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              TipoMaterial
            </label>
            <select
              id="tipoMaterial"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              required
              {...register("tipoMaterial")}
            >
              {optionsMaterial}
            </select>
          </div>
        </div>

        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label
              htmlFor="foto"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              URL da Foto
            </label>
            <input
              type="text"
              id="foto"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              required
              {...register("foto")}
            />
          </div>

        </div>

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Incluir
        </button>
        <button
          type="button"
          onClick={() => router.push('/principal/produtos')}
          className="px-6 py-2 ml-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 transition duration-200"
        >
          Voltar
        </button>
      </form>
    </>
  );
}

export default NovoProduto