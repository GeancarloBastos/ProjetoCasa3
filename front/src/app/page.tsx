'use client'
import { InputPesquisa } from "@/components/InputPesquisa"
import { ItemMoveis } from "@/components/ItemMoveis";
import { MovelI } from "@/utils/types/movel";
import { useEffect, useState } from "react";
import RedirectToHome from "@/components/RedirectToHome";
import Carousel from "@/components/Carousel";
import { Header } from "@/components/Header";
import SoliciteOrcamento from "@/components/SoliciteOrc";
import Avaliacoes from "@/components/Avaliacoes";
import FAQ from "@/components/Faq";

export default function Page() {


  return (
    <main>
      <div className="">
        <div className="">
          <Carousel />
        </div>
        <section id="about" className="bg-colorc3bege py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Sobre Nós</h2>
            <p className="text-gray-700">Informações sobre a empresa, missão, visão, etc.</p>
          </div>
        </section>

        <section id="services" className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Nossos Serviços</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h3 className="text-xl font-bold mb-2">Serviço 1</h3>
                <p className="text-gray-700">Descrição do serviço 1.</p>
              </div>
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h3 className="text-xl font-bold mb-2">Serviço 2</h3>
                <p className="text-gray-700">Descrição do serviço 2.</p>
              </div>
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h3 className="text-xl font-bold mb-2">Serviço 3</h3>
                <p className="text-gray-700">Descrição do serviço 3.</p>
              </div>
            </div>
          </div>
        </section>

        <Avaliacoes />
        <FAQ />
      </div>
    </main>
  );
}
