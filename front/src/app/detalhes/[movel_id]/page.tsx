"use client"
import { MovelI } from "@/utils/types/movel"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Detalhes() {
  const params = useParams()

  const [movel, setMovel] = useState<MovelI>()

  useEffect(() => {
    async function getDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/moveis/${params.movel_id}`)
      const dados = await response.json()
      console.log(dados)
      setMovel(dados)
    }
    getDados()
  }, [])

  return (
    <section>
      <h1 className="ms-48 mt-10 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
        Detalhes:
        <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">
          {movel?.marca.nome} {movel?.nome}
        </span>
      </h1>

      <div className="flex flex-col mt-10 mx-auto items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img className="object-cover w-full h-64 md:h-64 md:w-64 rounded-t-lg" src={movel?.foto} alt="Imagem do Movel" />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {movel?.marca.nome} - {movel?.nome}
          </p>
          <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {movel?.observacao}
          </p>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Preço R$:
            {Number(movel?.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
          </h5>
        </div>
      </div>

    </section>
  )
}