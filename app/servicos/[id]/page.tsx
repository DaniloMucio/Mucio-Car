'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getServiceById, Service } from '../../data/services';

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'process' | 'products'>('details');
  
  useEffect(() => {
    if (params.id) {
      const serviceData = getServiceById(params.id as string);
      if (serviceData) {
        setService(serviceData);
      } else {
        router.push('/');
      }
    }
  }, [params.id, router]);
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center vintage-bg">
        <div className="animate-spin h-12 w-12 border-4 border-gold-DEFAULT rounded-full border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-dark-DEFAULT">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover brightness-[0.3]"
            />
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gold-DEFAULT font-serif animate-fade-in">
              {service.title}
            </h1>
            <p className="text-xl text-light-DEFAULT mb-8 animate-slide-up">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4 mb-8 animate-slide-up">
              <div className="vintage-card py-3 px-6">
                <span className="text-gold-light font-bold">{service.price}</span>
              </div>
              <div className="vintage-card py-3 px-6">
                <span className="text-gold-light font-bold">Duração: {service.duration}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
              <Link href="/agendamento" className="btn-primary">
                Agendar Agora
              </Link>
              <button onClick={() => window.history.back()} className="btn-secondary">
                Voltar
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tabs Section */}
      <section className="py-12 bg-dark-light">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex border-b border-gray-700 mb-8">
              <button
                className={`py-3 px-6 font-bold text-sm uppercase tracking-wider ${
                  activeTab === 'details' 
                    ? 'text-gold-DEFAULT border-b-2 border-gold-DEFAULT' 
                    : 'text-light-dark hover:text-gold-light'
                }`}
                onClick={() => setActiveTab('details')}
              >
                Detalhes Técnicos
              </button>
              <button
                className={`py-3 px-6 font-bold text-sm uppercase tracking-wider ${
                  activeTab === 'process' 
                    ? 'text-gold-DEFAULT border-b-2 border-gold-DEFAULT' 
                    : 'text-light-dark hover:text-gold-light'
                }`}
                onClick={() => setActiveTab('process')}
              >
                Processo
              </button>
              <button
                className={`py-3 px-6 font-bold text-sm uppercase tracking-wider ${
                  activeTab === 'products' 
                    ? 'text-gold-DEFAULT border-b-2 border-gold-DEFAULT' 
                    : 'text-light-dark hover:text-gold-light'
                }`}
                onClick={() => setActiveTab('products')}
              >
                Produtos
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="animate-fade-in">
              {activeTab === 'details' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gold-DEFAULT font-serif">Detalhes Técnicos</h2>
                  
                  <div className="space-y-8 mb-8">
                    {service.technicalDetails.map((detail, index) => (
                      <div key={index} className="vintage-card">
                        <h3 className="text-xl font-bold mb-3 text-gold-DEFAULT font-serif">{detail.title}</h3>
                        <p className="text-light-dark">{detail.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-gold-DEFAULT font-serif">Benefícios</h3>
                  <ul className="space-y-2 mb-8">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gold-DEFAULT flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-light-dark">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="vintage-card">
                    <h3 className="text-xl font-bold mb-3 text-gold-DEFAULT font-serif">Recomendação</h3>
                    <p className="text-light-dark">{service.recommendation}</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'process' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gold-DEFAULT font-serif">Processo de {service.title}</h2>
                  
                  <div className="space-y-6 mb-8">
                    {service.process.map((step) => (
                      <div key={step.step} className="vintage-card">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-full bg-gold-DEFAULT text-dark-DEFAULT flex items-center justify-center font-bold mr-4">
                            {step.step}
                          </div>
                          <h3 className="text-xl font-bold text-gold-DEFAULT font-serif">{step.title}</h3>
                        </div>
                        <p className="text-light-dark">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'products' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gold-DEFAULT font-serif">Produtos Utilizados</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {service.products.map((product, index) => (
                      <div key={index} className="vintage-card">
                        <h3 className="text-xl font-bold mb-3 text-gold-DEFAULT font-serif">{product.name}</h3>
                        <p className="text-light-dark">{product.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 vintage-bg">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gold-DEFAULT font-serif">Pronto para Transformar seu Veículo?</h2>
          <p className="text-light-dark text-lg mb-8 max-w-2xl mx-auto">
            Agende seu horário agora mesmo e experimente o melhor serviço de estética automotiva da cidade.
          </p>
          <Link href="/agendamento" className="btn-primary">
            Agendar {service.title}
          </Link>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 