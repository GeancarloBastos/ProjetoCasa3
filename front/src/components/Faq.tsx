import React, { useState } from 'react';  

const faqData = [  
  {  
    question: "Quais os documentos preciso para o financiamento?",  
    answer: "Você pode entrar em contato com o suporte através do nosso formulário de contato ou pelo telefone disponível em nosso site.",  
  },  
  {  
    question: "Qual é o horário de atendimento?",  
    answer: "Nosso horário de atendimento é de segunda a sexta, das 9h às 18h.",  
  },  
  {  
    question: "Como faço para alterar minha senha pq sou uma anta?",  
    answer: "Para alterar sua senha, acesse a seção de configurações da sua conta e siga as instruções.",  
  },  
];  

export default function FAQ() {  
  const [activeIndex, setActiveIndex] = useState<number | null>(null);  

  const toggleFAQ = (index: number) => {  
    setActiveIndex(activeIndex === index ? null : index);  
  };  

  return (  
    <div className="max-w-2xl mx-auto py-8">  
      <h2 className="text-3xl font-bold mb-6 text-center">Perguntas Frequentes</h2>  
      <div className="space-y-4 bg-white shadow-md rounded-lg p-10">  
        {faqData.map((item, index) => (  
          <div key={index} className="border-b border-gray-200 pb-4">  
            <button  
              className="w-full flex justify-between items-center text-left text-lg font-semibold focus:outline-none"  
              onClick={() => toggleFAQ(index)}  
            >  
              {item.question}  
              <svg  
                className={`w-5 h-5 transform transition-transform duration-300 ${  
                  activeIndex === index ? 'rotate-90' : 'rotate-0'  
                }`}  
                fill="none"  
                stroke="currentColor"  
                viewBox="0 0 24 24"  
                xmlns="http://www.w3.org/2000/svg"  
              >  
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />  
              </svg>  
            </button>  
            {activeIndex === index && (  
              <p className="mt-2 text-gray-700">{item.answer}</p>  
            )}  
          </div>  
        ))}  
      </div>  
    </div>  
  );  
}