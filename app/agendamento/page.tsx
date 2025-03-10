'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AppointmentForm from '../components/AppointmentForm'
import AppointmentCalendar from '../components/AppointmentCalendar'
import Image from 'next/image'

export default function AgendamentoPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 vintage-bg">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gold-DEFAULT font-serif">
                Agende seu Serviço
              </h1>
              <p className="text-light-dark mb-8 text-lg">
                Escolha o melhor dia e horário para cuidar do seu veículo. Nossa equipe de especialistas está pronta para oferecer o melhor serviço de estética automotiva, com atenção especial para carros clássicos e de luxo.
              </p>
              <div className="space-y-4 text-light-dark">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gold-DEFAULT" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Atendimento personalizado</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gold-DEFAULT" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Produtos premium</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gold-DEFAULT" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Técnicas avançadas</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gold-DEFAULT" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Satisfação garantida</span>
                </div>
              </div>
            </div>
            
            <div className="relative h-[400px] rounded-sm overflow-hidden vintage-border animate-fade-in">
              <div className="w-full h-full">
                <img
                  src="/images/cars/classic-car-1.jpg"
                  alt="Agendamento Mucio Car"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Appointment Form Section */}
      <section className="py-20 bg-dark-light">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <AppointmentForm 
                selectedDate={selectedDate} 
                selectedTime={selectedTime}
              />
            </div>
            <div>
              <AppointmentCalendar 
                selectedDate={selectedDate} 
                onDateSelect={handleDateSelect}
                onTimeSelect={handleTimeSelect}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 vintage-bg">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="section-title-center mb-16">Perguntas Frequentes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="vintage-card">
              <h3 className="text-xl font-bold mb-4 text-gold-DEFAULT font-serif">Quanto tempo dura cada serviço?</h3>
              <p className="text-light-dark">O tempo varia de acordo com o serviço e o tamanho do veículo. Uma lavagem detalhada pode levar de 2 a 3 horas, enquanto um polimento completo pode levar um dia inteiro.</p>
            </div>
            
            <div className="vintage-card">
              <h3 className="text-xl font-bold mb-4 text-gold-DEFAULT font-serif">Preciso deixar o carro o dia todo?</h3>
              <p className="text-light-dark">Para serviços mais complexos como polimento e cristalização, recomendamos deixar o veículo conosco. Para lavagens e higienizações simples, você pode aguardar no local.</p>
            </div>
            
            <div className="vintage-card">
              <h3 className="text-xl font-bold mb-4 text-gold-DEFAULT font-serif">Quais formas de pagamento são aceitas?</h3>
              <p className="text-light-dark">Aceitamos dinheiro, PIX, cartões de débito e crédito. Para serviços acima de R$ 500, oferecemos parcelamento em até 3x sem juros.</p>
            </div>
            
            <div className="vintage-card">
              <h3 className="text-xl font-bold mb-4 text-gold-DEFAULT font-serif">Posso cancelar ou remarcar meu agendamento?</h3>
              <p className="text-light-dark">Sim, você pode cancelar ou remarcar com até 24 horas de antecedência sem custo adicional. Cancelamentos com menos de 24 horas podem estar sujeitos a uma taxa.</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 