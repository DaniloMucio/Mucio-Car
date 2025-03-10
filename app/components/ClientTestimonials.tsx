'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { getApprovedTestimonials } from '../services/testimonialService'
import { Testimonial } from '../services/testimonialService'

export default function ClientTestimonials() {
  const [depoimentos, setDepoimentos] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Carregar depoimentos quando o componente é montado
  useEffect(() => {
    const loadDepoimentos = () => {
      try {
        setIsLoading(true);
        const approvedTestimonials = getApprovedTestimonials();
        console.log('Todos os depoimentos carregados:', approvedTestimonials);
        
        // Ordenar por data (mais recentes primeiro)
        const sortedTestimonials = [...approvedTestimonials].sort((a, b) => {
          // Converter datas no formato DD/MM/YYYY para objetos Date
          const [dayA, monthA, yearA] = a.date.split('/').map(Number);
          const [dayB, monthB, yearB] = b.date.split('/').map(Number);
          
          const dateA = new Date(yearA, monthA - 1, dayA);
          const dateB = new Date(yearB, monthB - 1, dayB);
          
          return dateB.getTime() - dateA.getTime();
        });
        
        // Pegar apenas os 3 mais recentes
        const latestTestimonials = sortedTestimonials.slice(0, 3);
        console.log('3 depoimentos mais recentes:', latestTestimonials);
        
        setDepoimentos(latestTestimonials);
      } catch (error) {
        console.error('Erro ao carregar depoimentos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Carregar os depoimentos inicialmente
    loadDepoimentos();
    
    // Configurar um intervalo para verificar novos depoimentos a cada 5 segundos
    const intervalId = setInterval(loadDepoimentos, 5000);
    
    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []);

  // Renderizar estrelas
  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-xl ${
            i <= rating ? 'text-yellow-500' : 'text-gray-400'
          }`}
        >
          ★
        </span>
      )
    }
    return stars
  }

  // Formatar data
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  }

  // Renderizar avatar baseado na avaliação
  const renderAvatar = (isPositive: boolean, name: string) => {
    // Avaliação positiva (3 ou mais estrelas)
    if (isPositive) {
      return (
        <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
        </div>
      )
    } 
    // Avaliação negativa (1 ou 2 estrelas)
    else {
      return (
        <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2" />
          </svg>
        </div>
      )
    }
  }

  // Renderizar um depoimento
  const renderDepoimento = (depoimento: Testimonial) => {
    if (!depoimento) {
      return (
        <div className="vintage-card">
          <p className="text-light-dark">Depoimento não disponível</p>
        </div>
      );
    } else {
      return (
        <div className="vintage-card h-full flex flex-col">
          <div className="flex-grow">
            <div className="flex items-center mb-4">
              {renderAvatar(depoimento.isPositive, depoimento.name)}
              <div className="ml-4">
                <h3 className="font-bold text-lg text-yellow-500">{depoimento.name || 'Cliente'}</h3>
                <div className="flex">
                  {renderStars(depoimento.rating)}
                </div>
              </div>
            </div>
            
            {(depoimento.vehicleModel || depoimento.service) && (
              <div className="mb-3 text-sm">
                {depoimento.vehicleModel && (
                  <p className="text-yellow-light">
                    <span className="font-semibold">Veículo:</span> {depoimento.vehicleModel}
                  </p>
                )}
                {depoimento.service && (
                  <p className="text-yellow-light">
                    <span className="font-semibold">Serviço:</span> {depoimento.service}
                  </p>
                )}
              </div>
            )}
            
            <p className="text-light mb-4">{depoimento.comment}</p>
            
            {depoimento.response && (
              <div className="mt-4 p-4 bg-yellow-DEFAULT/10 rounded-md border-l-4 border-yellow-DEFAULT">
                <p className="text-sm font-semibold text-yellow-500 mb-1">Resposta da Mucio Car:</p>
                <p className="text-light-dark">{depoimento.response}</p>
                {depoimento.responseDate && (
                  <p className="text-xs text-light-dark mt-2">
                    Respondido em {formatDate(depoimento.responseDate)}
                  </p>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-xs text-light-dark">
              {formatDate(depoimento.date)}
            </p>
          </div>
        </div>
      );
    }
  }

  return (
    <section id="client-testimonials" className="py-20 bg-dark">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="section-title">O que nossos clientes dizem</h2>
        
        <div className="mt-12">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-yellow-DEFAULT border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-light-dark">Carregando depoimentos...</p>
            </div>
          ) : depoimentos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-light-dark">Nenhum depoimento disponível no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {depoimentos.map((depoimento) => (
                <div key={depoimento.id} className="h-full">
                  {renderDepoimento(depoimento)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
} 