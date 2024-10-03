import { MovelI } from "@/utils/types/movel"
import { useForm } from "react-hook-form"
import Link from "next/link"

type Inputs = {
  termo: string
}

type InputPesquisaProps = {
  setMoveis:
  React.Dispatch<React.SetStateAction<MovelI[]>>
}

export function InputPesquisa({ setMoveis }: InputPesquisaProps) {
  const { register, handleSubmit, reset } = useForm<Inputs>()

  async function enviaPesquisa(data: Inputs) {
    if (data.termo.length < 2) {
      alert("Informe, no mínimo, 2 caracteres para a pesquisa")
      return
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/moveis/pesquisa/${data.termo}`)
    const dados = await response.json()
    if (dados.length == 0) {
      alert("Não há informações para a sua pesquisa... Realize uma nova pesquisa.")
      reset({termo: ""})
      return
    }
    setMoveis(dados)
  }

  async function mostraDestaques() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/moveis`)
    const dados = await response.json()
    reset({termo: ""})
    setMoveis(dados)
  }

  return (
    <div className="flex max-w-5xl mx-auto mt-3">

      <form className="flex-1"
        onSubmit={handleSubmit(enviaPesquisa)}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">  
          <path  
            stroke="currentColor"  
            strokeLinecap="round"  
            strokeLinejoin="round"  
            strokeWidth="2"  
            d="M5 12l5 5L20 7"  
          />
        </svg>  
          </div>
          <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Qual os móveis você procura? (modelo, marca, ano ou preço máximo)"
            required
            {...register("termo")} />
          <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Buscar</button>
        </div>
      </form>

      <button type="button" className="ms-3 mt-2 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        onClick={mostraDestaques}>
        Móveis em Destaque
      </button>
    </div>
  )
}