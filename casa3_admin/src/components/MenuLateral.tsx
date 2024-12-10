"use client"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { IoExitOutline } from "react-icons/io5"
import { BiSolidDashboard } from "react-icons/bi"
import { FiFileText } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { LuPackageOpen } from "react-icons/lu";
import Link from "next/link"

export function MenuLateral() {
  const router = useRouter()

  function adminSair() {
    if (confirm("Confirma Saída?")) {
      Cookies.remove("admin_logado_id")
      Cookies.remove("admin_logado_nome")
      Cookies.remove("admin_logado_token")
      router.replace("/")
    }
  }

  return (
    <aside id="default-sidebar" className="fixed mt-24 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-zinc-900 text-gray-300">
        <ul className="space-y-2 font-medium">
          <li>
            <Link href="/principal" className="flex items-center p-2">
              <span className="h-5 text-gray-50 text-2xl">
                <BiSolidDashboard />
              </span>
              <span className="ms-2 mt-1">Visão Geral</span>
            </Link>
          </li>
          <li>
            <Link href="/principal/produtos" className="flex items-center p-2">
              <span className="h-5 text-gray-50 text-2xl">
                <LuPackageOpen />
              </span>
              <span className="ms-2 mt-1">Controle de Produtos</span>
            </Link>
          </li>
          <li>
            <Link href="/principal/carrinho" className="flex items-center p-2">
              <span className="h-5 text-gray-50 text-2xl">
                <FaShoppingCart />
              </span>
              <span className="ms-2 mt-1">Requisições Carrinho</span>
            </Link>
          </li>
          <li>
            <Link href="/principal/orcamentos" className="flex items-center p-2 cursor-pointer">
              <span className="h-5 text-gray-50 text-2xl">
                <FiFileText />
              </span>
              <span className="ms-2 mt-1">Controle de Orçamentos</span>
            </Link>
          </li>

          <li>
            <span className="flex items-center p-2 cursor-pointer">
              <span className="h-5 text-gray-50 text-2xl">
                <IoExitOutline />
              </span>
              <span className="ms-2 mt-1" onClick={adminSair}>Sair do Sistema</span>
            </span>
          </li>
        </ul>
      </div>
    </aside>
  )
}