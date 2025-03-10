'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Função para verificar se duas datas são o mesmo dia
export const isSameDay = (date1: Date, date2: Date) => {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    console.error('Data inválida recebida:', { date1, date2 });
    return false;
  }
  return (
    date1.getUTCDate() === date2.getUTCDate() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCFullYear() === date2.getUTCFullYear()
  )
}

// Tipo para os agendamentos
export type Appointment = {
  id: number
  date: Date
  time: string
  service: string
  professional: string
  client: string
  phone: string
  email: string
  vehicle: string
}

// Array vazio para iniciar sem agendamentos
const initialAppointments: Appointment[] = []

interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

interface AppointmentContextType {
  appointmentData: AppointmentData | null;
  setAppointmentData: (data: AppointmentData) => void;
  clearAppointmentData: () => void;
}

const defaultAppointmentData: AppointmentData = {
  name: '',
  email: '',
  phone: '',
  vehicle: '',
  service: '',
  date: '',
  time: '',
  message: '',
};

// Criando o contexto
const AppointmentContext = createContext<AppointmentContextType>({
  appointmentData: null,
  setAppointmentData: () => {},
  clearAppointmentData: () => {},
});

// Hook personalizado para usar o contexto
export function useAppointment() {
  const context = useContext(AppointmentContext)
  if (context === undefined) {
    throw new Error('useAppointment deve ser usado dentro de um AppointmentProvider')
  }
  return context
}

// Simulação de banco de dados (em um cenário real, seria uma API)
const saveToDatabase = async (appointment: Appointment) => {
  try {
    // Em um cenário real, aqui seria uma chamada à API para salvar no banco de dados
    console.log('Salvando no banco de dados:', appointment);
    
    // Simulando uma chamada de API com localStorage
    const existingData = localStorage.getItem('appointmentsDatabase') || '[]';
    const database = JSON.parse(existingData);
    
    // Garantir que a data seja salva como string ISO
    const appointmentToSave = {
      ...appointment,
      date: appointment.date.toISOString()
    };
    
    database.push(appointmentToSave);
    localStorage.setItem('appointmentsDatabase', JSON.stringify(database));
    
    return true;
  } catch (error) {
    console.error('Erro ao salvar no banco de dados:', error);
    return false;
  }
}

const removeFromDatabase = async (id: number) => {
  try {
    // Em um cenário real, aqui seria uma chamada à API para remover do banco de dados
    console.log('Removendo do banco de dados, ID:', id);
    
    // Simulando uma chamada de API com localStorage
    const existingData = localStorage.getItem('appointmentsDatabase') || '[]';
    const database = JSON.parse(existingData);
    const updatedDatabase = database.filter((app: any) => app.id !== id);
    localStorage.setItem('appointmentsDatabase', JSON.stringify(updatedDatabase));
    
    return true;
  } catch (error) {
    console.error('Erro ao remover do banco de dados:', error);
    return false;
  }
}

// Provedor do contexto
export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [appointmentData, setAppointmentDataState] = useState<AppointmentData | null>(null);

  const setAppointmentData = (data: AppointmentData) => {
    setAppointmentDataState(data);
  };

  const clearAppointmentData = () => {
    setAppointmentDataState(null);
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointmentData,
        setAppointmentData,
        clearAppointmentData,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  )
} 