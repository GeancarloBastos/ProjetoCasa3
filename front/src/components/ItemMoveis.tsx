import { MovelI } from "@/utils/types/movel";
import Catalogo from "@/app/catalogo/page";
import Link from "next/link";

export function ItemMoveis({ data }: { data: MovelI }) {

  return (
    <div className="w-96 mt-20 mb-20 bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-900 dark:border-white">
      <div className="w-full aspect-[16/10] overflow-hidden rounded-t-lg">
        <img className="w-full h-full object-cover" src={data.foto} alt={`Imagem do ${data.nome}`} />
      </div>
      <div className="p-6 min-h-[240px] flex flex-col">
        <div className="flex-1">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.nome}
          </h5>
          <p className="mb-3 font-bold text-gray-900 dark:text-white">
            Preço R$ {Number(data.preco).toLocaleString("pt-br",
              { minimumFractionDigits: 2 })}
          </p>
          <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
            {data.destaque}
          </p>
        </div>
        <Link href={`/detalhes/${data.id}`} type="button" className="items-center px-3 py-2 text-xs font-medium text-center text-white bg-green-800 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-700 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Ver detalhes
        </Link>
      </div>
    </div>
  )
}