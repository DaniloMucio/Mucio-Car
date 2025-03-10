'use client'

import { useState, useRef } from 'react'
import { useAppointment, isSameDay } from '../../context/AppointmentContext'
import RatingModal from '../ui/RatingModal'
import { useRouter } from 'next/navigation'

// Mapeamento de IDs para nomes de serviços
const servicosMap = {
  '1': { nome: 'Lavagem Completa', preco: 'A partir de R$ 120,00' },
  '2': { nome: 'Polimento Especializado', preco: 'R$ 350,00' },
  '3': { nome: 'Detalhamento Interior', preco: 'R$ 280,00' },
  '4': { nome: 'Cristalização de Pintura', preco: 'R$ 450,00' },
  '5': { nome: 'Higienização de Ar-Condicionado', preco: 'R$ 150,00' }
}

// Mapeamento de IDs para nomes de profissionais
const profissionaisMap = {
  '1': 'Bruno Mucio',
  '2': 'Carlos Oliveira',
  '3': 'André Santos',
  '4': 'Marcos Pereira'
}

// Número de WhatsApp para enviar os dados
const WHATSAPP_NUMBER = '5516996434531' // Número da Mucio Car

// Função para formatar o telefone
const formatPhone = (value: string) => {
  // Remove tudo que não for número
  const numbers = value.replace(/\D/g, '')
  
  // Aplica a máscara conforme a quantidade de números
  if (numbers.length <= 11) {
    return numbers.replace(/(\d{2})(\d{0,5})(\d{0,4})/, (_, ddd, first, second) => {
      if (second) return `(${ddd}) ${first}-${second}`
      if (first) return `(${ddd}) ${first}`
      if (ddd) return `(${ddd}`
      return ''
    })
  }
  return value
}

export default function AppointmentForm() {
  const { appointmentData, setAppointmentData, clearAppointmentData } = useAppointment()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [acceptMarketing, setAcceptMarketing] = useState(false)
  const [phone, setPhone] = useState('')
  const [showRating, setShowRating] = useState(false)
  const [lastAppointment, setLastAppointment] = useState<{name: string, service: string} | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const servicos = [
    { id: '1', nome: 'Lavagem Completa', preco: 120 },
    { id: '2', nome: 'Polimento Especializado', preco: 350 },
    { id: '3', nome: 'Detalhamento Interior', preco: 280 },
    { id: '4', nome: 'Cristalização de Pintura', preco: 450 },
    { id: '5', nome: 'Higienização de Ar-Condicionado', preco: 150 }
  ]

  const profissionais = [
    { id: '1', nome: 'Bruno Mucio' },
    { id: '2', nome: 'Carlos Oliveira' },
    { id: '3', nome: 'André Santos' },
    { id: '4', nome: 'Marcos Pereira' }
  ]

  const horarios = [
    '08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Aqui você pode adicionar a lógica para enviar os dados do formulário
      // Por exemplo, uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulando uma chamada à API
      setIsSuccess(true)
      clearAppointmentData()
      router.push('/agendamento/confirmacao')
    } catch (err) {
      setError('Ocorreu um erro ao processar seu agendamento. Por favor, tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-12">
      <div className="bg-white p-8 rounded-lg shadow-custom">
        <h2 className="section-title-center">Agende seu Serviço</h2>
        
        {isSuccess && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md">
            Agendamento realizado com sucesso! Os detalhes foram enviados para o WhatsApp da Mucio Car.
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-md">
            {error}
          </div>
        )}
        
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Nome Completo</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={appointmentData?.name || ''}
                onChange={(e) => setAppointmentData({ ...appointmentData!, name: e.target.value })}
                required
                className="input-field"
                placeholder="Seu nome completo"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block mb-2 font-medium text-gray-700">Telefone</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone"
                value={appointmentData?.phone || ''}
                onChange={(e) => setAppointmentData({ ...appointmentData!, phone: e.target.value })}
                required
                className="input-field"
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={appointmentData?.email || ''}
              onChange={(e) => setAppointmentData({ ...appointmentData!, email: e.target.value })}
              required
              className="input-field"
              placeholder="seu.email@exemplo.com"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="vehicle" className="block mb-2 font-medium text-gray-700">Veículo</label>
              <input 
                type="text" 
                id="vehicle" 
                name="vehicle"
                value={appointmentData?.vehicle || ''}
                onChange={(e) => setAppointmentData({ ...appointmentData!, vehicle: e.target.value })}
                required
                className="input-field"
                placeholder="Marca e modelo (ex: Honda Civic)"
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block mb-2 font-medium text-gray-700">Data</label>
              <input 
                type="date" 
                id="date" 
                name="date"
                value={appointmentData?.date || ''}
                onChange={(e) => setAppointmentData({ ...appointmentData!, date: e.target.value })}
                required
                className="input-field"
              />
            </div>
            
            <div>
              <label htmlFor="time" className="block mb-2 font-medium text-gray-700">Horário</label>
              <select 
                id="time" 
                name="time"
                value={appointmentData?.time || ''}
                onChange={(e) => setAppointmentData({ ...appointmentData!, time: e.target.value })}
                required
                className="input-field"
              >
                <option value="">Selecione um horário</option>
                {horarios.map(horario => (
                  <option key={horario} value={horario}>
                    {horario}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="service" className="block mb-2 font-medium text-gray-700">Serviço</label>
            <select 
              id="service" 
              name="service"
              value={appointmentData?.service || ''}
              onChange={(e) => setAppointmentData({ ...appointmentData!, service: e.target.value })}
              required
              className="input-field"
            >
              <option value="">Selecione um serviço</option>
              {servicos.map(servico => (
                <option key={servico.id} value={servico.id}>
                  {servico.nome} - R$ {servico.preco.toLocaleString('pt-BR')},00
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block mb-2 font-medium text-gray-700">Mensagem (opcional)</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={appointmentData?.message || ''}
              onChange={(e) => setAppointmentData({ ...appointmentData!, message: e.target.value })}
              className="input-field"
            />
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="marketing"
                type="checkbox"
                checked={acceptMarketing}
                onChange={(e) => setAcceptMarketing(e.target.checked)}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-secondary"
              />
            </div>
            <label htmlFor="marketing" className="ml-2 text-sm text-gray-600">
              Aceito receber promoções e novidades por email e WhatsApp
            </label>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Agendando...' : 'Confirmar Agendamento'}
          </button>
          
          <p className="text-sm text-gray-600 text-center mt-2">
            Ao confirmar, os detalhes do agendamento serão enviados para o WhatsApp da Mucio Car.
          </p>
        </form>
      </div>
      
      {/* Calendário de Agendamentos */}
      <div className="mt-12">
        <h3 className="section-title-center">Calendário de Agendamentos</h3>
        <p className="mb-6 text-gray-600 text-center">
          Confira os horários já agendados para planejar sua visita. Os dias com agendamentos estão marcados com um ponto.
        </p>
      </div>
      
      {/* Modal de avaliação */}
      {showRating && lastAppointment && (
        <RatingModal 
          isOpen={showRating}
          onClose={() => setShowRating(false)}
          clientName={lastAppointment.name}
          serviceName={lastAppointment.service}
        />
      )}
    </div>
  )
} 