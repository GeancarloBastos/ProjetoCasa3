import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { CarrinhoI } from "@/utils/types/carrinhos";
import Cookies from "js-cookie"; 
import { Trash2 } from 'lucide-react'; // Importar do lucide-react  

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
  // const { register, handleSubmit, reset } = useForm<ProdutoI>();


      function dataDMA(data: string) {
        const ano = data.substring(0, 4);
        const mes = data.substring(5, 7);
        const dia = data.substring(8, 10);
        return dia + "/" + mes + "/" + ano;
      }
      
      

        async function excluirCarrinho() {
          if (confirm(`Confirma a exclusão`)) {
            console.log(`id na esclusao: ${carrinho.id}`)
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_URL_API}/carrinhos/${carrinho.id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-type": "application/json",
                  Authorization: ("Bearer " +
                    Cookies.get("admin_logado_token")) as string,
                },
              }
            );

            if (response.status === 200) {
              const produtos2 = carrinhos.filter((x) => x.id !== carrinho.id);
              setCarrinho(produtos2);
              alert("Produto excluído com sucesso");
            } else {
              alert("Erro... Produto não foi excluído");
            }
          }
        }

  return (
    <tr className="bg-zinc-800 border-b p-10">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-lg text-gray-100 whitespace-nowrap"
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
     
      
      <td className="px-6 py-5">
        <div className="flex gap-3">

          <Link
            href={`/principal/carrinho/detalhes/${carrinho.id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
          <button
            onClick={excluirCarrinho}
            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-100/10 rounded-full transition-all duration-200"
            title="Excluir"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ItemCarrinho;
