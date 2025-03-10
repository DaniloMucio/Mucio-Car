// Interface para os agendamentos
export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  createdAt: string;
  completed?: boolean;
  completedAt?: string;
  galleryImageId?: string;
}

// Chave para armazenar os agendamentos no localStorage
const APPOINTMENTS_STORAGE_KEY = 'mucio_car_appointments';

// Função para gerar um ID único
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Função para obter todos os agendamentos
export const getAllAppointments = (): Appointment[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const storedAppointments = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
  if (!storedAppointments) {
    return [];
  }
  
  try {
    return JSON.parse(storedAppointments);
  } catch (error) {
    console.error('Erro ao carregar agendamentos:', error);
    return [];
  }
};

// Função para obter agendamentos por data
export const getAppointmentsByDate = (date: string): Appointment[] => {
  const appointments = getAllAppointments();
  return appointments.filter(appointment => appointment.date === date);
};

// Função para verificar se um horário está disponível
export const isTimeSlotAvailable = (date: string, time: string): boolean => {
  const appointments = getAppointmentsByDate(date);
  return !appointments.some(appointment => appointment.time === time);
};

// Função para obter horários disponíveis para uma data
export const getAvailableTimeSlots = (date: string): string[] => {
  const allTimeSlots = [
    '08:00', '09:00', '10:00', '11:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];
  
  const bookedAppointments = getAppointmentsByDate(date);
  const bookedTimes = bookedAppointments.map(appointment => appointment.time);
  
  return allTimeSlots.filter(time => !bookedTimes.includes(time));
};

// Função para criar um novo agendamento
export const createAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt'>): Appointment => {
  const appointments = getAllAppointments();
  
  // Verificar se o horário está disponível
  if (!isTimeSlotAvailable(appointmentData.date, appointmentData.time)) {
    throw new Error('Este horário já está agendado. Por favor, escolha outro horário.');
  }
  
  const newAppointment: Appointment = {
    ...appointmentData,
    id: generateId(),
    createdAt: new Date().toISOString()
  };
  
  const updatedAppointments = [...appointments, newAppointment];
  localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updatedAppointments));
  
  return newAppointment;
};

// Função para cancelar um agendamento
export const cancelAppointment = (id: string): boolean => {
  const appointments = getAllAppointments();
  const updatedAppointments = appointments.filter(appointment => appointment.id !== id);
  
  if (updatedAppointments.length === appointments.length) {
    return false; // Nenhum agendamento foi removido
  }
  
  localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updatedAppointments));
  return true;
};

// Função para obter datas com agendamentos
export const getDatesWithAppointments = (): string[] => {
  const appointments = getAllAppointments();
  const uniqueDates = new Set<string>();
  
  appointments.forEach(appointment => {
    uniqueDates.add(appointment.date);
  });
  
  return Array.from(uniqueDates);
};

// Função para marcar um agendamento como concluído
export const markAppointmentAsCompleted = (id: string, galleryImageId?: string): boolean => {
  const appointments = getAllAppointments();
  const appointmentIndex = appointments.findIndex(appointment => appointment.id === id);
  
  if (appointmentIndex === -1) {
    return false;
  }
  
  appointments[appointmentIndex] = {
    ...appointments[appointmentIndex],
    completed: true,
    completedAt: new Date().toISOString(),
    galleryImageId
  };
  
  localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
  return true;
};

// Função para obter agendamentos concluídos
export const getCompletedAppointments = (): Appointment[] => {
  const appointments = getAllAppointments();
  return appointments.filter(appointment => appointment.completed);
};

// Função para obter agendamentos pendentes (não concluídos)
export const getPendingAppointments = (): Appointment[] => {
  const appointments = getAllAppointments();
  return appointments.filter(appointment => !appointment.completed);
};

// Função para obter agendamentos para hoje
export const getTodayAppointments = (): Appointment[] => {
  const appointments = getAllAppointments();
  const today = new Date().toISOString().split('T')[0];
  return appointments.filter(appointment => appointment.date === today);
};

// Função para obter agendamentos para os próximos dias
export const getUpcomingAppointments = (days: number = 7): Appointment[] => {
  const appointments = getAllAppointments();
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + days);
  
  return appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate >= today && appointmentDate <= endDate && !appointment.completed;
  });
}; 