'use client';

import { FormEvent } from 'react';

export default function ContactForm() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Lógica do formulário aqui
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-primary">Envie uma Mensagem</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome" className="block mb-1 font-medium text-gray-700">Nome</label>
          <input
            type="text"
            id="nome" 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900"
            placeholder="Seu nome"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900"
            placeholder="Seu email"
          />
        </div>
        
        <div>
          <label htmlFor="telefone" className="block mb-1 font-medium text-gray-700">Telefone</label>
          <input
            type="tel"
            id="telefone" 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900"
            placeholder="Seu telefone"
          />
        </div>
        
        <div>
          <label htmlFor="mensagem" className="block mb-1 font-medium text-gray-700">Mensagem</label>
          <textarea
            id="mensagem" 
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900"
            placeholder="Sua mensagem"
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg w-full"
        >
          Enviar Mensagem
        </button>
      </form>
    </div>
  );
} 