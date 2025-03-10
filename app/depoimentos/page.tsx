'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Footer from '../components/Footer';
import { getTestimonials } from '../services/testimonialService';
import { Testimonial } from '../models/Testimonial';
import FeedbackButton from '../components/FeedbackButton';

export default function DepoimentosPage() {
  const [depoimentos, setDepoimentos] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtro, setFiltro] = useState<'todos' | 'positivos' | 'negativos'>('todos');
  
  // Carregar depoimentos quando o componente é montado
  useEffect(() => {
    const loadTestimonials = () => {
      try {
        setIsLoading(true);
        const testimonials = getTestimonials();
        console.log('Depoimentos carregados:', testimonials);
        setDepoimentos(testimonials);
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
  
  // Filtrar depoimentos
  const depoimentosFiltrados = depoimentos.filter(depoimento => {
    if (filtro === 'todos') return true;
    if (filtro === 'positivos') return depoimento.isPositive;
    if (filtro === 'negativos') return !depoimento.isPositive;
    return true;
  });
  
  // Renderizar estrelas
  const renderStars = (rating: number) => {
    const stars = [];
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
      );
    }
    return stars;
  };
  
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
  };
  
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="pt-16 pb-16 vintage-bg">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gold-DEFAULT font-serif text-center">
            Mural de Depoimentos
          </h1>
          <p className="text-light-dark mb-8 text-lg text-center max-w-3xl mx-auto">
            Confira o que nossos clientes estão dizendo sobre nossos serviços de estética automotiva. 
            Compartilhe também a sua experiência clicando no botão de feedback.
          </p>
          
          {/* Filtros */}
          <div className="flex justify-center mb-8 space-x-4">
            <button 
              onClick={() => setFiltro('todos')} 
              className={`px-4 py-2 rounded-sm transition-all ${filtro === 'todos' ? 'bg-gold-DEFAULT text-dark font-bold' : 'bg-dark text-light-dark border border-gold-DEFAULT/30 hover:border-gold-DEFAULT'}`}
            >
              Todos os Depoimentos
            </button>
            <button 
              onClick={() => setFiltro('positivos')} 
              className={`px-4 py-2 rounded-sm transition-all ${filtro === 'positivos' ? 'bg-green-600 text-white font-bold' : 'bg-dark text-light-dark border border-green-600/30 hover:border-green-600'}`}
            >
              Avaliações Positivas
            </button>
            <button 
              onClick={() => setFiltro('negativos')} 
              className={`px-4 py-2 rounded-sm transition-all ${filtro === 'negativos' ? 'bg-red-600 text-white font-bold' : 'bg-dark text-light-dark border border-red-600/30 hover:border-red-600'}`}
            >
              Avaliações Negativas
            </button>
          </div>
        </div>
      </section>
      
      {/* Depoimentos Section */}
      <section className="py-16 bg-dark-light">
        <div className="container mx-auto px-4 md:px-8">
          {isLoading ? (
            <div className="text-center py-8">
              <svg className="animate-spin h-12 w-12 text-gold-DEFAULT mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-4 text-light text-xl">Carregando depoimentos...</p>
            </div>
          ) : depoimentosFiltrados.length === 0 ? (
            <div className="text-center py-16">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gold-DEFAULT mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <h2 className="text-2xl font-bold text-gold-DEFAULT mb-2">Nenhum depoimento encontrado</h2>
              <p className="text-light-dark">
                {filtro === 'todos' 
                  ? 'Ainda não temos depoimentos. Seja o primeiro a compartilhar sua experiência!' 
                  : filtro === 'positivos' 
                    ? 'Ainda não temos avaliações positivas. Seja o primeiro a compartilhar uma experiência positiva!' 
                    : 'Ainda não temos avaliações negativas. Isso é bom! Significa que nossos clientes estão satisfeitos.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {depoimentosFiltrados.map(depoimento => (
                <div key={depoimento.id} className="vintage-card hover:shadow-lg transition-shadow relative overflow-hidden">
                  {/* Indicador de avaliação positiva/negativa */}
                  <div className={`absolute top-0 right-0 w-0 h-0 border-t-[50px] ${depoimento.isPositive ? 'border-t-green-600' : 'border-t-red-600'} border-l-[50px] border-l-transparent`}></div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${depoimento.isPositive ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                        {depoimento.isPositive ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-bold text-lg text-gold-DEFAULT">{depoimento.name}</h3>
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
                    
                    <div className="bg-gray-800/50 p-4 rounded-sm mb-3 relative">
                      <svg className="absolute top-0 left-4 -mt-3 text-gold-DEFAULT/30 h-6 w-6 transform rotate-180" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      </svg>
                      <p className="text-light italic">{depoimento.comment}</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-400">{formatDate(depoimento.date)}</p>
                      <div className={`px-2 py-1 rounded-sm text-xs font-bold ${depoimento.isPositive ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                        {depoimento.isPositive ? 'Recomenda' : 'Não Recomenda'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Paginação (para futura implementação) */}
          {depoimentosFiltrados.length > 0 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-1 bg-dark text-light-dark border border-gold-DEFAULT/30 rounded-sm hover:border-gold-DEFAULT">
                  Anterior
                </button>
                <button className="px-3 py-1 bg-gold-DEFAULT text-dark font-bold rounded-sm">
                  1
                </button>
                <button className="px-3 py-1 bg-dark text-light-dark border border-gold-DEFAULT/30 rounded-sm hover:border-gold-DEFAULT">
                  2
                </button>
                <button className="px-3 py-1 bg-dark text-light-dark border border-gold-DEFAULT/30 rounded-sm hover:border-gold-DEFAULT">
                  3
                </button>
                <button className="px-3 py-1 bg-dark text-light-dark border border-gold-DEFAULT/30 rounded-sm hover:border-gold-DEFAULT">
                  Próximo
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>
      
      <FeedbackButton />
      
      <Footer />
    </main>
  );
} 