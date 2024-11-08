'use client';  
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';  

// Tipos  
interface ProdutoCarrinho {  
  id: number;  
  nome: string;  
  descricao: string;  
  preco: number;  
  foto: string;  
  quantidade: number;  
  observacao?: string;  
  material?: string;  
  marca?: string;  
}

interface CarrinhoContextData {  
  itens: ProdutoCarrinho[];  
  adicionarAoCarrinho: (produto: Omit<ProdutoCarrinho, 'quantidade'>) => void;  
  removerDoCarrinho: (id: number) => void;  
  atualizarQuantidade: (id: number, delta: number) => void;  
  limparCarrinho: () => void;  
  valorTotal: number;
  totalItens: number;  
}  

const CarrinhoContext = createContext<CarrinhoContextData>({} as CarrinhoContextData);  

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {  
  const [itens, setItens] = useState<ProdutoCarrinho[]>([]);  

  // Carregar carrinho do localStorage quando componente montar  
  useEffect(() => {  
    const savedCart = localStorage.getItem('@Casa3:carrinho');  
    if (savedCart) {  
      setItens(JSON.parse(savedCart));  
    }  
  }, []);  

  // Salvar carrinho no localStorage quando mudar  
  useEffect(() => {  
    localStorage.setItem('@Casa3:carrinho', JSON.stringify(itens));  
  }, [itens]);  

  const adicionarAoCarrinho = useCallback((produto: Omit<ProdutoCarrinho, 'quantidade'>) => {  
    setItens(itensAtuais => {  
      const itemExistente = itensAtuais.find(item => item.id === produto.id);  
      
      if (itemExistente) {  
        return itensAtuais.map(item =>  
          item.id === produto.id  
            ? { ...item, quantidade: item.quantidade + 1 }  
            : item  
        );  
      }  

      return [...itensAtuais, { ...produto, quantidade: 1 }];  
    });  
  }, []);  

  const removerDoCarrinho = useCallback((id: number) => {  
    setItens(itens => itens.filter(item => item.id !== id));  
  }, []);  

  const atualizarQuantidade = useCallback((id: number, delta: number) => {  
    setItens(itens => itens.map(item => {  
      if (item.id === id) {  
        const novaQuantidade = Math.max(1, item.quantidade + delta);  
        return { ...item, quantidade: novaQuantidade };  
      }  
      return item;  
    }));  
  }, []);  

  const limparCarrinho = useCallback(() => {  
    setItens([]);  
  }, []);  
  console.log(itens)
  const totalItens = itens.reduce((total, item) => total + item.quantidade, 0); 
  console.log(totalItens)

  return (  
    <CarrinhoContext.Provider  
      value={{  
        itens,  
        adicionarAoCarrinho,  
        removerDoCarrinho,  
        atualizarQuantidade,  
        limparCarrinho,  
        valorTotal: itens.reduce((total, item) => total + item.preco * item.quantidade, 0),
        totalItens,  
      }}  
    >  
      {children}  
    </CarrinhoContext.Provider>  
  );  
}  

export const useCarrinho = () => useContext(CarrinhoContext);  