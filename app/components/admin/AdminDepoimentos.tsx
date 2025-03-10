'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Tipo para os depoimentos
type Depoimento = {
  id: number;
  nome: string;
  texto: string;
  avaliacao: number;
  data: string;
  resposta?: string;
};

export default function AdminDepoimentos() {
  const [depoimentos, setDepoimentos] = useState<Depoimento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [respostaTexto, setRespostaTexto] = useState('');
  const [depoimentoRespondendo, setDepoimentoRespondendo] = useState<number | null>(null);

  // Carregar depoimentos do localStorage
  useEffect(() => {
    try {
      setIsLoading(true);
      const storedDepoimentos = localStorage.getItem('testimonials');
      if (storedDepoimentos) {
        const parsedDepoimentos = JSON.parse(storedDepoimentos);
        setDepoimentos(parsedDepoimentos);
      }
    } catch (error) {
      console.error('Erro ao carregar depoimentos:', error);
      setErrorMessage('Erro ao carregar depoimentos. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Excluir depoimento
  const handleDeleteDepoimento = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este depoimento?')) {
      try {
        const updatedDepoimentos = depoimentos.filter(depoimento => depoimento.id !== id);
        setDepoimentos(updatedDepoimentos);
        localStorage.setItem('testimonials', JSON.stringify(updatedDepoimentos));
        setSuccessMessage('Depoimento excluído com sucesso!');
        
        // Limpar mensagem de sucesso após 3 segundos
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } catch (error) {
        console.error('Erro ao excluir depoimento:', error);
        setErrorMessage('Erro ao excluir depoimento. Por favor, tente novamente.');
        
        // Limpar mensagem de erro após 3 segundos
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    }
  };

  // Iniciar resposta a um depoimento
  const handleIniciarResposta = (id: number) => {
    setDepoimentoRespondendo(id);
    setRespostaTexto('');
  };

  // Cancelar resposta
  const handleCancelarResposta = () => {
    setDepoimentoRespondendo(null);
    setRespostaTexto('');
  };

  // Enviar resposta
  const handleEnviarResposta = (id: number) => {
    if (!respostaTexto.trim()) {
      setErrorMessage('Por favor, digite uma resposta antes de enviar.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    try {
      const updatedDepoimentos = depoimentos.map(depoimento => 
        depoimento.id === id 
          ? { ...depoimento, resposta: respostaTexto } 
          : depoimento
      );
      
      setDepoimentos(updatedDepoimentos);
      localStorage.setItem('testimonials', JSON.stringify(updatedDepoimentos));
      setSuccessMessage('Resposta enviada com sucesso!');
      setDepoimentoRespondendo(null);
      setRespostaTexto('');
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Erro ao responder depoimento:', error);
      setErrorMessage('Erro ao enviar resposta. Por favor, tente novamente.');
      
      // Limpar mensagem de erro após 3 segundos
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  // Renderizar estrelas
  const renderStars = (avaliacao: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg 
          key={i} 
          className={`w-5 h-5 ${i <= avaliacao ? 'text-yellow-400' : 'text-gray-300'}`} 
          fill="currentColor" 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  // Formatar data
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Gerenciar Depoimentos</h2>
      
      {/* Mensagens de sucesso e erro */}
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {errorMessage}
        </div>
      )}
      
      {/* Lista de depoimentos */}
      {isLoading ? (
        <div className="text-center py-8">
          <svg className="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2 text-gray-700">Carregando depoimentos...</p>
        </div>
      ) : depoimentos.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-700">Nenhum depoimento encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {depoimentos.map(depoimento => (
            <div key={depoimento.id} className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <h3 className="font-bold text-lg text-gray-800">{depoimento.nome}</h3>
                  <div className="flex my-1">
                    {renderStars(depoimento.avaliacao)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {formatDate(depoimento.data)}
                  </p>
                  <p className="text-gray-800 mb-4">{depoimento.texto}</p>
                  
                  {/* Resposta ao depoimento */}
                  {depoimento.resposta && (
                    <div className="mt-4 pl-4 border-l-4 border-secondary">
                      <p className="font-medium text-gray-800">Resposta da Santos Barbearia:</p>
                      <p className="text-gray-700">{depoimento.resposta}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  {!depoimento.resposta && depoimentoRespondendo !== depoimento.id && (
                    <button
                      onClick={() => handleIniciarResposta(depoimento.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteDepoimento(depoimento.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Formulário de resposta */}
              {depoimentoRespondendo === depoimento.id && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-medium text-gray-800 mb-2">Responder como Santos Barbearia:</h4>
                  <textarea
                    value={respostaTexto}
                    onChange={(e) => setRespostaTexto(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"
                    rows={3}
                    placeholder="Digite sua resposta aqui..."
                  ></textarea>
                  <div className="flex justify-end mt-2 space-x-2">
                    <button
                      onClick={handleCancelarResposta}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleEnviarResposta(depoimento.id)}
                      className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark"
                    >
                      Enviar Resposta
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 