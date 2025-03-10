'use client';

import { useEffect, useState, Suspense, lazy } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/Navbar';
import ServiceCard from './components/ServiceCard';
import { useRouter } from 'next/navigation';
import { services } from './data/services';
import FeedbackButton from './components/FeedbackButton';
import TestimonialCard from './components/TestimonialCard';
import { getApprovedTestimonials } from './services/testimonialService';
import Logo from './components/Logo';
import { getRecentImages } from './services/galleryService';
import ContactForm from './components/ContactForm';

// Lazy load componentes pesados
const ClientTestimonials = lazy(() => import('./components/ClientTestimonials'));

// Componente de fallback para lazy loading
const LoadingFallback = () => (
  <div className="py-20 text-center">
    <div className="inline-block w-8 h-8 border-4 border-gold-DEFAULT border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-light-dark">Carregando...</p>
  </div>
);

export default function Home() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Usar scrollIntoView com behavior: 'smooth' para uma rolagem mais suave
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAgendamento = () => {
    router.push('/agendamento');
  };

  useEffect(() => {
    // Marcar como carregado após a montagem do componente
    setIsLoaded(true);

    // Implementar Intersection Observer para carregar seções apenas quando visíveis
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId && !visibleSections.includes(sectionId)) {
            setVisibleSections(prev => [...prev, sectionId]);
          }
        }
      });
    }, observerOptions);

    // Observar todas as seções
    document.querySelectorAll('section[id]').forEach(section => {
      sectionObserver.observe(section);
    });

    return () => {
      // Limpar o observer quando o componente for desmontado
      sectionObserver.disconnect();
    };
  }, [visibleSections]);

  // Seção de Galeria
  const GallerySection = () => {
    return (
      <div className="relative py-16 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1583&auto=format&fit=crop)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="container mx-auto px-4 relative z-10">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-yellow-500 mb-4 font-serif vintage-text">Nossa Galeria</h2>
            <p className="text-xl text-light-dark italic mb-6">
              "Cada veículo conta uma história, nós ajudamos a preservá-la"
            </p>
          </div>
          
          {/* Conteúdo central */}
          <div className="vintage-card max-w-3xl mx-auto p-8 text-center">
            <h3 className="text-2xl font-bold text-yellow-500 mb-6 font-serif">Excelência em Estética Automotiva</h3>
            <p className="text-light-dark mb-6">
              Nossa galeria apresenta os melhores trabalhos realizados pela equipe Mucio Car. 
              Cada projeto é executado com atenção meticulosa aos detalhes, 
              utilizando produtos premium e técnicas avançadas para garantir resultados excepcionais.
            </p>
            <p className="text-light-dark">
              Visite nossa oficina para conhecer mais sobre nossos serviços de estética automotiva 
              e ver pessoalmente a qualidade do nosso trabalho.
            </p>
          </div>
          
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-dark text-light">
      <Logo visible={true} size="large" />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/cars/classic-car-1.jpg" 
            alt="Mucio Car - Estética Automotiva" 
            fill 
            priority
            style={{objectFit: 'cover'}}
            className="w-full h-full object-cover brightness-[0.3]"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
            Estética Automotiva <span className="text-yellow-500">Premium</span>
          </h1>
          <p className="text-xl text-light mb-8 max-w-3xl mx-auto">
            Transformamos seu veículo com serviços de alta qualidade, 
            utilizando produtos premium e técnicas avançadas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => scrollToSection('services')} 
              className="vintage-button"
            >
              Nossos Serviços
            </button>
            <button 
              onClick={handleAgendamento} 
              className="vintage-button-secondary"
            >
              Agendar Agora
            </button>
          </div>
        </div>
      </section>
      
      {/* Intro Section */}
      <section id="intro" className="py-20 vintage-bg">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="section-title">Bem-vindo à Mucio Car</h2>
              <p className="text-light-dark mb-6">
                Desde 2016, a Mucio Car tem sido sinônimo de excelência em estética automotiva em Araraquara. 
                Nossa paixão por carros e atenção aos detalhes nos tornou referência no cuidado de veículos clássicos e modernos.
              </p>
              <p className="text-light-dark mb-6">
                Utilizamos produtos premium e técnicas avançadas para garantir resultados excepcionais, 
                preservando a beleza e o valor do seu veículo.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-yellow-500">8+</p>
                  <p className="text-light-dark">Anos de Experiência</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-yellow-500">1500+</p>
                  <p className="text-light-dark">Clientes Satisfeitos</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-yellow-500">12+</p>
                  <p className="text-light-dark">Serviços Especializados</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-yellow-500">100%</p>
                  <p className="text-light-dark">Satisfação Garantida</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-sm overflow-hidden vintage-border animate-on-scroll">
              <Image 
                src="/images/cars/classic-car-2.jpg"
                alt="Estética automotiva profissional"
                fill 
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Nossos Serviços</h2>
          <p className="section-subtitle">
            Oferecemos uma variedade de serviços de estética automotiva para manter seu veículo impecável
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                price={service.price}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Client Testimonials Section */}
      {isLoaded && (
        <Suspense fallback={<LoadingFallback />}>
          <ClientTestimonials />
        </Suspense>
      )}
      
      {/* Gallery Section */}
      <GallerySection />
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-dark-light">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="section-title-center mb-12">Entre em Contato</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="animate-on-scroll">
              <div className="vintage-card p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-yellow-500 font-serif">Informações de Contato</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-light-dark">
              <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                    <span>Rua Bahia, 2186<br />Araraquara, SP<br />CEP 14.808-653</span>
              </div>
              <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                    <span>(16) 99785-5627</span>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>contato@muciocar.com.br</span>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Segunda a Sexta:<br />8h às 18h<br />Sábados:<br />8h às 12h</span>
                  </div>
              </div>
              
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <h4 className="text-lg font-bold mb-3 text-yellow-500 font-serif">Siga-nos</h4>
                  <div className="flex space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light-dark hover:text-yellow-400 transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light-dark hover:text-yellow-400 transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-light-dark hover:text-yellow-400 transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://wa.me/5516997855627" target="_blank" rel="noopener noreferrer" className="text-light-dark hover:text-yellow-400 transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="relative h-[300px] rounded-sm overflow-hidden vintage-border animate-on-scroll">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.9554534153!2d-48.1835!3d-21.7935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b8f3fc2e41bbd7%3A0x1cb3f1800e2c1ab!2sR.%20Bahia%2C%202186%20-%20Araraquara%2C%20SP%2C%2014808-653!5e0!3m2!1spt-BR!2sbr!4v1709953800!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="vintage-border"
                  title="Localização Mucio Car"
                ></iframe>
              </div>
            </div>
            
            <div className="animate-on-scroll">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      <FeedbackButton />
      
    </div>
  );
} 