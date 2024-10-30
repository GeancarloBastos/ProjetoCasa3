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
      <div className="mt-10">
        <InputPesquisa setMoveis={setMoveis} />
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {listaMoveis}
      </section>

    </div>
  );
}