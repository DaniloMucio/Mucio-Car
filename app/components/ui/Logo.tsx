'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        {/* Silhueta do carro */}
        <svg width="50" height="30" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M5,40 C15,20 30,15 40,15 C60,15 70,25 85,25 C95,25 95,35 95,40 C95,45 90,45 85,45 C75,45 65,35 40,35 C25,35 15,45 10,45 C5,45 0,45 5,40 Z" 
            fill="#FFD700" 
            stroke="#FFD700" 
            strokeWidth="2"
          />
        </svg>
      </div>
      
      {showText && (
        <div className="ml-2 flex flex-col">
          <div className="flex items-center">
            <span className="text-text-white font-stencil text-xl tracking-wider">MUCIO</span>
            <span className="text-accent font-stencil text-xl tracking-wider">CAR</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-secondary font-sans text-[8px] uppercase tracking-wider">ESTÉTICA</span>
            <span className="text-secondary font-sans text-[8px] uppercase tracking-wider">AUTOMOTIVA</span>
          </div>
        </div>
      )}
    </div>
  );
} 