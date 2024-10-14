'use client'
import Link from "next/link";
import { useClienteStore } from "@/context/cliente";
import { useRouter } from "next/navigation";

export function Header() {
  const { cliente, deslogaCliente } = useClienteStore();
  const router = useRouter();

  function sairCliente() {
    deslogaCliente();
    if (localStorage.getItem("client_key")) {
      localStorage.removeItem("client_key");
    }
    router.push("/login");
  }

  return (
    <nav className="border-gray-200 bg-colorc3">
      <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link href="/" className="flex items-center space-x-3">
          <img src="./logoCFundo.png" className="h-28" alt="Logo" />
        </Link>

        <div className="hidden md:flex flex-grow justify-center items-center md:space-x-5 space-x-16 font-merri text-2xl">
          <Link
            href="/"
            className="font-semibold text-colorc3offbranco hover:text-colorc3verde"
          >
            Início
          </Link>
          <Link
            href="/catalogo"
            className="font-semibold text-colorc3offbranco hover:text-colorc3verde"
          >
            Catálogo
          </Link>
          <Link
            href="/sobre"
            className="font-semibold text-colorc3offbranco hover:text-colorc3verde"
          >
            Sobre Nós
          </Link>
          <Link
            href="/contato"
            className="font-semibold text-colorc3offbranco hover:text-colorc3verde"
          >
            Contato
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          {cliente.id ? (
            <Link
              href="/detalhes"
              className="font-bold border bg-colorc3verde py-2 px-2 text-colorc3offbranco rounded hover:bg-green-800"
            >
              FAÇA SEU PROJETO
            </Link>
          ) : (
            <Link
              href="/login"
              className="font-bold border bg-colorc3verde py-2 px-2 text-colorc3offbranco rounded hover:bg-green-800"
            >
              FAÇA SEU PROJETO
            </Link>
          )}

          <div className="">
            <a
              href="#"
              className="flex items-center bg-green-800 text-white px-3 py-2 border rounded"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 4h-2l-1 2h-2v2h2l3.6 7.59-1.35 2.44c-.16.28-.25.61-.25.97 0 1.1.9 2 2 2h12v-2h-11.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.72c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.3.12-.48 0-.55-.45-1-1-1h-14.31l-.94-2zm-1 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
              <span className="font-semibold hover:underline hover:bg-colorc3verde">
                CARRINHO
              </span>
            </a>
          </div>

          

          <div className="flex items-center space-x-6 rtl:space-x-reverse max-w-max">
            {cliente.id ? (
              <>
                <span className="text-gray-500 dark:text-white hover:underline">
                  Cliente: {cliente.nome}
                </span>
                <span
                  className="cursor-pointer font-bold text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={sairCliente}
                >
                  Sair
                </span>
              </>
            ) : (
              <>
                <span className="text-gray-500 dark:text-white hover:underline">
                  (identifique-se)
                </span>
                <Link
                  href="/login"
                  className="font-bold text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Entrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
