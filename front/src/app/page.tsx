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
        <section id="about" className="bg-gradient-to-b from-colorc3bege to-white py-24">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="relative mb-16">
              <h2 className="text-4xl font-bold text-zinc-900 text-center">
                Sobre Nós
              </h2>
              <div className="absolute w-24 h-1 bg-colorc3verde bottom-0 left-1/2 transform -translate-x-1/2 mt-4"></div>
            </div>

            <div className="max-w-4xl mx-auto mb-20 space-y-8">
              <div className="text-center space-y-6">
                <h3 className="text-2xl font-bold text-colorc3verde mb-4">Nossa Missão</h3>
                <p className="text-lg text-zinc-800 leading-relaxed">
                  É conectar as pessoas com seus lares através de móveis planejados que promovem
                  o bem-estar e a harmonia familiar. Buscamos criar ambientes que inspirem momentos de
                  alegria, conforto e união.
                </p>
              </div>

              <p className="text-zinc-700 leading-relaxed text-center">
                Na Casa 3 Ambientes Personalizados, valorizamos a sua individualidade e criamos móveis
                sob medida para transformar o seu lar em um espaço único e memorável. Nossa missão é proporcionar
                uma experiência completa, desde o projeto até a instalação.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {[
                {
                  title: "Família",
                  description: "Acreditamos que a casa é o lugar onde a família se reúne e cria memórias inesquecíveis",
                  icon: "🏠"
                },
                {
                  title: "Personalização",
                  description: "Cada cliente é único e merece um projeto exclusivo",
                  icon: "✨"
                },
                {
                  title: "Qualidade",
                  description: "Utilizamos materiais de alta qualidade e processos eficientes",
                  icon: "⭐"
                },
                {
                  title: "Experiência do Cliente",
                  description: "Atendimento personalizado e acolhedor",
                  icon: "🤝"
                },
                {
                  title: "Inovação",
                  description: "Sempre atentos às novas tendências do mercado",
                  icon: "💡"
                },
                {
                  title: "Sustentabilidade",
                  description: "Priorizamos materiais ecologicamente corretos",
                  icon: "🌱"
                }
              ].map((item, index) => (
                <div key={index}
                  className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-colorc3verde to-green-400 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100"></div>
                  <div className="text-center">
                    <span className="text-4xl mb-4 block">{item.icon}</span>
                    <h3 className="text-xl font-bold mb-3 text-zinc-900">{item.title}</h3>
                    <p className="text-zinc-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900 text-white p-12 rounded-2xl shadow-xl max-w-4xl mx-auto">
              <p className="text-lg text-center leading-relaxed">
                Queremos ser reconhecidos como referência em móveis planejados personalizados, transformando
                cada ambiente em um espaço único e memorável, onde as pessoas vivem momentos especiais.
              </p>
            </div>

            <div className="text-center mt-12">
              <a href="./catalogo"
                className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-colorc3verde to-green-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
                Visite Nosso Catálogo
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
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

        <section className="bg-gradient-to-br from-colorc3bege to-white py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row items-center">
                {/* Lado esquerdo - Imagem */}
                <div className="w-full md:w-1/2 bg-zinc-900 p-12 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -top-6 -left-6 w-20 h-20 bg-colorc3verde rounded-full opacity-20"></div>
                    <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-colorc3verde rounded-full opacity-20"></div>
                    <span className="text-8xl">☕</span>
                  </div>
                </div>

                {/* Lado direito - Conteúdo */}
                <div className="w-full md:w-1/2 p-12">
                  <h2 className="text-3xl font-bold text-zinc-900 mb-6">
                    Vamos Tomar um Café?
                  </h2>
                  <p className="text-zinc-600 mb-8 text-lg">
                    Adoraríamos conversar sobre seus sonhos e projetos!<br />
                    Agende uma visita conosco, vamos tomar um café e transformar suas ideias em realidade.
                  </p>

                  <a
                    href="https://wa.me/5553997121815?text=Olá!%20Gostaria%20de%20agendar%20uma%20visita%20para%20conversarmos%20sobre%20meu%20projeto%20de%20móveis%20planejados.%20Podem%20me%20ajudar?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 rounded-full bg-green-500 text-white font-medium transition-all duration-300 hover:bg-green-600 hover:shadow-lg hover:scale-105"
                  >
                    <svg
                      className="w-6 h-6 mr-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    Agendar Visita
                  </a>

                  <p className="text-sm text-zinc-500 mt-6">
                    Atendimento de Segunda a Sexta, das 9h às 18:30h,<br />
                    e aos Sábados, das 9h às 13h.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Botão flutuante do WhatsApp */}
          <a
            href="https://wa.me/5553997121815?text=Olá!%20Gostaria%20de%20agendar%20uma%20visita%20para%20conversarmos%20sobre%20meu%20projeto%20de%20móveis%20planejados.%20Podem%20me%20ajudar?"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 z-50"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </a>
        </section>
      <div className="bg-gradient-to-b from-colorc3bege to-white py-2">
        <Avaliacoes />
        <FAQ />
      </div>  
      </div>
    </main>
  );
}
