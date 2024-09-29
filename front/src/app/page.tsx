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
        <Avaliacoes />
        <FAQ />
    </div>  
  </main>  
  );
}
