"use client";  

import { Swiper, SwiperSlide } from 'swiper/react';  
import 'swiper/css';  
import 'swiper/css/navigation';  
import 'swiper/css/pagination';  

import { Navigation, Pagination } from 'swiper/modules';  

const slides = [  
  '/car1.jpeg',  
  '/car2.jpeg',  
  '/car3.jpeg',  
  '/car4.jpeg',  
];  

const slideContent = [  
  {  
    title: "Design de Cozinhas para Toda Família",  
    subtitle: "Cozinhas projetadas para o que realmente importa: família, gastronomia e vivências memoráveis.",  
    description: "Transforme sua cozinha em um espaço onde memórias são criadas e momentos especiais são compartilhados todos os dias. Nossa expertise em móveis planejados garante que cada centímetro seja aproveitado com estilo e funcionalidade. Trabalhamos com os melhores materiais do mercado, oferecendo soluções inteligentes de armazenamento, bancadas ergonômicas e layouts que facilitam o preparo das refeições. Seja para um café da manhã em família ou um jantar entre amigos, sua cozinha será o coração acolhedor do seu lar, combinando beleza, praticidade e durabilidade em cada detalhe."  
  },  
  {  
    title: "Dormitórios Que Inspiram Conforto",  
    subtitle: "Seu refúgio pessoal merece um design excepcional que transcende o comum.",  
    description: "Criamos dormitórios que vão além da simples combinação de elegância e praticidade. Cada projeto é meticulosamente pensado para proporcionar o máximo de conforto e organização, com soluções personalizadas que otimizam seu espaço. Nossos móveis planejados incluem guarda-roupas com divisões inteligentes, cômodas funcionais e cabeceiras exclusivas. Utilizamos materiais premium e acabamentos sofisticados para criar um ambiente que promove o relaxamento e o bem-estar, transformando seu quarto em um verdadeiro santuário de tranquilidade e estilo."  
  },  
  {  
    title: "Salas de Estar Extraordinárias",  
    subtitle: "O coração do seu lar merece um projeto único que reflita sua essência.",  
    description: "Desenvolvemos ambientes que são verdadeiras expressões da sua personalidade e estilo de vida. Nossos móveis planejados transformam sua sala em um espaço acolhedor e sofisticado, perfeito para receber amigos e família. Criamos soluções sob medida que maximizam o aproveitamento do espaço, com painéis de TV personalizados, estantes modulares e móveis multifuncionais. Cada elemento é cuidadosamente selecionado para criar uma harmonia visual única, combinando conforto, funcionalidade e design contemporâneo em um ambiente que convida à convivência e ao relaxamento."  
  },  
  {  
    title: "Home Office Sob Medida",  
    subtitle: "Espaços de trabalho que inspiram produtividade e bem-estar profissional.",  
    description: "Seu escritório em casa merece ser muito mais que funcional e elegante. Projetamos ambientes que elevam sua experiência profissional, com soluções inteligentes de organização e design contemporâneo. Nossos projetos incluem mesas ergonômicas, sistemas de arquivamento eficientes e iluminação adequada para suas necessidades. Criamos um espaço que equilibra perfeitamente profissionalismo e conforto, com móveis planejados que otimizam cada centímetro disponível. Transformamos seu home office em um ambiente inspirador, onde a produtividade e o bem-estar caminham lado a lado."  
  }  
];

export default function Carousel() {  
  return (  
    <div className="relative h-[28rem] md:h-screen object-cover">  
      <Swiper  
        modules={[Navigation, Pagination]}  
        spaceBetween={0}  
        slidesPerView={1}  
        navigation  
        pagination={{ clickable: true }}  
        loop={true}  
        className="h-full w-full"  
      >  
        {slides.map((slide, index) => (  
          <SwiperSlide key={index} className="hidden relative md:flex justify-center items-center">  
            <img src={slide} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />  
            <div className="hidden md:block absolute inset-y-0 left-0 w-1/3 bg-black opacity-70"></div>  
            <div className="absolute left-0 top-1/4 md:top-0 p-16 text-white z-10  w-full md:w-1/4">  
              <h2 className="text-3xl w-72 md:text-4xl font-bold mb-4">{slideContent[index].title}</h2>  
              <p className="hidden md:block mb-4 text-lg font-semibold">{slideContent[index].subtitle}</p>  
              <p className="hidden md:block mb-6 leading-relaxed">{slideContent[index].description}</p>  
              <div className="space-y-4 mb-8">  
                <p className="hidden md:block text-md">✓ Projetos 100% personalizados</p>  
                <p className="hidden md:block text-md">✓ Material de alta qualidade</p>  
                <p className="hidden md:block text-md">✓ Garantia estendida</p>  
                <p className="hidden md:block text-md">✓ Montagem profissional</p>  
                <p className="hidden md:block text-md">✓ Atendimento da melhor qualidade</p>  
                <p className="hidden md:block text-md">✓ Seja você a nossa prioridade</p>  
                <p className="hidden md:block text-md">✓ Loja física acessível</p>  
              </div>  
              <button className="mt-4 md:mt-0 bg-white text-black  py-2 md:py-3 px-6 rounded font-semibold hover:bg-gray-100 transition duration-300">  
                SOLICITAR ORÇAMENTO  
              </button>  
            </div>  
          </SwiperSlide>  
        ))}  
      </Swiper>  
    </div>  
    
  );  
}