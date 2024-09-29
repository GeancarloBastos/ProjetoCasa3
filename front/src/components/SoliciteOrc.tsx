import React from 'react';  

export default function SoliciteOrcamento() {  
  return (  
    <div className="max-w-md mx-auto bg-colorc3verde text-white shadow-lg rounded-lg overflow-hidden p-6">  
      <h2 className="text-2xl font-bold mb-4">SOLICITE SEU ORÇAMENTO</h2>  
      <form>  
        <div className="mb-4">  
          <label className="block text-sm font-medium mb-2" htmlFor="nome">  
            Nome Completo*  
          </label>  
          <input  
            type="text"  
            id="nome"  
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"  
            placeholder="Nome Completo"  
            required  
          />  
        </div>  
        <div className="mb-4">  
          <label className="block text-sm font-medium mb-2" htmlFor="email">  
            Melhor E-mail*  
          </label>  
          <input  
            type="email"  
            id="email"  
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"  
            placeholder="Melhor E-mail"  
            required  
          />  
        </div>  
        <div className="mb-4">  
          <label className="block text-sm font-medium mb-2" htmlFor="telefone">  
            WhatsApp com DDD*  
          </label>  
          <input  
            type="tel"  
            id="telefone"  
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"  
            placeholder="WhatsApp com DDD"  
            required  
          />  
        </div>  
        <button  
          type="submit"  
          className="w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-900"  
        >  
          ENVIAR  
        </button>  
      </form>  
    </div>  
  );  
}