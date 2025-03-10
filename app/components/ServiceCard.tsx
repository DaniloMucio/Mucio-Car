'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  price: string;
  className?: string;
  id: string;
}

export default function ServiceCard({ title, description, icon, price, className = '', id }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  
  return (
    <>
      <div 
        className={`vintage-card group cursor-pointer transition-all duration-500 relative overflow-hidden rounded-xl ${className}`} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          transform: isHovered ? 'translateY(-8px) scale(0.98)' : 'translateY(0) scale(1)',
          boxShadow: isHovered ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        <div className="relative z-10 p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 relative mr-4 flex items-center justify-center">
              <img
                src={icon}
                alt={title}
                width={40}
                height={40}
                className="w-full h-full transition-transform duration-500"
                style={{
                  transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)'
                }}
              />
            </div>
            <h3 className="text-lg font-bold text-yellow-500 font-serif transition-colors duration-300">{title}</h3>
          </div>
          <p className="text-light-dark mb-4 text-sm">{description}</p>
          <div className="flex justify-end items-center">
            <span className="text-yellow-500 font-bold transition-all duration-300">{price}</span>
          </div>
        </div>
        
        {/* Efeito Blur ao Hover */}
        <div 
          className="absolute inset-0 backdrop-blur-sm bg-black/30 flex flex-col justify-center items-center p-5 transition-all duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            backdropFilter: isHovered ? 'blur(8px)' : 'blur(0px)',
          }}
        >
          <div className="w-12 h-12 mb-3 flex items-center justify-center transform transition-all duration-500"
            style={{
              transform: isHovered ? 'scale(1) rotate(0)' : 'scale(0.5) rotate(-45deg)',
              opacity: isHovered ? 1 : 0
            }}
          >
            <img
              src={icon}
              alt={title}
              width={48}
              height={48}
              className="w-full h-full"
            />
          </div>
          <h3 
            className="text-xl font-bold text-yellow-500 font-serif mb-3 text-center transform transition-all duration-500"
            style={{
              transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
              opacity: isHovered ? 1 : 0
            }}
          >
            {title}
          </h3>
          <p 
            className="text-white mb-4 text-center text-sm transform transition-all duration-500"
            style={{
              transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
              opacity: isHovered ? 1 : 0,
              transitionDelay: '0.1s'
            }}
          >
            Clique para mais detalhes
          </p>
        </div>
      </div>

      {/* Modal de Detalhes */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseModal}
          ></div>
          <div className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl transform transition-all">
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 relative mr-4 flex items-center justify-center">
                <img
                  src={icon}
                  alt={title}
                  width={64}
                  height={64}
                  className="w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-yellow-500 font-serif">{title}</h3>
                <p className="text-yellow-500 font-bold mt-1">{price}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Descrição do Serviço</h4>
                <p className="text-gray-600">{description}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">O que inclui</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Atendimento personalizado</li>
                  <li>Produtos de alta qualidade</li>
                  <li>Garantia do serviço</li>
                  <li>Profissionais especializados</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Tempo Estimado</h4>
                <p className="text-gray-600">1-2 horas (dependendo do estado do veículo)</p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Link 
                href={`/agendamento?service=${id}`}
                className="vintage-button text-sm rounded-lg px-6 py-3"
              >
                Agendar Agora
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 