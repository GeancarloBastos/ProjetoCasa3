import { Dispatch, SetStateAction, useEffect } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegStar } from "react-icons/fa";
import Cookies from "js-cookie";
import { ProdutoI } from "@/utils/types/produtos";
import { CorI } from "@/utils/types/cores";
import { TipoI } from "@/utils/types/tipos";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface listaProdutoProps {
  produto: ProdutoI;
  produtos: ProdutoI[];
  setProdutos: Dispatch<SetStateAction<ProdutoI[]>>;
}


function ItemCarro({ produto, produtos, setProdutos }: listaProdutoProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const { register, handleSubmit, reset } = useForm<ProdutoI>();
  const [cores, setCores] = useState<CorI[]>([]);
  const [tipos, setTipos] = useState<TipoI[]>([]);

  useEffect(() => {
    async function fetchCores() {
      try {
        const response = await fetch("http://localhost:3004/cores");
        const data = await response.json();
        setCores(data);
      } catch (error) {
        console.error("Erro ao buscar cores:", error);
      }
    }
    async function fetchTipos() {
      try {
        const response = await fetch("http://localhost:3004/tipos");
        const data2 = await response.json();
        setTipos(data2);
      } catch (error) {
        console.error("Erro ao buscar tipos:", error);
      }
    }
    fetchCores();
    fetchTipos();
  }, []);

  async function excluirCarro() {
    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/moveis/${produto.id}`,
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
        const produtos2 = produtos.filter((x) => x.id !== produto.id);
        setProdutos(produtos2);
        alert("Produto excluído com sucesso");
      } else {
        alert("Erro... Produto não foi excluído");
      }
    }
  }

async function alterarProduto(data: ProdutoI) {
  if (!editingId) return;

  const payload = {
    descricao: data.descricao,
    preco: data.preco,
    foto: data.foto,
    tipoProdutoId: data.tipoProdutoId,
    corId: data.corId, 
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/moveis/${produto.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (response.status === 200) {
    const response =  await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/moveis/teste/${produto.id}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  ); 

  const updatedProduto = await response.json()

    
    setProdutos((prevProdutos) => {
      return prevProdutos.map((x) =>
        x.id === produto.id
          ? { ...x, cor: { ...updatedProduto.cor }, ...updatedProduto }
          : x
      );
    });

        reset({
          descricao: updatedProduto.descricao,
          preco: updatedProduto.preco,
          foto: updatedProduto.foto,
          tipoProdutoId: updatedProduto.tipoProdutoId,
          tipoProduto: updatedProduto.tipoProduto.nome,
          corId: updatedProduto.corId,
          cor: updatedProduto.cor.nome 
        });

    setEditingId(null); // Finaliza o modo de edição
  } else {
    console.error("Erro ao atualizar o produto");
  }
}

  return (
    <tr
      key={produto.id}
      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img src={produto.foto} alt="Capa do Produto" style={{ width: 200 }} />
      </th>
      <td className="px-6 py-4 font-extrabold">
        {editingId === produto.id ? (
          <input
            {...register("descricao")}
            defaultValue={produto.descricao}
            className="p-1 border border-gray-300 rounded"
          />
        ) : (
          produto.descricao
        )}
      </td>
      <td className="px-6 py-4 font-extrabold">
        {editingId === produto.id ? (
          <select
            id="tipoProduto"
            {...register("tipoProdutoId")}
            value={produto.tipoProduto.id || ""}
            className="p-1 border border-gray-300 rounded"
          >
            <option value="">Selecione um tipo</option>
            {tipos.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nome}
              </option>
            ))}
          </select>
        ) : (
          produto.tipoProduto.nome
        )}
      </td>
      <td className="px-6 py-4 font-extrabold">
        {editingId === produto.id ? (
          <select
            id="cor"
            {...register("corId")}
            // value={produto.corId || ""}
          
            className="p-1 border border-gray-300 rounded"
          >
            <option value="">Selecione uma cor</option>
            {cores.map((cor) => (
              <option key={cor.id} value={cor.id}>
                {cor.nome}
              </option>
            ))}
          </select>
        ) : (
          produto.cor.nome
        )}
      </td>
      <td className="px-6 py-4 font-extrabold">
        {editingId === produto.id ? (
          <input
            {...register("preco")}
            defaultValue={produto.preco}
            className="p-1 border border-gray-300 rounded"
          />
        ) : (
          Number(produto.preco).toLocaleString("pt-br", {
            minimumFractionDigits: 2,
          })
        )}
      </td>
      <td className="px-6 py-4">
        {editingId === produto.id ? (
          <button
            onClick={handleSubmit(alterarProduto)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Salvar
          </button>
        ) : (
          <>
            <TiDeleteOutline
              className="text-3xl text-red-600 inline-block cursor-pointer"
              title="Excluir"
              onClick={excluirCarro}
            />
            &nbsp;
            <FaRegStar
              className="text-3xl text-yellow-600 inline-block cursor-pointer"
              title="Destacar"
              onClick={() => setEditingId(produto.id)}
            />
          </>
        )}
      </td>
    </tr>
  );
}

export default ItemCarro;
