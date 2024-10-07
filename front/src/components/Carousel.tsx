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
            <div className="absolute inset-y-0 left-0 w-1/3 bg-black opacity-70"></div> 
            <div className="absolute left-0 top-0 p-16 text-white z-10 max-w-lg">  
              <h2 className="text-4xl font-bold mb-4">Design build kitchen the family</h2>  
              <p className="mb-4">Kitchens should be designed around truly important: family, food, and life.</p>  
              <p>Discover a world where imagination meets craftsmanship. We specialize in creating bespoke furniture tailored to your unique taste and lifestyle. Transform your space with pieces that tell your story.</p>
              <p>At Mr, we believe that furniture should be as unique as the people who use it. Our team works closely with you to design and build custom pieces that enhance your home’s beauty and functionality.</p>
              <p>Why settle for ordinary when you can have extraordinary? Explore our range of customizable options and create furniture that matches your vision. From concept to creation, we bring your ideas to life.</p>
              <br />
              <button className="bg-white text-black py-2 px-4 rounded font-semibold">VISITE NOSSO CATÁLOGO</button>  
            </div>  
          </SwiperSlide>  
        ))}  
      </Swiper>  
    </div>  
  );  
}