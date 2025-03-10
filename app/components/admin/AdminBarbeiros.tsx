'use client';

import { useState, useEffect } from 'react';

// Tipo para os profissionais
type Profissional = {
  id: string;
  nome: string;
  especialidade: string;
  foto: string;
  ativo: boolean;
};

export default function AdminProfissionais() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProfissional, setCurrentProfissional] = useState<Profissional | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    especialidade: '',
    foto: '',
    ativo: true
  });

  // Carregar profissionais do localStorage
  useEffect(() => {
    const storedProfissionais = localStorage.getItem('profissionais');
    if (storedProfissionais) {
      setProfissionais(JSON.parse(storedProfissionais));
    } else {
      // Dados iniciais de profissionais
      const initialProfissionais: Profissional[] = [
        { id: '1', nome: 'Bruno Mucio', especialidade: 'Polimento', foto: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop', ativo: true },
        { id: '2', nome: 'Carlos Oliveira', especialidade: 'Lavagem Completa', foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop', ativo: true },
        { id: '3', nome: 'André Santos', especialidade: 'Higienização', foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop', ativo: true },
        { id: '4', nome: 'Marcos Pereira', especialidade: 'Cristalização', foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop', ativo: true }
      ];
      setProfissionais(initialProfissionais);
      localStorage.setItem('profissionais', JSON.stringify(initialProfissionais));
    }
  }, []);

  // Salvar profissionais no localStorage quando houver alterações
  useEffect(() => {
    if (profissionais.length > 0) {
      localStorage.setItem('profissionais', JSON.stringify(profissionais));
    }
  }, [profissionais]);

  // Abrir modal para adicionar novo profissional
  const handleAddProfissional = () => {
    setCurrentProfissional(null);
    setFormData({
      nome: '',
      especialidade: '',
      foto: '',
      ativo: true
    });
    setIsModalOpen(true);
  };

  // Abrir modal para editar profissional existente
  const handleEditProfissional = (profissional: Profissional) => {
    setCurrentProfissional(profissional);
    setFormData({
      nome: profissional.nome,
      especialidade: profissional.especialidade,
      foto: profissional.foto,
      ativo: profissional.ativo
    });
    setIsModalOpen(true);
  };

  // Alternar status ativo/inativo
  const handleToggleStatus = (id: string) => {
    setProfissionais(prev => 
      prev.map(profissional => 
        profissional.id === id 
          ? { ...profissional, ativo: !profissional.ativo } 
          : profissional
      )
    );
  };

  // Atualizar dados do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value
    }));
  };

  // Salvar profissional (novo ou editado)
  const handleSaveProfissional = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentProfissional) {
      // Editar profissional existente
      setProfissionais(prev => 
        prev.map(profissional => 
          profissional.id === currentProfissional.id 
            ? { 
                ...profissional, 
                nome: formData.nome,
                especialidade: formData.especialidade,
                foto: formData.foto,
                ativo: formData.ativo
              } 
            : profissional
        )
      );
    } else {
      // Adicionar novo profissional
      const newProfissional: Profissional = {
        id: Date.now().toString(),
        nome: formData.nome,
        especialidade: formData.especialidade,
        foto: formData.foto,
        ativo: formData.ativo
      };
      
      setProfissionais(prev => [...prev, newProfissional]);
    }
    
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gerenciar Profissionais</h2>
        <button 
          onClick={handleAddProfissional}
          className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg transition-colors"
        >
          Adicionar Profissional
        </button>
      </div>
      
      {/* Lista de profissionais */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Foto</th>
              <th className="py-3 px-6 text-left">Nome</th>
              <th className="py-3 px-6 text-left">Especialidade</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {profissionais.map(profissional => (
              <tr key={profissional.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={profissional.foto || 'https://via.placeholder.com/150'} 
                      alt={profissional.nome}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                      }}
                    />
                  </div>
                </td>
                <td className="py-3 px-6 text-left">{profissional.nome}</td>
                <td className="py-3 px-6 text-left">{profissional.especialidade}</td>
                <td className="py-3 px-6 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    profissional.ativo 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {profissional.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center space-x-2">
                    <button 
                      onClick={() => handleEditProfissional(profissional)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleToggleStatus(profissional.id)}
                      className={`${
                        profissional.ativo 
                          ? 'text-red-500 hover:text-red-700' 
                          : 'text-green-500 hover:text-green-700'
                      }`}
                    >
                      {profissional.ativo ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Modal para adicionar/editar profissional */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">
              {currentProfissional ? 'Editar Profissional' : 'Adicionar Profissional'}
            </h3>
            
            <form onSubmit={handleSaveProfissional}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="especialidade">
                  Especialidade
                </label>
                <input
                  type="text"
                  id="especialidade"
                  name="especialidade"
                  value={formData.especialidade}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto">
                  URL da Foto
                </label>
                <input
                  type="text"
                  id="foto"
                  name="foto"
                  value={formData.foto}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="https://exemplo.com/foto.jpg"
                />
              </div>
              
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  id="ativo"
                  name="ativo"
                  checked={formData.ativo}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-gray-700 text-sm font-bold" htmlFor="ativo">
                  Ativo
                </label>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 