// Serviço para gerenciar depoimentos

// Interface para os depoimentos
export interface Testimonial {
  id: string;
  name: string;
  email?: string;
  rating: number;
  comment: string;
  date: string;
  vehicleModel?: string;
  service?: string;
  isPositive: boolean;
  isApproved: boolean;
  response?: string;
  responseDate?: string;
}

// Chave para armazenar os depoimentos no localStorage
const TESTIMONIALS_STORAGE_KEY = 'mucio_car_testimonials';

// Função para gerar um ID único
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Função para obter todos os depoimentos
export const getTestimonials = (): Testimonial[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const storedTestimonials = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
  if (!storedTestimonials) {
    return [];
  }
  
  try {
    return JSON.parse(storedTestimonials);
  } catch (error) {
    console.error('Erro ao carregar depoimentos:', error);
    return [];
  }
};

// Função para obter depoimentos aprovados
export const getApprovedTestimonials = (): Testimonial[] => {
  const testimonials = getTestimonials();
  return testimonials.filter(testimonial => testimonial.isApproved);
};

// Função para obter depoimentos pendentes
export const getPendingTestimonials = (): Testimonial[] => {
  const testimonials = getTestimonials();
  return testimonials.filter(testimonial => !testimonial.isApproved);
};

// Função para criar um novo depoimento
export const createTestimonial = (testimonialData: Omit<Testimonial, 'id' | 'date' | 'isApproved'>): Testimonial => {
  const testimonials = getTestimonials();
  
  const newTestimonial: Testimonial = {
    ...testimonialData,
    id: generateId(),
    date: new Date().toLocaleDateString('pt-BR'),
    isApproved: false
  };
  
  const updatedTestimonials = [...testimonials, newTestimonial];
  localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(updatedTestimonials));
  
  return newTestimonial;
};

// Função para aprovar um depoimento
export const approveTestimonial = (id: string, response?: string): boolean => {
  const testimonials = getTestimonials();
  const testimonialIndex = testimonials.findIndex(testimonial => testimonial.id === id);
  
  if (testimonialIndex === -1) {
    return false;
  }
  
  testimonials[testimonialIndex] = {
    ...testimonials[testimonialIndex],
    isApproved: true,
    response,
    responseDate: response ? new Date().toLocaleDateString('pt-BR') : undefined
  };
  
  localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(testimonials));
  return true;
};

// Função para rejeitar um depoimento
export const rejectTestimonial = (id: string): boolean => {
  const testimonials = getTestimonials();
  const updatedTestimonials = testimonials.filter(testimonial => testimonial.id !== id);
  
  if (updatedTestimonials.length === testimonials.length) {
    return false; // Nenhum depoimento foi removido
  }
  
  localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(updatedTestimonials));
  return true;
};

// Função para obter um depoimento por ID
export const getTestimonialById = (id: string): Testimonial | null => {
  const testimonials = getTestimonials();
  const testimonial = testimonials.find(testimonial => testimonial.id === id);
  
  return testimonial || null;
};

// Função para adicionar um novo depoimento (compatibilidade com o componente FeedbackButton)
export const addTestimonial = (
  name: string, 
  rating: number, 
  comment: string, 
  vehicleModel?: string, 
  service?: string
): Testimonial => {
  return createTestimonial({
    name,
    rating,
    comment,
    vehicleModel,
    service,
    isPositive: rating >= 3
  });
};

// Função para obter os depoimentos mais recentes
export const getRecentTestimonials = (count: number = 5): Testimonial[] => {
  const approvedTestimonials = getApprovedTestimonials();
  
  // Ordenar por data (mais recentes primeiro)
  const sortedTestimonials = [...approvedTestimonials].sort((a, b) => {
    // Converter datas no formato DD/MM/YYYY para objetos Date
    const [dayA, monthA, yearA] = a.date.split('/').map(Number);
    const [dayB, monthB, yearB] = b.date.split('/').map(Number);
    
    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);
    
    return dateB.getTime() - dateA.getTime();
  });
  
  // Retornar apenas a quantidade solicitada
  return sortedTestimonials.slice(0, count);
}; 