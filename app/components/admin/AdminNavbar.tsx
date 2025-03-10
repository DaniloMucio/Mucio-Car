'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = '/admin/login';
  };

  return (
    <nav className="fixed w-full z-50 bg-primary shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
              </div>
              <span className="text-xl font-serif font-bold text-white">Mucio <span className="text-secondary">Car</span> <span className="text-gray-400">Admin</span></span>
            </Link>
          </div>

          {/* Botão do menu mobile */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="nav-link">
              Voltar ao Site
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors shadow-custom"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-4 pb-4">
            <Link
              href="/"
              className="text-white hover:text-secondary transition-colors"
            >
              Voltar ao Site
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors w-full text-center"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 