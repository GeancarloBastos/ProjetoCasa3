"use client"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import { useRouter } from "next/navigation"

import Cookies from 'js-cookie'

type Inputs = {
  email: string
  senha: string
}

export default function Home() {
  const { register, handleSubmit, setFocus } = useForm<Inputs>()
  const router = useRouter()

  useEffect(() => {
    setFocus("email")
  }, [])

  async function verificaLogin(data: Inputs) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/admins/login`, {
      method: "POST",
      headers: {"Content-type": "Application/json"},
      body: JSON.stringify({email: data.email, senha: data.senha})
    })

    // console.log(response)
    if (response.status == 200) {
      const admin = await response.json()

      Cookies.set("admin_logado_id", admin.id)
      Cookies.set("admin_logado_nome", admin.nome)
      Cookies.set("admin_logado_token", admin.token)

      router.push("/principal")      
    } else if (response.status == 400) {
      toast.error("Erro... Login ou senha incorretos")
    } 
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-900 px-4 py-8">
      <img src="./logo.webp" alt="Revenda" style={{ width: 240 }}
        className="d-block" />
      <div className="max-w-sm">
        <h1 className="text-3xl font-bold my-8 text-gray-200">Admin: Casa 3</h1>
        <form className="max-w-sm mx-auto"
          onSubmit={handleSubmit(verificaLogin)} >
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail:</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              {...register("email")}
              required />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha:</label>
            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              {...register("senha")}
              required />
          </div>
          <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Entrar</button>
        </form>
      </div>
    </main>
  );
}
