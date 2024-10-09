import { MovelI } from "@/utils/types/movel";
import Catalogo from "@/app/catalogo/page";
import Link from "next/link";

export function ItemMoveis({data}: {data: MovelI}) {
  return (
    <div className=" mt-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-colorc3 dark:border-colorc3rosapastel">
      <img className="rounded-t-lg" src={data.foto} alt={`Imagem do ${data.nome}`} />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.nome}
        </h5>
        <p className="mb-3 font-bold text-gray-900 dark:text-white">
          Preço R$ {Number(data.preco).toLocaleString("pt-br", 
                                  {minimumFractionDigits: 2})}
        </p>
        <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
          {data.destaque}
        </p>
        <Link href={`/detalhes/${data.id}`} type="button" className="items-center px-3 py-2 text-xs font-medium text-center text-white bg-green-800 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-700 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Ver detalhes
        </Link>
      </div>
    </div>
  )
}