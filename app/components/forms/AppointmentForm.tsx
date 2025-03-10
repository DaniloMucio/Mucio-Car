'use client'

import { useState, useRef } from 'react'
import { useAppointments, isSameDay } from '../context/AppointmentContext'
import AppointmentCalendar from './AppointmentCalendar'
import RatingModal from './RatingModal'
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
  const { addAppointment, appointments } = useAppointments()
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

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    veiculo: '',
    placa: '',
    ano: '',
    servico: '',
    profissional: '',
    data: '',
    horario: ''
  })

  // Função para enviar mensagem diretamente ao WhatsApp
  const sendWhatsAppMessage = (message: string, phoneNumber: string) => {
    // Remover espaços, traços e parênteses do número
    const cleanNumber = phoneNumber.replace(/[\s\-()]/g, '');
    
    // Criar URL do WhatsApp com API direta
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(message)}`;
    
    // Abrir em uma nova janela
    window.open(whatsappUrl, '_blank');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setIsSuccess(false)
    
    try {
      // Obter os dados do formulário
      const formData = new FormData(e.target as HTMLFormElement)
      const nome = formData.get('nome') as string
      const telefone = phone
      const email = formData.get('email') as string
      const veiculo = formData.get('veiculo') as string
      const placa = formData.get('placa') as string
      const ano = formData.get('ano') as string
      const servicoId = formData.get('servico') as string
      const profissionalId = formData.get('profissional') as string
      const dataStr = formData.get('data') as string
      const horario = formData.get('horario') as string
      
      console.log('Dados do formulário:', {
        nome,
        telefone,
        email,
        veiculo,
        placa,
        ano,
        servicoId,
        profissionalId,
        dataStr,
        horario
      })
      
      // Validar os dados
      if (!nome || !telefone || !email || !veiculo || !placa || !ano || !servicoId || !profissionalId || !dataStr || !horario) {
        throw new Error('Todos os campos são obrigatórios')
      }
      
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error('Por favor, insira um email válido')
      }
      
      // Validar formato de telefone
      const phoneNumbers = telefone.replace(/\D/g, '')
      if (phoneNumbers.length < 10 || phoneNumbers.length > 11) {
        throw new Error('Por favor, insira um telefone válido com DDD')
      }
      
      // Converter a data usando UTC
      const [ano_data, mes, dia] = dataStr.split('-').map(Number)
      const data = new Date(Date.UTC(ano_data, mes - 1, dia))
      
      console.log('Data convertida:', {
        original: dataStr,
        convertida: data.toISOString(),
        utcString: data.toUTCString()
      })
      
      if (isNaN(data.getTime())) {
        throw new Error('Data inválida')
      }

      // Verificar se é domingo usando UTC
      if (data.getUTCDay() === 0) {
        throw new Error('Não realizamos agendamentos aos domingos')
      }
      
      // Verificar se a data não é anterior a hoje
      const hoje = new Date()
      hoje.setHours(0, 0, 0, 0)
      if (data < hoje) {
        throw new Error('Não é possível agendar para uma data passada')
      }
      
      // Verificar se o horário já está agendado
      const horarioOcupado = appointments.some(appointment => 
        isSameDay(appointment.date, data) && 
        appointment.time === horario &&
        appointment.professional === profissionaisMap[profissionalId as keyof typeof profissionaisMap]
      )
      
      if (horarioOcupado) {
        throw new Error('Este horário já está ocupado para o profissional selecionado. Por favor, escolha outro horário ou profissional.')
      }
      
      // Obter nomes de serviço e profissional
      const servicoNome = servicosMap[servicoId as keyof typeof servicosMap]?.nome
      const servicoPreco = servicosMap[servicoId as keyof typeof servicosMap]?.preco
      const profissionalNome = profissionaisMap[profissionalId as keyof typeof profissionaisMap]
      
      if (!servicoNome || !servicoPreco || !profissionalNome) {
        throw new Error('Serviço ou profissional inválido')
      }
      
      // Criar mensagem para o WhatsApp
      const mensagem = `*Novo Agendamento - Mucio Car*
      
*Nome:* ${nome}
*Telefone:* ${telefone}
*Email:* ${email}
*Veículo:* ${veiculo} (${ano})
*Placa:* ${placa}
*Serviço:* ${servicoNome} (${servicoPreco})
*Profissional:* ${profissionalNome}
*Data:* ${data.toLocaleDateString('pt-BR')}
*Horário:* ${horario}
*Aceita receber promoções:* ${acceptMarketing ? 'Sim' : 'Não'}
      
Obrigado por agendar conosco!`
      
      console.log('Tentando adicionar agendamento...')
      
      // Adicionar o agendamento ao contexto
      addAppointment({
        date: data,
        time: horario,
        service: servicoNome,
        professional: profissionalNome,
        client: nome,
        phone: telefone,
        email: email,
        vehicle: `${veiculo} (${ano}) - ${placa}`
      })
      
      console.log('Agendamento adicionado com sucesso!')
      
      // Enviar mensagem diretamente ao WhatsApp
      sendWhatsAppMessage(mensagem, WHATSAPP_NUMBER)
      
      // Resetar o formulário
      if (formRef.current) {
        formRef.current.reset()
        setPhone('') // Limpar o estado do telefone
        setAcceptMarketing(false)
      }
      
      // Mostrar mensagem de sucesso
      setIsSuccess(true)
      setError('')
      
      // Guardar informações para o modal de avaliação
      setLastAppointment({
        name: nome,
        service: servicoNome
      })
      
      // Mostrar modal de avaliação após 1 segundo
      setTimeout(() => {
        setShowRating(true)
      }, 1000)
      
      // Redirecionar para a página inicial após o agendamento
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao agendar. Por favor, tente novamente.')
      console.error('Erro no agendamento:', err)
      setIsSuccess(false)
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
              <label htmlFor="nome" className="block mb-2 font-medium text-gray-700">Nome Completo</label>
              <input 
                type="text" 
                id="nome" 
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Seu nome completo"
              />
            </div>
            
            <div>
              <label htmlFor="telefone" className="block mb-2 font-medium text-gray-700">Telefone</label>
              <input 
                type="tel" 
                id="telefone" 
                name="telefone"
                value={phone}
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value)
                  setPhone(formatted)
                }}
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
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="seu.email@exemplo.com"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="veiculo" className="block mb-2 font-medium text-gray-700">Veículo</label>
              <input 
                type="text" 
                id="veiculo" 
                name="veiculo"
                value={formData.veiculo}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Marca e modelo (ex: Honda Civic)"
              />
            </div>
            
            <div>
              <label htmlFor="ano" className="block mb-2 font-medium text-gray-700">Ano</label>
              <input 
                type="text" 
                id="ano" 
                name="ano"
                value={formData.ano}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Ex: 2020"
              />
            </div>
            
            <div>
              <label htmlFor="placa" className="block mb-2 font-medium text-gray-700">Placa</label>
              <input 
                type="text" 
                id="placa" 
                name="placa"
                value={formData.placa}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="ABC-1234"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="servico" className="block mb-2 font-medium text-gray-700">Serviço</label>
            <select 
              id="servico" 
              name="servico"
              value={formData.servico}
              onChange={handleChange}
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
            <label htmlFor="profissional" className="block mb-2 font-medium text-gray-700">Profissional</label>
            <select 
              id="profissional" 
              name="profissional"
              value={formData.profissional}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Selecione um profissional</option>
              {profissionais.map(profissional => (
                <option key={profissional.id} value={profissional.id}>
                  {profissional.nome}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="data" className="block mb-2 font-medium text-gray-700">Data</label>
              <input 
                type="date" 
                id="data" 
                name="data"
                value={formData.data}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="input-field"
              />
            </div>
            
            <div>
              <label htmlFor="horario" className="block mb-2 font-medium text-gray-700">Horário</label>
              <select 
                id="horario" 
                name="horario"
                value={formData.horario}
                onChange={handleChange}
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
        <AppointmentCalendar />
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