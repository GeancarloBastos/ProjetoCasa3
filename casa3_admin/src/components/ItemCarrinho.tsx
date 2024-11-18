import { Dispatch, SetStateAction, useEffect } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegStar } from "react-icons/fa";
import Cookies from "js-cookie";
import { ProdutoI } from "@/utils/types/produtos";
import { CorI } from "@/utils/types/cores";
import { TipoI } from "@/utils/types/tipos";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { OrcamentoI } from "@/utils/types/orcamentos";
import Link from "next/link";
import { CarrinhoI } from "@/utils/types/carrinhos";

interface listaCarrinhoProps {
  carrinho: CarrinhoI;
  carrinhos: CarrinhoI[];
  setCarrinho: Dispatch<SetStateAction<CarrinhoI[]>>;
}

function ItemCarrinho({
  carrinho,
  carrinhos,
  setCarrinho,
}: listaCarrinhoProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const { register, handleSubmit, reset } = useForm<ProdutoI>();


      function dataDMA(data: string) {
        const ano = data.substring(0, 4);
        const mes = data.substring(5, 7);
        const dia = data.substring(8, 10);
        return dia + "/" + mes + "/" + ano;
      }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-lg text-gray-900 whitespace-nowrap dark:text-white"
      >
        {carrinho.produtos.map((itemRel) => (
          <div key={itemRel.id} className="mb-1">
            <p>
              <b>{itemRel.produto.descricao}</b> (Qtd: {itemRel.quantidade})
            </p>
          </div>
        ))}
      </th>
      {/* <td className="px-6 py-4">
        {carrinho.produtos.length > 0 ? (
          <img
            src={carrinho.produtos[0].produto.foto}
            className="max-w-32"
            alt="Foto Referencia"
          />
        ) : (
          <span>Sem imagens</span> // Caso não haja imagens
        )}
      </td> */}
      <td className="px-6 py-4">
        <p>
          <b>{carrinho.valor}</b>
        </p>
      </td>

      <td className="px-6 py-4">
        <p>
          <i>Enviado em: {dataDMA(carrinho.createdAt)}</i>
        </p>
      </td>
      <td>
        <Link
          href={`/principal/carrinho/detalhes/${carrinho.id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Detalhes
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </td>
    </tr>
  );
}

export default ItemCarrinho;
