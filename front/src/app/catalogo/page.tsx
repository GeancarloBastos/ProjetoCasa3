'use client';  
import { useEffect, useState } from "react";  
import { InputPesquisa } from "@/components/InputPesquisa";  
import { ItemMoveis } from "@/components/ItemMoveis";  
import { MovelI } from "@/utils/types/movel";  
import { CarrinhoProvider } from "@/context/CarrinhoContext";


export default function Catalogo() {  
  const [moveis, setMoveis] = useState<MovelI[]>([]);  
  const [isLoading, setIsLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null);  

  useEffect(() => {  
    async function getDados() {  
      try {  
        setIsLoading(true);  
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos`);  
        
        if (!response.ok) {  
          throw new Error('Falha ao carregar os dados');  
        }  
        
        const dados = await response.json();  
        setMoveis(dados);  
      } catch (error) {  
        console.error('Erro ao buscar dados:', error);  
        setError('Não foi possível carregar os produtos. Tente novamente mais tarde.');  
      } finally {  
        setIsLoading(false);  
      }  
    }  
    getDados();  
  }, []);  

  if (isLoading) {  
    return (  
      <div className="mx-auto max-w-screen-xl p-4">  
        <div className="flex items-center justify-center min-h-[400px]">  
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>  
        </div>  
      </div>  
    );  
  }  

  if (error) {  
    return (  
      <div className="mx-auto max-w-screen-xl p-4">  
        <div className="text-center py-8">  
          <p className="text-red-600">{error}</p>  
          <button   
            onClick={() => window.location.reload()}  
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"  
          >  
            Tentar Novamente  
          </button>  
        </div>  
      </div>  
    );  
  }  

  const listaMoveis = moveis.map(movel => (  
    <ItemMoveis data={movel} key={movel.id} />  
  ));  

  return (  
    <div className="mx-auto max-w-screen-xl p-4">  
      <div className="mt-10 mb-8">  
        <InputPesquisa setMoveis={setMoveis} />  
      </div>  
      
      {moveis.length === 0 ? (  
        <div className="text-center py-8">  
          <p className="text-gray-600">Nenhum produto encontrado.</p>  
        </div>  
      ) : (  
        <section className="grid grid-cols-1 justify-self-center md:justify-self-auto sm:grid-cols-2 md:grid-cols-3 gap-6">  
        

          {listaMoveis}  
        
        </section>  
      )}  
    </div>  
  );  
}  