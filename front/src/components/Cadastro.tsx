'use client'  

import { useForm } from "react-hook-form";  
import { useRouter } from "next/navigation";  
import Link from "next/link";  

type Inputs = {  
  nome: string;  
  email: string;  
  senha: string;  
  confirmarSenha: string;  
  aceitarTermos: boolean;  
};  

export default function Cadastro() {  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();  
  const router = useRouter();  

  async function realizarCadastro(data: Inputs) {  
    if (data.senha !== data.confirmarSenha) {  
      alert("As senhas não coincidem!");  
      return;  
    }  

    const response = await fetch(  
      `${process.env.NEXT_PUBLIC_URL_API}/clientes/cadastro`,  
      {  
        headers: {  
          "Content-Type": "application/json",  
        },  
        method: "POST",  
        body: JSON.stringify({  
          nome: data.nome,  
          email: data.email,  
          senha: data.senha  
        }),  
      }  
    );  

    if (response.status === 201) {  
      alert("Cadastro realizado com sucesso!");  
      router.push("/login");  
    } else {  
      alert("Erro ao realizar cadastro. Por favor, tente novamente.");  
    }  
  }  

  return (  
    <div className="max-w-md mx-auto mb-32 p-6">  
      <h2 className="mt-32 mb-6 text-3xl font-bold text-center">  
        Criar Conta  
      </h2>  
      
      <form onSubmit={handleSubmit(realizarCadastro)}>  
        <div className="mb-5">  
          <label className="block mb-2 text-sm font-medium text-gray-900">  
            Nome Completo:  
          </label>  
          <input  
            type="text"  
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  
            required  
            {...register("nome")}  
          />  
        </div>  

        <div className="mb-5">  
          <label className="block mb-2 text-sm font-medium text-gray-900">  
            E-mail:  
          </label>  
          <input  
            type="email"  
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  
            required  
            {...register("email")}  
          />  
        </div>  

        <div className="mb-5">  
          <label className="block mb-2 text-sm font-medium text-gray-900">  
            Senha:  
          </label>  
          <input  
            type="password"  
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  
            required  
            {...register("senha")}  
          />  
        </div>  

        <div className="mb-5">  
          <label className="block mb-2 text-sm font-medium text-gray-900">  
            Confirmar Senha:  
          </label>  
          <input  
            type="password"  
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  
            required  
            {...register("confirmarSenha")}  
          />  
        </div>  

        <div className="flex items-start mb-5">  
          <div className="flex items-center h-5">  
            <input  
              type="checkbox"  
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"  
              required  
              {...register("aceitarTermos")}  
            />  
          </div>  
          <label className="ms-2 text-sm font-medium text-gray-900">  
            Li e aceito os termos de uso e política de privacidade  
          </label>  
        </div>  

        <button  
          type="submit"  
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4"  
        >  
          Criar Conta  
        </button>  

        <p className="text-center text-sm text-gray-600">  
          Já possui uma conta?{" "}  
          <Link href="/login" className="text-blue-600 hover:underline">  
            Fazer Login  
          </Link>  
        </p>  
      </form>  
    </div>  
  );  
}