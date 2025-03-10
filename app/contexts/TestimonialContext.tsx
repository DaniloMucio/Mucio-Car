'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Testimonial } from '../models/Testimonial';
import { getTestimonials, addTestimonial as addTestimonialService } from '../services/testimonialService';

interface TestimonialContextType {
  testimonials: Testimonial[];
  loading: boolean;
  addTestimonial: (name: string, rating: number, comment: string, vehicleModel?: string, service?: string) => Testimonial;
  refreshTestimonials: () => void;
}

const TestimonialContext = createContext<TestimonialContextType | undefined>(undefined);

export function TestimonialProvider({ children }: { children: ReactNode }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTestimonials = () => {
    try {
      setLoading(true);
      const loadedTestimonials = getTestimonials();
      setTestimonials(loadedTestimonials);
    } catch (error) {
      console.error('Erro ao carregar depoimentos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const addTestimonial = (name: string, rating: number, comment: string, vehicleModel?: string, service?: string) => {
    const newTestimonial = addTestimonialService(name, rating, comment, vehicleModel, service);
    
    // Atualiza o estado local com o novo depoimento
    setTestimonials(prevTestimonials => [newTestimonial, ...prevTestimonials]);
    
    return newTestimonial;
  };

  const refreshTestimonials = () => {
    loadTestimonials();
  };

  return (
    <TestimonialContext.Provider value={{ testimonials, loading, addTestimonial, refreshTestimonials }}>
      {children}
    </TestimonialContext.Provider>
  );
}

export function useTestimonials() {
  const context = useContext(TestimonialContext);
  if (context === undefined) {
    throw new Error('useTestimonials deve ser usado dentro de um TestimonialProvider');
  }
  return context;
} 