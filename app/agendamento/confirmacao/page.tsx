'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAppointment } from '../../context/AppointmentContext';

export default function ConfirmacaoPage() {
  const router = useRouter();
  const { appointmentData } = useAppointment();
  
  useEffect(() => {
    // Redirecionar para a página de agendamento se não houver dados
    if (!appointmentData) {
      router.push('/agendamento');
    }
  }, [appointmentData, router]);
  
  if (!appointmentData) {
    return null; // Não renderizar nada enquanto redireciona
  }
  
  // Formatar a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 vintage-bg">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-block mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gold-DEFAULT mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gold-DEFAULT font-serif">
              Agendamento Confirmado!
            </h1>
            
            <p className="text-light-dark mb-6 text-lg">
              Seu agendamento foi realizado com sucesso. Os detalhes foram enviados para o atendente responsável via WhatsApp.
            </p>

            <div className="bg-dark-light/30 p-4 rounded-md mb-12 border-l-4 border-gold-DEFAULT">
              <p className="text-light-dark text-lg">
                <span className="text-gold-DEFAULT font-bold">Importante:</span> Caso precise cancelar ou remarcar seu agendamento, entre em contato conosco com pelo menos <span className="text-gold-light font-bold">3 horas de antecedência</span> pelo WhatsApp <a href="https://wa.me/5516997855627" target="_blank" rel="noopener noreferrer" className="text-gold-DEFAULT underline hover:text-gold-light">(16) 99785-5627</a> ou por telefone.
              </p>
            </div>
            
            <div className="vintage-card mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gold-DEFAULT font-serif">Detalhes do Agendamento</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-gold-light font-bold">Nome:</p>
                  <p className="text-light-dark mb-4">{appointmentData.name}</p>
                </div>
                
                <div>
                  <p className="text-gold-light font-bold">Serviço:</p>
                  <p className="text-light-dark mb-4">{appointmentData.service}</p>
                </div>
                
                <div>
                  <p className="text-gold-light font-bold">Data:</p>
                  <p className="text-light-dark mb-4">{formatDate(appointmentData.date)}</p>
                </div>
                
                <div>
                  <p className="text-gold-light font-bold">Horário:</p>
                  <p className="text-light-dark mb-4">{appointmentData.time}</p>
                </div>
                
                <div>
                  <p className="text-gold-light font-bold">Veículo:</p>
                  <p className="text-light-dark mb-4">{appointmentData.vehicle}</p>
                </div>
                
                {appointmentData.message && (
                  <div className="md:col-span-2">
                    <p className="text-gold-light font-bold">Observações:</p>
                    <p className="text-light-dark mb-4">{appointmentData.message}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/" className="btn-primary">
                Voltar para Home
              </Link>
              <Link href="/agendamento" className="btn-secondary">
                Novo Agendamento
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 