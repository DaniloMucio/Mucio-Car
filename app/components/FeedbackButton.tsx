'use client';

import { useState } from 'react';
import { addTestimonial as addTestimonialService } from '../services/testimonialService';

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [service, setService] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !feedback || rating === 0) {
      alert('Por favor, preencha todos os campos obrigatórios e dê uma avaliação.');
      return;
    }
    
    setLoading(true);
    
    try {
      // Adicionar o depoimento diretamente usando o serviço
      const newTestimonial = addTestimonialService(name, rating, feedback, vehicleModel, service);
      console.log('Novo depoimento adicionado:', newTestimonial);
      
      // Após o envio bem-sucedido
      setSubmitted(true);
      
      // Não recarregar a página, apenas resetar o formulário após o usuário clicar no botão
      
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
      alert('Ocorreu um erro ao enviar seu feedback. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-50 transition-all duration-300 hover:scale-110"
        aria-label="Abrir formulário de feedback"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      </button>

      {/* Modal de feedback */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg shadow-xl max-w-md w-full border border-yellow-600/30 animate-fade-in">
            <div className="p-6">
              {!submitted ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-yellow-500 font-serif">Sua Opinião</h2>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-gray-300 mb-2">Seu Nome <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="vintage-input w-full"
                        placeholder="Digite seu nome"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="vehicleModel" className="block text-gray-300 mb-2">Modelo do Veículo</label>
                      <input
                        type="text"
                        id="vehicleModel"
                        value={vehicleModel}
                        onChange={(e) => setVehicleModel(e.target.value)}
                        className="vintage-input w-full"
                        placeholder="Ex: Honda Civic 2020"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="service" className="block text-gray-300 mb-2">Serviço Realizado</label>
                      <select
                        id="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="vintage-input w-full"
                      >
                        <option value="">Selecione um serviço</option>
                        <option value="Lavagem Detalhada">Lavagem Detalhada</option>
                        <option value="Polimento">Polimento</option>
                        <option value="Cristalização">Cristalização</option>
                        <option value="Higienização Interna">Higienização Interna</option>
                        <option value="Restauração de Faróis">Restauração de Faróis</option>
                        <option value="Proteção de Pintura">Proteção de Pintura</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-300 mb-2">Sua Avaliação <span className="text-red-500">*</span></label>
                      <div className="flex space-x-2">
                        {[...Array(5)].map((_, index) => {
                          const ratingValue = index + 1;
                          return (
                            <label key={index} className="cursor-pointer">
                              <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                className="hidden"
                                onClick={() => setRating(ratingValue)}
                              />
                              <svg 
                                className={`w-7 h-7 ${ratingValue <= (hover || rating) ? "text-yellow-400" : "text-gray-400"} transition-colors duration-200`}
                                fill="currentColor" 
                                viewBox="0 0 20 20" 
                                xmlns="http://www.w3.org/2000/svg"
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(0)}
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="feedback" className="block text-gray-300 mb-2">Sua Crítica ou Sugestão <span className="text-red-500">*</span></label>
                      <textarea
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="vintage-input w-full h-32"
                        placeholder="Compartilhe sua experiência ou sugestão"
                        required
                      ></textarea>
                    </div>
                    
                    <div className="text-gray-400 text-sm mb-4">
                      <p>Campos marcados com <span className="text-red-500">*</span> são obrigatórios</p>
                    </div>
                    
                    <button
                      type="submit"
                      className="vintage-button w-full flex items-center justify-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="inline-block animate-spin mr-2">⟳</span>
                      ) : null}
                      {loading ? 'Enviando...' : 'Enviar Feedback'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8 animate-fade-in">
                  <div className="text-green-500 text-6xl mb-6">✓</div>
                  <h3 className="text-2xl font-bold text-yellow-500 mb-4">Muito Obrigado!</h3>
                  <div className="space-y-3 text-gray-300">
                    <p>Sua avaliação é extremamente importante para nós.</p>
                    <p>Ela nos ajuda a melhorar nossos serviços e a atender cada vez melhor nossos clientes.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      setSubmitted(false);
                      setRating(0);
                      setName('');
                      setFeedback('');
                      setVehicleModel('');
                      setService('');
                    }}
                    className="mt-6 vintage-button"
                  >
                    Fechar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 