import React from 'react';  
import { Swiper, SwiperSlide } from 'swiper/react';  
import 'swiper/css';  
import 'swiper/css/navigation';  
import 'swiper/css/pagination';  
import { Navigation, Pagination } from 'swiper/modules';  

const reviews = [  
  {  
    name: "Joana Silva",  
    rating: 5,  
    text: "Excelente serviço! Recomendo a todos.",  
  },  
  {  
    name: "Maria Oliveira",  
    rating: 4,  
    text: "Muito bom, mas poderia melhorar em alguns aspectos.",  
  },  
  {  
    name: "Carlos Souza",  
    rating: 5,  
    text: "Atendimento impecável e rápido.",  
  },  
  {  
    name: "Miriã Santos",  
    rating: 5,  
    text: "Produtos de alta qualidade! Recomendo.",  
  },  
  {  
    name: "Fabiana Lima",  
    rating: 5,  
    text: "Atendimento bom. Entrega rápida.",  
  },  
];  

export default function Avaliacoes() {  
  return (  
    <div className="max-w-2xl mx-auto md:py-8 mt-16">  
      <h2 className="text-3xl font-bold mb-6 text-center">Avaliações dos Clientes</h2>  
      <Swiper  
        className='avaliacoes-swiper'
        modules={[Navigation, Pagination]}  
        spaceBetween={30}  
        slidesPerView={1}  
        navigation  
        pagination={{ clickable: true }}  
        loop={true}
        style={{
          "--swiper-pagination-bullet-size": "13px",
          "--swiper-pagination-bullet-horizontal-gap": "10px"
        } as React.CSSProperties} 
      >  
        {reviews.map((review, index) => (  
          <SwiperSlide key={index}>  
            <div className="bg-colorc3brancobg shadow-md rounded-lg p-10 h-44">  
              <div className="flex items-center mb-4">  
                <div className="text-lg font-semibold">{review.name}</div>  
                <div className="ml-auto flex">  
                  {Array.from({ length: 5 }, (_, i) => (  
                    <svg  
                      key={i}  
                      className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}  
                      fill="currentColor"  
                      viewBox="0 0 20 20"  
                    >  
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.39-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />  
                    </svg>  
                  ))}  
                </div>  
              </div>  
              <p className="text-gray-700">{review.text}</p>  
            </div>  
          </SwiperSlide>  
        ))}  
      </Swiper>  
    </div>  
  );  
}  