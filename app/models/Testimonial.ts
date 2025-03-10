export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  isPositive: boolean;
  vehicleModel?: string;
  service?: string;
}

// Função para determinar se a avaliação é positiva (3-5 estrelas) ou negativa (1-2 estrelas)
export const isPositiveRating = (rating: number): boolean => {
  return rating >= 3;
};

// Função para gerar um ID único
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Função para formatar a data atual
export const formatCurrentDate = (): string => {
  const now = new Date();
  return now.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Função para criar um novo depoimento
export const createTestimonial = (
  name: string, 
  rating: number, 
  comment: string, 
  vehicleModel?: string, 
  service?: string
): Testimonial => {
  return {
    id: generateId(),
    name,
    rating,
    comment,
    date: formatCurrentDate(),
    isPositive: isPositiveRating(rating),
    vehicleModel,
    service
  };
}; 