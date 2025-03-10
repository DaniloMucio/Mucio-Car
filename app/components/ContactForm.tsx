'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Preparar a mensagem para o WhatsApp
    const whatsappMessage = `Contato\n\nNome: ${formData.name}\nEmail: ${formData.email}\nTelefone: ${formData.phone}\nMensagem: ${formData.message}`;
    
    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Abrir o WhatsApp com a mensagem
    window.open(`https://wa.me/5516997855627?text=${encodedMessage}`, '_blank');
    
    // Resetar o formulário
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    
    setIsSubmitting(false);
  };
  
  return (
    <div className="vintage-card">
      <h3 className="text-2xl font-bold mb-6 text-yellow-500 font-serif">Envie uma Mensagem</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-light-dark mb-2">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="vintage-input"
            placeholder="Seu nome completo"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-light-dark mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="vintage-input"
            placeholder="seu.email@exemplo.com"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block text-light-dark mb-2">Telefone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="vintage-input"
            placeholder="(00) 00000-0000"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-light-dark mb-2">Mensagem</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="vintage-input resize-none"
            placeholder="Digite sua mensagem aqui..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="vintage-button w-full flex justify-center items-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </>
          ) : (
            'Enviar Mensagem via WhatsApp'
          )}
        </button>
      </form>
    </div>
  );
} 