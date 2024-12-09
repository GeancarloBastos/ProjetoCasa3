import { Dispatch, SetStateAction, useEffect } from "react";  
import { Pencil, Trash2, Save } from 'lucide-react'; // Importar do lucide-react  
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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/cores`
        );
        const data = await response.json();
        setCores(data);
      } catch (error) {
        console.error("Erro ao buscar cores:", error);
      }
    }
    async function fetchTipos() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tipos`);
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
        `${process.env.NEXT_PUBLIC_URL_API}/produtos/${produto.id}`,
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

  console.log(payload)

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/produtos/${produto.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: ("Bearer " +
          Cookies.get("admin_logado_token")) as string,
      },
      body: JSON.stringify(payload),
    }
  );

  if (response.status === 200) {
    const response =  await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/produtos/teste/${produto.id}`,
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
            x.id === produto.id ? { ...x, ...updatedProduto } : x
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
    className="transition-colors duration-200 hover:bg-zinc-600 border-b border-zinc-600 hover:text-gray-100"  
  >  
    <td className="px-6 py-4">  
      <img   
        src={produto.foto}   
        alt="Capa do Produto"   
        className="w-48 h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"  
      />  
    </td>  
    <td className="px-6 py-4 font-medium">  
      {editingId === produto.id ? (  
        <input  
          {...register("descricao")}  
          defaultValue={produto.descricao}  
          className="w-full p-2 bg-zinc-700 border border-zinc-500 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"  
        />  
      ) : (  
        <span className="text-zinc-900 hover:text-zinc-900">{produto.descricao}</span>  
      )}  
    </td>  
    <td className="px-6 py-4">  
      {editingId === produto.id ? (  
        <select  
          {...register("tipoProdutoId")}  
          // value={produto.tipoProduto.id || ""}  aqui tava o bug de n conseguir selecionar
          className="w-full p-2 bg-zinc-700 border border-zinc-500 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"  
        >  
          <option value="">Selecione um tipo</option>  
          {tipos.map((tipo) => (  
            <option key={tipo.id} value={tipo.id}>  
              {tipo.nome}  
            </option>  
          ))}  
        </select>  
      ) : (  
        <span className="text-zinc-900">{produto.tipoProduto.nome}</span>  
      )}  
    </td>  
    <td className="px-6 py-4">  
      {editingId === produto.id ? (  
        <select  
          {...register("corId")}  
          className="w-full p-2 bg-zinc-700 border border-zinc-500 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"  
        >  
          <option value="">Selecione uma cor</option>  
          {cores.map((cor) => (  
            <option key={cor.id} value={cor.id}>  
              {cor.nome}  
            </option>  
          ))}  
        </select>  
      ) : (  
        <span className="text-zinc-900">{produto.cor.nome}</span>  
      )}  
    </td>  
    <td className="px-6 py-4">  
      {editingId === produto.id ? (  
        <input  
          {...register("preco")}  
          defaultValue={produto.preco}  
          className="w-full p-2 bg-zinc-700 border border-zinc-500 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"  
        />  
      ) : (  
        <span className="text-zinc-900">  
          R$ {Number(produto.preco).toLocaleString("pt-br", {  
            minimumFractionDigits: 2,  
          })}  
        </span>  
      )}  
    </td>  
    <td className="px-6 py-4">  
      {editingId === produto.id ? (  
        <button  
          onClick={handleSubmit(alterarProduto)}  
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200"  
        >  
          <Save size={16} />  
          Salvar  
        </button>  
      ) : (  
        <div className="flex gap-3">  
          <button  
            onClick={excluirCarro}  
            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-100/10 rounded-full transition-all duration-200"  
            title="Excluir"  
          >  
            <Trash2 size={20} />  
          </button>  
          <button  
            onClick={() => setEditingId(produto.id)}  
            className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-100/10 rounded-full transition-all duration-200"  
            title="Editar"  
          >  
            <Pencil size={20} />  
          </button>  
        </div>  
      )}  
    </td>  
  </tr>  
);  
}  

export default ItemCarro;  
