import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Casa 3",
  description: "Realizando o seu sonho planejado, em Pelotas-RS.",
  keywords: ['Venda', 'Móveis', 'Móveis Planejados'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (  
    <html lang="pt-br">  
      <head>
      </head>  
      <body className="bg-colorc3bege flex flex-col min-h-screen">  
        <Header />  
        <main className="flex-grow">  
          {children}  
        </main>  
        <Footer/>  
      </body>  
    </html>  
  );  
}  