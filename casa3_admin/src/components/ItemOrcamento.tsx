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

interface listaOrcamentoProps {
  orcamento: OrcamentoI;
  orcamentos: OrcamentoI[];
  setOrcamento: Dispatch<SetStateAction<OrcamentoI[]>>;
}

function ItemCarro({
  orcamento,
  orcamentos,
  setOrcamento,
}: listaOrcamentoProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const { register, handleSubmit, reset } = useForm<ProdutoI>();
  // const [cores, setCores] = useState<CorI[]>([]);
  // const [tipos, setTipos] = useState<TipoI[]>([]);

  // useEffect(() => {
  //   async function fetchCores() {
  //     try {
  //       const response = await fetch("http://localhost:3004/cores");
  //       const data = await response.json();
  //       setCores(data);
  //     } catch (error) {
  //       console.error("Erro ao buscar cores:", error);
  //     }
  //   }
  //   async function fetchTipos() {
  //     try {
  //       const response = await fetch("http://localhost:3004/tipos");
  //       const data2 = await response.json();
  //       setTipos(data2);
  //     } catch (error) {
  //       console.error("Erro ao buscar tipos:", error);
  //     }
  //   }
  //   fetchCores();
  //   fetchTipos();
  // }, []);

  //   async function excluirCarro() {
  //     if (confirm(`Confirma a exclusão`)) {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_URL_API}/moveis/${produto.id}`,
  //         {
  //           method: "DELETE",
  //           headers: {
  //             "Content-type": "application/json",
  //             Authorization: ("Bearer " +
  //               Cookies.get("admin_logado_token")) as string,
  //           },
  //         }
  //       );

  //       if (response.status === 200) {
  //         const produtos2 = produtos.filter((x) => x.id !== produto.id);
  //         setProdutos(produtos2);
  //         alert("Produto excluído com sucesso");
  //       } else {
  //         alert("Erro... Produto não foi excluído");
  //       }
  //     }
  //   }

  //   async function alterarProduto(data: ProdutoI) {
  //     if (!editingId) return;

  //     const payload = {
  //       descricao: data.descricao,
  //       preco: data.preco,
  //       foto: data.foto,
  //       tipoProdutoId: data.tipoProdutoId,
  //       corId: data.corId,
  //     };

  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_URL_API}/moveis/${produto.id}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     if (response.status === 200) {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_URL_API}/moveis/teste/${produto.id}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-type": "application/json",
  //           },
  //         }
  //       );

  //       const updatedProduto = await response.json();

  //       setProdutos((prevProdutos) => {
  //         return prevProdutos.map((x) =>
  //           x.id === produto.id
  //             ? { ...x, cor: { ...updatedProduto.cor }, ...updatedProduto }
  //             : x
  //         );
  //       });

  //       reset({
  //         descricao: updatedProduto.descricao,
  //         preco: updatedProduto.preco,
  //         foto: updatedProduto.foto,
  //         tipoProdutoId: updatedProduto.tipoProdutoId,
  //         tipoProduto: updatedProduto.tipoProduto.nome,
  //         corId: updatedProduto.corId,
  //         cor: updatedProduto.cor.nome,
  //       });

  //       setEditingId(null); // Finaliza o modo de edição
  //     } else {
  //       console.error("Erro ao atualizar o produto");
  //     }
  //   }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {orcamento.imagens.length > 0 ? (
          <img
            src={orcamento.imagens[0].urlReferencia}
            className="max-w-32"
            alt="Foto Referencia"
          />
        ) : (
          <span>Sem imagens</span> // Caso não haja imagens
        )}
      </th>
      <td className="px-6 py-4">{orcamento.prazo}</td>
      <td className="px-6 py-4">
        <p>
          <b>{orcamento.faixaPreco}</b>
        </p>
      </td>
      <td className="px-6 py-4">{orcamento.status}</td>
      <td>
        <Link
            href={`/principal/orcamentos/detalhes/${orcamento.id}`}
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

export default ItemCarro;
