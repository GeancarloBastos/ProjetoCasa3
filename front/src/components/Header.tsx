import Link from "next/link";

export function Header() {
  return (
    <nav className="border-gray-200 bg-colorc3">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="./logoCFundo.png" className="h-28" alt="Logo" />
        </Link>

        {/* Menu de Navegação */}
        <div className="hidden md:flex flex-wrap justify-center items-center space-x-6 font-merri text-2xl">
          <Link href="/" className="font-semibold text-colorc3offbranco hover:text-colorc3verde">
            Início
          </Link>
          <Link href="/catalogo" className="font-semibold text-colorc3offbranco hover:text-colorc3verde">
            Catálogo
          </Link>
          <Link href="/sobre" className="font-semibold text-colorc3offbranco hover:text-colorc3verde">
            Sobre Nós
          </Link>
          <Link href="/contato" className="font-semibold text-colorc3offbranco hover:text-colorc3verde">
            Contato
          </Link>
        </div>

        {/* Login e Cadastro */}
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <Link href="/login" className="font-bold border bg-colorc3verde py-2 px-2 text-colorc3offbranco rounded hover:bg-green-800">
            FAÇA SEU PROJETO
          </Link>
        </div>
      </div>
    </nav>
  );
}
