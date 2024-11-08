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
import { useClienteStore } from "@/context/cliente";


export default function Page() {
  const { logaCliente } = useClienteStore()

  useEffect(() => {

    async function getCliente(idCliente: string) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${idCliente}`)
      if (response.status == 200) {
        const dados = await response.json()
        logaCliente(dados)
      }
    }

    if (localStorage.getItem("client_key")) {
      const clienteSalvo = localStorage.getItem("client_key") as string
      getCliente(clienteSalvo)
    }

  }, [])

  return (
    <main>
      <div className="">
        <div className="">
          <Carousel />
        </div>
        <section id="about" className="bg-colorc3bege py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-4xl font-bold mb-12 text-zinc-900 text-center">Sobre Nós</h2>

            <div className="w-64 md:w-auto md:max-w-4xl mx-auto mb-16 space-y-6 text-lg font-medium">
              <p className="text-zinc-900 leading-relaxed text-center text-lg md:text-xl font-semibold">
                <span className="underline font-bold  text-xl md:text-2xl text-black">Nossa missão</span> é conectar as pessoas com seus lares através de móveis planejados que promovem
                o bem-estar e a harmonia familiar. Buscamos criar ambientes que inspirem momentos de alegria,
                conforto e união.
              </p>
              <p className="text-zinc-900 leading-relaxed text-center text-base ">
                Na Casa 3 Ambientes Personalizados, valorizamos a sua individualidade e criamos móveis
                sob medida para transformar o seu lar em um espaço único e memorável. Nossa missão é proporcionar
                uma experiência completa, desde o projeto até a instalação, para que você possa desfrutar
                de momentos especiais com seus familiares.
              </p>
              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
              <div className="bg-cards p-8 rounded-lg shadow-md">
                <h3 className="font-semibold mb-4 text-lg">Família</h3>
                <p className="text-gray-600">
                  Acreditamos que a casa é o lugar onde a família se reúne e cria memórias inesquecíveis
                </p>
              </div>

              <div className="bg-cards p-8 rounded-lg shadow-md">
                <h3 className="font-semibold mb-4 text-lg">Personalização</h3>
                <p className="text-gray-600">
                  Cada cliente é único e merece um projeto exclusivo
                </p>
              </div>

              <div className="bg-cards p-8 rounded-lg shadow-md">
                <h3 className="font-semibold mb-4 text-lg">Qualidade</h3>
                <p className="text-gray-600">
                  Utilizamos materiais de alta qualidade e processos eficientes
                </p>
              </div>

              <div className="bg-cards p-8 rounded-lg shadow-md">
                <h3 className="font-semibold mb-4 text-lg">Experiência do Cliente</h3>
                <p className="text-gray-600">
                  Atendimento personalizado e acolhedor
                </p>
              </div>

              <div className="bg-cards p-8 rounded-lg shadow-md">
                <h3 className="font-semibold mb-4 text-lg">Inovação</h3>
                <p className="text-gray-600">
                  Sempre atentos às novas tendências do mercado
                </p>
              </div>

              <div className="bg-cards p-8 rounded-lg shadow-md">
                <h3 className="font-semibold mb-4 text-lg">Sustentabilidade</h3>
                <p className="text-gray-600">
                  Priorizamos materiais ecologicamente corretos
                </p>
              </div>
            </div>

          </div>
              <div className="md:max-w-4xl mx-1 md:mx-auto mb-16 mt-16 space-y-6 text-lg font-semibold">
                <p className="text-zinc-900 leading-relaxed text-center">
                  Queremos ser reconhecidos como referência em móveis planejados personalizados, transformando
                  cada ambiente em um espaço único e memorável, onde as pessoas vivem momentos especiais.
                </p>
              </div>
            <div className="text-center mt-12">
              <a href="./catalogo" className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-colorc3 transition duration-300 shadow-md inline-block">
                Visite Nosso Catálogo
              </a>
            </div>
        </section>

        <section id="services" className="bg-gray-100 py-24">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-4xl font-bold mb-16 text-gray-800 text-center">Nossos Serviços</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "Projeto Personalizado",
                  description: "Criamos designs únicos que refletem seu estilo e necessidades, otimizando cada espaço da sua casa.",
                  icon: (
                    <svg className="w-12 h-12 text-colorc3 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                  ),
                },
                {
                  title: "Fabricação de Qualidade",
                  description: "Utilizamos materiais premium e técnicas avançadas para garantir móveis duráveis e bonitos.",
                  icon: (
                    <svg className="w-12 h-12 text-colorc3 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  ),
                },
                {
                  title: "Instalação Profissional",
                  description: "Nossa equipe especializada garante uma instalação perfeita, respeitando seu espaço e tempo.",
                  icon: (
                    <svg className="w-12 h-12 text-colorc3 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                },
              ].map((service, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                  <div className="text-center">
                    {service.icon}
                    <h3 className="text-xl font-bold mb-4 text-gray-800">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Avaliacoes />
        <FAQ />
      </div>
    </main>
  );
}
