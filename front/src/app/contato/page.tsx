'use client';
import { use, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Send,
  CheckCircle
} from "lucide-react";

export default function Contato() {
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setEnviado(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative bg-colorc3 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/logoCFundo.png"
            alt="Interior design background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Estamos prontos para transformar seus sonhos em projetos únicos e personalizados
          </p>
        </div>
      </div>

      <div className="container mx-auto px-1 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-colorc3 rounded-full mb-6">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Localização</h3>
            <p className="text-gray-600">
              Av. Domingos de Almeida, 379
              <br />
              Areal, Pelotas - RS
              <br />
              CEP 96085-470
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-colorc3 rounded-full mb-6">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Telefone</h3>
            <p className="text-gray-600">
              +55 (11) 99999-9999
              <br />
              +55 (11) 3333-3333
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-colorc3 rounded-full mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">E-mail</h3>
            <p className="text-gray-600 items-center text center left-0">
              casa3.ambientespersonalizados@gmail.com
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-colorc3 rounded-full mb-6">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Horário</h3>
            <p className="text-gray-600">
              Segunda a Sexta
              <br />
              09:00 as 12:00 - 13:30 as 18:30
              <br />
              Sábado: 09:00 - 13:00
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Nossa Localização</h2>
          <div className="aspect-video w-full bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.868507151709!2d-52.331739404906884!3d-31.758263547672954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9511b55be85d7c99%3A0x7829527e8f532208!2sCasa%203%20Ambientes%20Personalizados!5e0!3m2!1spt-BR!2sbr!4v1730327637181!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>
        </div>

        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-6">Siga-nos nas Redes Sociais</h2>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.instagram.com/casa3.ambientespersonalizados/?hl=pt-br"
              className="w-12 h-12 flex items-center justify-center bg-colorc3 rounded-full hover:bg-colorc3verde  transition-colors duration-200"
            >
              <Instagram className="w-6 h-6 text-white" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100090031067776"
              className="w-12 h-12 flex items-center justify-center bg-colorc3 rounded-full hover:bg-colorc3verde transition-colors duration-200"
            >
              <Facebook className="w-6 h-6 text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};