'use client'  
import Link from "next/link";  
import { useClienteStore } from "@/context/cliente";  
import { useRouter } from "next/navigation";  
import { useState } from "react";  

export function Header() {  
  const { cliente, deslogaCliente } = useClienteStore();  
  const router = useRouter();  
  const [isMenuOpen, setIsMenuOpen] = useState(false);  

  function sairCliente() {  
    deslogaCliente();  
    if (localStorage.getItem("client_key")) {  
      localStorage.removeItem("client_key");  
    }  
    router.push("/login");  
  }  

  return (  
    <nav className="bg-zinc-900">  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  
        <div className="flex items-center justify-between h-24">  
          <div className="flex items-center">  
            <Link href="/" className="flex-shrink-0">  
              <img src="./logoc3SFundo.png" className="h-16 w-auto" alt="Logo" />  
            </Link>  
          </div>  
          <div className="hidden md:block">  
            <div className="ml-10 flex items-baseline space-x-4">  
              <Link href="/" className="text-colorc3offbranco hover:text-colorc3verde px-3 py-2 rounded-md text-md font-medium">Início</Link>  
              <Link href="/catalogo" className="text-colorc3offbranco hover:text-colorc3verde px-3 py-2 rounded-md text-md font-medium">Catálogo</Link>  
              <Link href="/sobre" className="text-colorc3offbranco hover:text-colorc3verde px-3 py-2 rounded-md text-md font-medium">Sobre Nós</Link>  
              <Link href="/contato" className="text-colorc3offbranco hover:text-colorc3verde px-3 py-2 rounded-md text-md font-medium">Contato</Link>  
            </div>  
          </div>  
          <div className="hidden md:block">  
            <div className="ml-4 flex items-center md:ml-6">  
              <Link href={cliente.id ? "/orcamento" : "/login"} className="bg-colorc3verde hover:bg-green-800 text-white px-3 py-2 rounded-md text-sm font-medium">  
                FAÇA SEU PROJETO  
              </Link>  
              <Link href="" className="ml-3 bg-green-800 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">  
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">  
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />  
                </svg>  
                CARRINHO  
              </Link>  
              {cliente.id ? (  
                <div className="ml-3 relative">  
                  <span className="text-colorc3offbranco mr-2">Olá, {cliente.nome}</span>  
                  <button onClick={sairCliente} className="text-colorc3verde hover:text-colorc3offbranco">Sair</button>  
                </div>  
              ) : (  
                <Link href="/login" className="ml-3 text-colorc3offbranco hover:text-colorc3verde">Entrar</Link>  
              )}  
            </div>  
          </div>  
          <div className="-mr-2 flex md:hidden">  
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-colorc3offbranco hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white">  
              <span className="sr-only">Open main menu</span>  
              {!isMenuOpen ? (  
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">  
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />  
                </svg>  
              ) : (  
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">  
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />  
                </svg>  
              )}  
            </button>  
          </div>  
        </div>  
      </div>  

      {isMenuOpen && (  
        <div className="md:hidden">  
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">  
            <Link href="/" className="text-colorc3offbranco hover:text-colorc3verde block px-3 py-2 rounded-md text-base font-medium">Início</Link>  
            <Link href="/catalogo" className="text-colorc3offbranco hover:text-colorc3verde block px-3 py-2 rounded-md text-base font-medium">Catálogo</Link>  
            <Link href="/sobre" className="text-colorc3offbranco hover:text-colorc3verde block px-3 py-2 rounded-md text-base font-medium">Sobre Nós</Link>  
            <Link href="/contato" className="text-colorc3offbranco hover:text-colorc3verde block px-3 py-2 rounded-md text-base font-medium">Contato</Link>  
          </div>  
          <div className="pt-4 pb-3 border-t border-green-700">  
            <div className="flex items-center px-5">  
              <Link href={cliente.id ? "/detalhes" : "/login"} className="bg-colorc3verde hover:bg-green-800 text-white px-3 py-2 rounded-md text-sm font-medium">  
                FAÇA SEU PROJETO  
              </Link>  
              <Link href="#" className="ml-3 bg-green-800 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">  
                CARRINHO  
              </Link>  
            </div>  
            <div className="mt-3 px-2 space-y-1">  
              {cliente.id ? (  
                <>  
                  <span className="block px-3 py-2 rounded-md text-base font-medium text-colorc3offbranco">Olá, {cliente.nome}</span>  
                  <button onClick={sairCliente} className="block px-3 py-2 rounded-md text-base font-medium text-colorc3verde hover:text-colorc3offbranco">Sair</button>  
                </>  
              ) : (  
                <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-colorc3offbranco hover:text-colorc3verde">Entrar</Link>  
              )}  
            </div>  
          </div>  
        </div>  
      )}  
    </nav>  
  );  
}