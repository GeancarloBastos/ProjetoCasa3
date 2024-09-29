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
    <div className="relative h-screen object-cover bg-gradient">  
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
          <SwiperSlide key={index} className="flex justify-center items-center">  
            <img src={slide} alt={`Slide ${index}`} className="w-full h-full object-cover" />  
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>
          </SwiperSlide>  
        ))}  
      </Swiper>  
    </div>  
  );  
}