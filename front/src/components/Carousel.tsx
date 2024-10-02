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

export default function Carousel() {  
  return (  
    <div className="relative h-screen object-cover">  
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
          <SwiperSlide key={index} className="relative flex justify-center items-center">  
            <img src={slide} alt={`Slide ${index}`} className="w-full h-full object-cover" />  
            {/* Adiciona a sobreposição sólida à esquerda */}  
            <div className="absolute inset-y-0 left-0 w-1/3 bg-black opacity-70"></div>  
            {/* Texto sobre a imagem */}  
            <div className="absolute left-0 top-0 p-16 text-white z-10 max-w-lg">  
              <h2 className="text-4xl font-bold mb-4">Design build kitchen the family</h2>  
              <p className="mb-4">Kitchens should be designed around what's truly important: family, food, and life.</p>  
              <button className="bg-white text-black py-2 px-4 rounded">Visit Show Room</button>  
            </div>  
          </SwiperSlide>  
        ))}  
      </Swiper>  
    </div>  
  );  
}