'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import { getTestimonials } from '../services/testimonialService'
import { Testimonial } from '../models/Testimonial'

export default function Testimonials() {
  const [depoimentos, setDepoimentos] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Carregar depoimentos quando o componente é montado
  useEffect(() => {
    const loadTestimonials = () => {
      try {
        setIsLoading(true);
        const allTestimonials = getTestimonials();
        console.log('Todos os depoimentos carregados:', allTestimonials);
        
        // Ordenar por data (mais recentes primeiro)
        const sortedTestimonials = [...allTestimonials].sort((a, b) => {
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
    loadTestimonials();
    
    // Configurar um intervalo para verificar novos depoimentos a cada 5 segundos
    const intervalId = setInterval(loadTestimonials, 5000);
    
    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []);

  // Renderizar estrelas
  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg 
          key={i} 
          className={`w-5 h-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`} 
          fill="currentColor" 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }
    return stars
  }

  // Formatar data
  const formatDate = (dateString: string) => {
    try {
      const parts = dateString.split('/');
      if (parts.length === 3) {
        const [day, month, year] = parts;
        const date = new Date(`${year}-${month}-${day}`);
        return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
      }
      return dateString;
    } catch (error) {
      return dateString;
    }
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

  return (
    <section id="testimonials" className="py-16 bg-dark vintage-bg">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="section-title-center mb-12">O que nossos clientes dizem</h2>
        
        {isLoading ? (
          <div className="text-center py-8">
            <svg className="animate-spin h-8 w-8 text-gold-DEFAULT mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-2 text-light">Carregando depoimentos...</p>
          </div>
        ) : depoimentos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-light">Ainda não temos depoimentos. Seja o primeiro a avaliar!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {depoimentos.map(depoimento => (
              <div key={depoimento.id} className="vintage-card hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  {renderAvatar(depoimento.isPositive, depoimento.name)}
                  <div className="ml-4">
                    <h3 className="font-bold text-lg text-gold-DEFAULT">{depoimento.name || 'Cliente'}</h3>
                    <div className="flex">
                      {renderStars(depoimento.rating)}
                    </div>
                  </div>
                </div>
                
                {(depoimento.vehicleModel || depoimento.service) && (
                  <div className="mb-3 text-sm">
                    {depoimento.vehicleModel && (
                      <p className="text-gold-light">
                        <span className="font-semibold">Veículo:</span> {depoimento.vehicleModel}
                      </p>
                    )}
                    {depoimento.service && (
                      <p className="text-gold-light">
                        <span className="font-semibold">Serviço:</span> {depoimento.service}
                      </p>
                    )}
                  </div>
                )}
                
                <p className="text-light mb-2">{depoimento.comment}</p>
                <p className="text-sm text-gray-400 mb-4">{formatDate(depoimento.date)}</p>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-8">
          <Link href="/depoimentos" className="btn-secondary">
            Ver Todos os Depoimentos
          </Link>
        </div>
      </div>
    </section>
  )
} 