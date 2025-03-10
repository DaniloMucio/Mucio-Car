'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppointment } from '../context/AppointmentContext';
import { createAppointment, isTimeSlotAvailable } from '../services/appointmentService';

interface AppointmentFormProps {
  selectedDate?: string;
  selectedTime?: string;
}

export default function AppointmentForm({ selectedDate, selectedTime }: AppointmentFormProps) {
  const router = useRouter();
  const { setAppointmentData } = useAppointment();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    service: 'Lavagem Detalhada',
    date: selectedDate || '',
    time: selectedTime || '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const services = [
    'Lavagem Detalhada',
    'Polimento Profissional',
    'Cristalização',
    'Higienização Interna',
    'Restauração de Faróis',
    'Proteção de Pintura',
  ];
  
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];
  
  // Atualizar a data quando a propriedade selectedDate mudar
  useEffect(() => {
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        date: selectedDate
      }));
    }
  }, [selectedDate]);
  
  // Atualizar o horário quando a propriedade selectedTime mudar
  useEffect(() => {
    if (selectedTime) {
      setFormData(prev => ({
        ...prev,
        time: selectedTime
      }));
    }
  }, [selectedTime]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro quando o campo é preenchido
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    if (!formData.vehicle.trim()) newErrors.vehicle = 'Veículo é obrigatório';
    if (!formData.date) newErrors.date = 'Data é obrigatória';
    if (!formData.time) newErrors.time = 'Horário é obrigatório';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Verificar se o horário está disponível
      if (!isTimeSlotAvailable(formData.date, formData.time)) {
        alert('Este horário já está agendado. Por favor, escolha outro horário.');
        setIsSubmitting(false);
        return;
      }
      
      // Criar o agendamento
      const newAppointment = createAppointment(formData);
      
      // Salvar dados no contexto
      setAppointmentData(formData);
      
      // Preparar mensagem para WhatsApp
      const message = `
*Novo Agendamento - Mucio Car*
----------------------------
*Nome:* ${formData.name}
*Email:* ${formData.email}
*Telefone:* ${formData.phone}
*Veículo:* ${formData.vehicle}
*Serviço:* ${formData.service}
*Data:* ${formData.date}
*Horário:* ${formData.time}
${formData.message ? `*Observações:* ${formData.message}` : ''}
----------------------------
`;
      
      // Número do WhatsApp da Mucio Car (substitua pelo número correto)
      const whatsappNumber = '5516997855627';
      
      // Criar URL do WhatsApp
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
      
      // Abrir WhatsApp em uma nova janela
      window.open(whatsappUrl, '_blank');
      
      // Redirecionar para confirmação
      router.push('/agendamento/confirmacao');
    } catch (error) {
      console.error('Erro ao agendar:', error);
      alert('Ocorreu um erro ao processar seu agendamento. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="vintage-card">
      <h2 className="text-2xl font-bold mb-6 text-yellow-500 font-serif">Agende seu Serviço</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-light-dark mb-2">Nome Completo*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`vintage-input ${errors.name ? 'border-red-700' : ''}`}
              placeholder="Seu nome completo"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-light-dark mb-2">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`vintage-input ${errors.email ? 'border-red-700' : ''}`}
              placeholder="seu.email@exemplo.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-light-dark mb-2">Telefone*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`vintage-input ${errors.phone ? 'border-red-700' : ''}`}
              placeholder="(00) 00000-0000"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          
          <div>
            <label htmlFor="vehicle" className="block text-light-dark mb-2">Veículo*</label>
            <input
              type="text"
              id="vehicle"
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              className={`vintage-input ${errors.vehicle ? 'border-red-700' : ''}`}
              placeholder="Marca, modelo e ano"
            />
            {errors.vehicle && <p className="text-red-500 text-sm mt-1">{errors.vehicle}</p>}
          </div>
          
          <div>
            <label htmlFor="service" className="block text-light-dark mb-2">Serviço*</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="vintage-input"
            >
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="date" className="block text-light-dark mb-2">Data*</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`vintage-input ${errors.date ? 'border-red-700' : ''}`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>
          
          <div>
            <label htmlFor="time" className="block text-light-dark mb-2">Horário*</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`vintage-input ${errors.time ? 'border-red-700' : ''}`}
            >
              <option value="">Selecione um horário</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-light-dark mb-2">Observações</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="vintage-input resize-none"
            placeholder="Informações adicionais sobre o serviço ou seu veículo"
          ></textarea>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="vintage-button w-full flex justify-center items-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </>
            ) : (
              'Agendar Serviço'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 