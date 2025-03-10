'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAppointments, isSameDay, Appointment } from '../context/AppointmentContext';

export default function AdminAgendamentos() {
  const { appointments, cancelAppointment } = useAppointments();
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null);
  const [filters, setFilters] = useState({
    profissional: '',
    data: '',
    cliente: '',
    veiculo: ''
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    time: '',
    service: '',
    professional: ''
  });

  // Carregar todos os agendamentos inicialmente
  useEffect(() => {
    setFilteredAppointments(appointments);
  }, [appointments]);

  // Aplicar filtros
  const applyFilters = () => {
    let filtered = [...appointments];
    
    if (filters.profissional) {
      filtered = filtered.filter(app => 
        app.professional.toLowerCase().includes(filters.profissional.toLowerCase())
      );
    }
    
    if (filters.data) {
      const filterDate = new Date(filters.data);
      filtered = filtered.filter(app => 
        isSameDay(app.date, filterDate)
      );
    }
    
    if (filters.cliente) {
      filtered = filtered.filter(app => 
        app.client.toLowerCase().includes(filters.cliente.toLowerCase())
      );
    }
    
    if (filters.veiculo) {
      filtered = filtered.filter(app => 
        app.vehicle.toLowerCase().includes(filters.veiculo.toLowerCase())
      );
    }
    
    setFilteredAppointments(filtered);
  };

  // Limpar filtros
  const clearFilters = () => {
    setFilters({
      profissional: '',
      data: '',
      cliente: '',
      veiculo: ''
    });
    setFilteredAppointments(appointments);
  };

  // Atualizar filtros
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Abrir modal de detalhes
  const handleViewDetails = (appointment: Appointment) => {
    setCurrentAppointment(appointment);
    setIsModalOpen(true);
  };

  // Abrir modal de edição
  const handleEditAppointment = (appointment: Appointment) => {
    setCurrentAppointment(appointment);
    setEditFormData({
      time: appointment.time,
      service: appointment.service,
      professional: appointment.professional
    });
    setIsEditModalOpen(true);
  };

  // Cancelar agendamento
  const handleCancelAppointment = (id: number) => {
    if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      cancelAppointment(id);
      setIsModalOpen(false);
    }
  };

  // Atualizar dados do formulário de edição
  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Salvar alterações do agendamento
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentAppointment) {
      // Em um cenário real, aqui seria uma chamada à API para atualizar o agendamento
      // Como estamos usando localStorage, vamos simular a atualização
      
      const updatedAppointments = appointments.map(app => 
        app.id === currentAppointment.id 
          ? { 
              ...app, 
              time: editFormData.time,
              service: editFormData.service,
              professional: editFormData.professional
            } 
          : app
      );
      
      // Atualizar localStorage
      localStorage.setItem('appointmentsDatabase', JSON.stringify(updatedAppointments));
      
      // Recarregar a página para atualizar os dados
      window.location.reload();
    }
    
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Gerenciar Agendamentos</h2>
      
      {/* Filtros */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-3">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profissional">
              Profissional
            </label>
            <input
              type="text"
              id="profissional"
              name="profissional"
              value={filters.profissional}
              onChange={handleFilterChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nome do profissional"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="data">
              Data
            </label>
            <input
              type="date"
              id="data"
              name="data"
              value={filters.data}
              onChange={handleFilterChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cliente">
              Cliente
            </label>
            <input
              type="text"
              id="cliente"
              name="cliente"
              value={filters.cliente}
              onChange={handleFilterChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nome do cliente"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="veiculo">
              Veículo
            </label>
            <input
              type="text"
              id="veiculo"
              name="veiculo"
              value={filters.veiculo}
              onChange={handleFilterChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Placa do veículo"
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={clearFilters}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Limpar
          </button>
          <button
            onClick={applyFilters}
            className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Aplicar
          </button>
        </div>
      </div>
      
      {/* Lista de agendamentos */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Data</th>
              <th className="py-3 px-6 text-left">Horário</th>
              <th className="py-3 px-6 text-left">Cliente</th>
              <th className="py-3 px-6 text-left">Serviço</th>
              <th className="py-3 px-6 text-left">Profissional</th>
              <th className="py-3 px-6 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map(appointment => (
                <tr key={appointment.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left">
                    {format(new Date(appointment.date), 'dd/MM/yyyy', { locale: ptBR })}
                  </td>
                  <td className="py-3 px-6 text-left">{appointment.time}</td>
                  <td className="py-3 px-6 text-left">{appointment.client}</td>
                  <td className="py-3 px-6 text-left">{appointment.service}</td>
                  <td className="py-3 px-6 text-left">{appointment.professional}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center space-x-2">
                      <button 
                        onClick={() => handleViewDetails(appointment)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleEditAppointment(appointment)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 px-6 text-center text-gray-500">
                  Nenhum agendamento encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Modal de detalhes */}
      {isModalOpen && currentAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Detalhes do Agendamento</h3>
            
            <div className="space-y-3 mb-6">
              <div>
                <span className="font-bold">Cliente:</span> {currentAppointment.client}
              </div>
              <div>
                <span className="font-bold">Telefone:</span> {currentAppointment.phone}
              </div>
              <div>
                <span className="font-bold">Email:</span> {currentAppointment.email}
              </div>
              <div>
                <span className="font-bold">Data:</span> {format(new Date(currentAppointment.date), 'dd/MM/yyyy', { locale: ptBR })}
              </div>
              <div>
                <span className="font-bold">Horário:</span> {currentAppointment.time}
              </div>
              <div>
                <span className="font-bold">Serviço:</span> {currentAppointment.service}
              </div>
              <div>
                <span className="font-bold">Profissional:</span> {currentAppointment.professional}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  handleEditAppointment(currentAppointment);
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Editar
              </button>
              <button
                onClick={() => handleCancelAppointment(currentAppointment.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de edição */}
      {isEditModalOpen && currentAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Editar Agendamento</h3>
            
            <form onSubmit={handleSaveEdit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                  Horário
                </label>
                <select
                  id="time"
                  name="time"
                  value={editFormData.time}
                  onChange={handleEditFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Selecione um horário</option>
                  {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="service">
                  Serviço
                </label>
                <select
                  id="service"
                  name="service"
                  value={editFormData.service}
                  onChange={handleEditFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Selecione um serviço</option>
                  <option value="Corte de Cabelo">Corte de Cabelo</option>
                  <option value="Barba">Barba</option>
                  <option value="Combo (Cabelo + Barba)">Combo (Cabelo + Barba)</option>
                  <option value="Corte Degradê">Corte Degradê</option>
                  <option value="Coloração">Coloração</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="professional">
                  Profissional
                </label>
                <select
                  id="professional"
                  name="professional"
                  value={editFormData.professional}
                  onChange={handleEditFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Selecione um profissional</option>
                  <option value="Carlos Silva">Carlos Silva</option>
                  <option value="Roberto Oliveira">Roberto Oliveira</option>
                  <option value="André Santos">André Santos</option>
                  <option value="Marcos Pereira">Marcos Pereira</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 