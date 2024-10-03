"use client";
import React from "react";
import { InputPesquisa } from "@/components/InputPesquisa"
import { ItemMoveis } from "@/components/ItemMoveis";
import { MovelI } from "@/utils/types/movel";
import { useEffect, useState } from "react";



export default function Catalogo() {
  const [moveis, setMoveis] = useState<MovelI[]>([])

  useEffect(() => {
    async function getDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/moveis`)
      const dados = await response.json()
      console.log(dados)
      setMoveis(dados)
    }
    getDados()
  }, []);

  const listaMoveis = moveis.map(movel => (
    <ItemMoveis data={movel} key={movel.id} />
  ));

  return (
    <div className="mx-auto max-w-screen-xl">
      <h1 className="mt-10 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl text-center">
        Bem-vindo à Casa 3 Ambiente Personalizados
      </h1>
      <div className="mt-10">
        <InputPesquisa setMoveis={setMoveis} />
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {listaMoveis}
      </section>

    </div>
  );
}