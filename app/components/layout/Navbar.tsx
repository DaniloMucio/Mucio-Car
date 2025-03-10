'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHomePage, setIsHomePage] = useState(true)

  useEffect(() => {
    // Verificar se estamos na página inicial
    setIsHomePage(window.location.pathname === '/')

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const handleHomeNavigation = (hash: string) => {
    if (isHomePage) {
      scrollToSection(hash.replace('#', ''))
    } else {
      window.location.href = `/${hash}`
    }
  }

  const handleAgendamento = () => {
    window.location.href = '/agendamento'
    setIsMobileMenuOpen(false)
  }

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary shadow-lg' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Menu principal"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              {/* Silhueta do carro */}
              <div className="relative">
                <svg width="50" height="30" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Logo Mucio Car">
                  <path 
                    d="M5,40 C15,20 30,15 40,15 C60,15 70,25 85,25 C95,25 95,35 95,40 C95,45 90,45 85,45 C75,45 65,35 40,35 C25,35 15,45 10,45 C5,45 0,45 5,40 Z" 
                    fill="#FFD700" 
                    stroke="#FFD700" 
                    strokeWidth="2"
                  />
                </svg>
              </div>
              
              <div className="ml-2 flex flex-col">
                <div className="flex items-center">
                  <span className="text-white font-stencil text-xl tracking-wider">MUCIO</span>
                  <span className="text-accent font-stencil text-xl tracking-wider">CAR</span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-secondary font-sans text-[8px] uppercase tracking-wider">ESTÉTICA</span>
                  <span className="text-secondary font-sans text-[8px] uppercase tracking-wider">AUTOMOTIVA</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Botão do menu mobile */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleHomeNavigation('#servicos')}
              className="text-white hover:text-secondary transition-colors"
              aria-label="Ver serviços"
            >
              Serviços
            </button>
            <button
              onClick={() => handleHomeNavigation('#sobre')}
              className="text-white hover:text-secondary transition-colors"
              aria-label="Sobre nós"
            >
              Sobre
            </button>
            <button
              onClick={() => handleHomeNavigation('#galeria')}
              className="text-white hover:text-secondary transition-colors"
              aria-label="Ver galeria"
            >
              Galeria
            </button>
            <button
              onClick={() => handleHomeNavigation('#contato')}
              className="text-white hover:text-secondary transition-colors"
              aria-label="Entre em contato"
            >
              Contato
            </button>
            <Link
              href="/agendamento"
              className="btn-primary"
              aria-label="Agendar serviço"
            >
              Agendar
            </Link>
          </div>
        </div>

        {/* Menu mobile */}
        <div
          id="mobile-menu"
          className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => handleHomeNavigation('#servicos')}
              className="block w-full text-left px-3 py-2 text-white hover:text-secondary transition-colors"
              aria-label="Ver serviços"
            >
              Serviços
            </button>
            <button
              onClick={() => handleHomeNavigation('#sobre')}
              className="block w-full text-left px-3 py-2 text-white hover:text-secondary transition-colors"
              aria-label="Sobre nós"
            >
              Sobre
            </button>
            <button
              onClick={() => handleHomeNavigation('#galeria')}
              className="block w-full text-left px-3 py-2 text-white hover:text-secondary transition-colors"
              aria-label="Ver galeria"
            >
              Galeria
            </button>
            <button
              onClick={() => handleHomeNavigation('#contato')}
              className="block w-full text-left px-3 py-2 text-white hover:text-secondary transition-colors"
              aria-label="Entre em contato"
            >
              Contato
            </button>
            <Link
              href="/agendamento"
              className="block w-full text-left px-3 py-2 text-white hover:text-secondary transition-colors"
              aria-label="Agendar serviço"
            >
              Agendar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 