import React, { useState } from 'react';  

const faqData = [  
  {  
    question: "Formas de Pagamento",  
    answer: "A vista, podendo pagar todo na assinatura do contrato com desconto, ou 60% na assinatura do contrato e 40% no dia que começar a montagem. Financiamento em até 36x com entrada para até 150 dias (mediante aprovação de crédito). Parcelamento no cartao em até 18x. Parcelamento em até 10x sem juros (no cartão ou no boleto). Pagamento antecipado (para aqueles que compraram na planta pode ir pagando antecipado uma parcela que achar adequado, e não terá juros e nem reajuste pelo prazo de 12 meses. para prazos maiores, também não terá juros, apenas o reajuste do material).",
  },  
  {  
    question: "Qual é o prazo de entrega?",  
    answer: "Entregamos montado em até 45 dias corridos.",  
  },  
  {  
    question: "Pode atrasar a entrega?",  
    answer: "Nós garantimos que a entrega seja feita em até 45 dias corridos.  o que pode ocorrer se tiver alguma assistência de alguma peça que tenha vindo danificada, ou tenha sido danificada na montagem prestamos assistência em até 15 dias. mas deixamos todos os móveis prontos, apenas aguardamos a assistência.",  
  },  
  {  
    question: "Como funciona o projeto?",  
    answer: "Nosso projeto é gratuito, fazemos todo o processo de design de interiores, inclusive ajudamos na escolha de acabamentos, cores, cortinas, papel de parede, decoração. Primeiro temos uma conversa com o cliente, que vai nos passar todas as informações necessárias para fazermos o projeto. medidas, plantas, inspirações, podem nos enviar audios, gostamos da conversa diretamente com nossos clientes, sabemos que esse momento de escolhas tem que ficar bem alinhado para ficar um projeto personalizado e exclusivo para cada gosto. Depois de todas as informações colhida, vamos para a parte da execução do projeto, entao marcamos a apresentação, é aquela hora que o cliente vem até a loja, toma um café gostoso, e definimos os detalhes. Se tiver alguma alteração no projeto marcamos uma nova apresentação e depois finalizamos o contrato, conferimos as medidas, e enviamos o pedido para a fábrica. Pronto é só aguardar, que em torno de 30 dias em média estamos agendando a montagem. Aí é só relaxar que tudo dará certo. só acompanhamos toda a montagem, e depois fazemos uma vistoria, se ficar alguma pendência, ajustamos para entregar e arrumar alguma coisa em até 15 dias. E por fim assinamos o termo de entrega final. Então a garantia de 5 anos para defeito de fábrica começa a correr!",  
  },  
  {  
    question: "Posso tirar foto do projeto para mostrar para meu conjuge? Ou vocês enviam uma foto pelo whats?",  
    answer: "Enviamos sim! Aí pedimos um adiantamento de R$150,00 por ambiente para enviar. Depois não se preocupe, esse valor será abatido do valor restante. Caso não feche o projeto com a gente esse valor fica como pagamento do projeto, que é cobrado apenas nesses casos.",  
  },  
  {  
    question: "Como funciona o financiamento?",  
    answer: "Trabalhamos com duas financieras a losango e o santander. Nossa taxa de juros variam de 2.5 até 2.95% ao mês enviamos os dados do cliente direto para o site dos bancos, e na hora recebemos a resposta sobre a aprovação do crédito. Depois é só formalizar a venda fazer a assinatura eletrônica.",  
  },  
  {  
  question: "Quais documentos que precisa para o financiamento?",  
  answer: "Nome completo, rg com data de expedição, cpf, nome da mãe, endereço, email, telefone e renda mensal",  
},  
];  

export default function FAQ() {  
  const [activeIndex, setActiveIndex] = useState<number | null>(null);  

  const toggleFAQ = (index: number) => {  
    setActiveIndex(activeIndex === index ? null : index);  
  };  

  return (  
    <div className="max-w-2xl mx-auto py-8 mb-16 mt-10">  
      <h2 className="text-3xl font-bold mb-6 text-center">Perguntas Frequentes</h2>  
      <div className="space-y-4 bg-colorc3brancobg shadow-md rounded-lg p-10">  
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