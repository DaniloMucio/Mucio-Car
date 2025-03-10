'use client';

import { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO, isWeekend } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Appointment, getAllAppointments, getAppointmentsByDate, getAvailableTimeSlots, getDatesWithAppointments } from '../services/appointmentService';

interface AppointmentCalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  onTimeSelect?: (time: string) => void;
}

export default function AppointmentCalendar({ selectedDate, onDateSelect, onTimeSelect }: AppointmentCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointments, setSelectedAppointments] = useState<Appointment[]>([]);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [datesWithAppointments, setDatesWithAppointments] = useState<string[]>([]);
  
  // Lista de todos os horários disponíveis
  const allTimeSlots = [
    '08:00', '09:00', '10:00', '11:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];
  
  // Carregar todos os agendamentos
  useEffect(() => {
    const loadAppointments = () => {
      const allAppointments = getAllAppointments();
      setAppointments(allAppointments);
      
      const dates = getDatesWithAppointments();
      setDatesWithAppointments(dates);
    };
    
    // Carregar agendamentos inicialmente
    loadAppointments();
    
    // Configurar um intervalo para verificar novos agendamentos a cada 5 segundos
    const intervalId = setInterval(loadAppointments, 5000);
    
    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []);
  
  // Atualizar agendamentos selecionados quando a data mudar
  useEffect(() => {
    if (selectedDate) {
      const appointmentsForDay = getAppointmentsByDate(selectedDate);
      setSelectedAppointments(appointmentsForDay);
    } else {
      setSelectedAppointments([]);
    }
  }, [selectedDate, appointments]);
  
  // Obter horários disponíveis para uma data específica
  const getAvailableTimeSlotsForDate = (date: string) => {
    return getAvailableTimeSlots(date);
  };
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const handleTimeSelect = (time: string) => {
    if (onTimeSelect) {
      onTimeSelect(time);
    }
  };
  
  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={prevMonth}
          className="text-gold-DEFAULT hover:text-gold-light transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-gold-DEFAULT font-serif">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </h2>
        <button 
          onClick={nextMonth}
          className="text-gold-DEFAULT hover:text-gold-light transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };
  
  const renderDays = () => {
    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    return (
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gold-light py-2">
            {day}
          </div>
        ))}
      </div>
    );
  };
  
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = new Date(monthStart);
    const endDate = new Date(monthEnd);
    
    startDate.setDate(startDate.getDate() - startDate.getDay());
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {dateRange.map((day, i) => {
          const formattedDate = format(day, 'yyyy-MM-dd');
          const hasAppointments = datesWithAppointments.includes(formattedDate);
          
          const isPast = day < today;
          const isWeekendDay = isWeekend(day);
          const isDisabled = isPast || isWeekendDay;
          
          return (
            <div
              key={i}
              className={`
                h-12 flex items-center justify-center relative
                ${!isSameMonth(day, currentMonth) ? 'text-gray-400' : ''}
                ${isDisabled ? 'bg-dark-light/50 text-gray-500' : 'cursor-pointer hover:bg-dark-light/20'}
                ${isWeekendDay ? 'bg-dark-light/30' : ''}
                ${selectedDate && isSameDay(day, parseISO(selectedDate)) ? 'bg-gold-DEFAULT/20 rounded-md' : ''}
                ${hasAppointments ? 'font-bold' : ''}
              `}
              onClick={() => !isDisabled && onDateSelect(formattedDate)}
              onMouseEnter={() => !isDisabled && setHoveredDate(formattedDate)}
              onMouseLeave={() => setHoveredDate(null)}
            >
              <span className="text-sm">{format(day, 'd')}</span>
              {hasAppointments && (
                <span className="absolute bottom-1 w-2 h-2 bg-gold-DEFAULT rounded-full"></span>
              )}
              
              {/* Tooltip com horários disponíveis */}
              {hoveredDate === formattedDate && !isDisabled && (
                <div className="absolute z-10 top-full mt-2 left-1/2 transform -translate-x-1/2 bg-dark-DEFAULT border-2 border-gold-DEFAULT rounded-md shadow-xl p-3 w-48 backdrop-blur-sm bg-opacity-95">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-dark-DEFAULT border-t-2 border-l-2 border-gold-DEFAULT"></div>
                  <p className="text-sm text-gold-DEFAULT font-bold mb-2 text-center border-b border-gold-DEFAULT/30 pb-1">Horários Disponíveis</p>
                  <div className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gold-DEFAULT scrollbar-track-dark-light">
                    {getAvailableTimeSlotsForDate(formattedDate).length > 0 ? (
                      <div className="grid grid-cols-2 gap-1">
                        {getAvailableTimeSlotsForDate(formattedDate).map(time => (
                          <div 
                            key={time} 
                            className="text-sm text-center py-1 px-2 bg-dark-light/40 hover:bg-gold-DEFAULT/20 rounded cursor-pointer transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDateSelect(formattedDate);
                              handleTimeSelect(time);
                            }}
                          >
                            {time}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-red-400 text-center py-2">Sem horários disponíveis</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  
  const renderAppointments = () => {
    if (selectedAppointments.length === 0) {
      return (
        <div className="text-center py-4 text-light-dark">
          <p>Nenhum agendamento para esta data.</p>
          <p className="text-sm mt-4 text-gold-DEFAULT font-bold">Horários Disponíveis:</p>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {selectedDate && getAvailableTimeSlotsForDate(selectedDate).map(time => (
              <div 
                key={time} 
                className="text-sm bg-dark-light/40 text-gold-light px-3 py-2 rounded-md hover:bg-gold-DEFAULT/20 cursor-pointer transition-colors"
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-3 mt-4">
        <h3 className="text-lg font-bold text-gold-DEFAULT">
          Agendamentos para {selectedDate ? format(parseISO(selectedDate), 'dd/MM/yyyy') : ''}
        </h3>
        {selectedAppointments.map(appointment => (
          <div key={appointment.id} className="p-3 bg-dark-light/30 rounded-md">
            <div className="flex justify-between">
              <span className="font-bold text-gold-light">{appointment.time}</span>
              <span className="text-sm text-gold-light">{appointment.service}</span>
            </div>
            <div className="mt-1">
              <p className="text-light-dark">{appointment.name}</p>
              <p className="text-sm text-gray-400">{appointment.vehicle}</p>
            </div>
          </div>
        ))}
        
        <div className="mt-6 pt-4 border-t border-gold-DEFAULT/30">
          <p className="text-sm text-gold-DEFAULT font-bold mb-3">Horários Disponíveis:</p>
          <div className="grid grid-cols-3 gap-2">
            {selectedDate && getAvailableTimeSlotsForDate(selectedDate).map(time => (
              <div 
                key={time} 
                className="text-sm text-center bg-dark-light/40 text-gold-light py-2 px-1 rounded-md hover:bg-gold-DEFAULT/20 cursor-pointer transition-colors"
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="vintage-card">
      <h2 className="text-2xl font-bold mb-6 text-gold-DEFAULT font-serif">Calendário de Agendamentos</h2>
      
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      
      <div className="mt-6 border-t border-gold-DEFAULT/20 pt-4">
        {renderAppointments()}
      </div>
    </div>
  );
} 