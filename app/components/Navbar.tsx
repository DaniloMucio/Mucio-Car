'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [logoVisible, setLogoVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);
  const pathname = usePathname();
  
  // Determinar o tamanho da logo com base na página atual
  const logoSize = pathname === '/agendamento' 
    ? 'small' 
    : pathname.startsWith('/admin') 
      ? 'admin' 
      : 'large';

  useEffect(() => {
    setIsHomePage(pathname === '/');

    const handleScroll = () => {
      // Usar requestAnimationFrame para limitar as atualizações de estado durante o scroll
      requestAnimationFrame(() => {
        const offset = window.scrollY;
        if (offset > 50) {
          if (!scrolled) setScrolled(true);
        } else {
          if (scrolled) setScrolled(false);
        }
        
        // Controla a visibilidade da logo com base na posição de rolagem
        if (offset > 400) {
          if (logoVisible) setLogoVisible(false);
        } else {
          if (!logoVisible) setLogoVisible(true);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname, scrolled, logoVisible]);

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 vintage-header ${
        scrolled ? 'py-4 shadow-lg' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-center items-center h-16">
          <Link href="/" className="text-center group cursor-pointer">
            <h1 className="text-yellow-500 text-2xl font-bold font-serif transition-all duration-300 group-hover:opacity-70">MUCIO CAR</h1>
            <p className="text-light text-sm transition-all duration-300 group-hover:opacity-70">ESTÉTICA AUTOMOTIVA</p>
          </Link>
        </div>
        
        <div className="flex justify-end items-center h-16 absolute top-0 right-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className={`relative group py-2 ${pathname === '/' ? 'text-yellow-500' : 'text-white'}`}>
              <span>Início</span>
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full ${pathname === '/' ? 'w-full' : ''}`}></span>
            </Link>
            <button onClick={() => scrollToSection('services')} className="relative group py-2 text-white">
              <span>Serviços</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <Link href="/galeria" className={`relative group py-2 ${pathname === '/galeria' ? 'text-yellow-500' : 'text-white'}`}>
              <span>Galeria</span>
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full ${pathname === '/galeria' ? 'w-full' : ''}`}></span>
            </Link>
            <button onClick={() => scrollToSection('contact')} className="relative group py-2 text-white">
              <span>Contato</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <Link 
              href="/agendamento" 
              className={`px-4 py-2 rounded-md border border-yellow-500 transition-all duration-300 ${
                pathname === '/agendamento' 
                  ? 'bg-yellow-500 text-dark font-medium' 
                  : 'text-yellow-500 hover:bg-yellow-500 hover:text-dark'
              }`}
            >
              Agendar
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden bg-dark absolute w-full transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen py-4 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'}`}>
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              href="/" 
              className={`relative group py-2 ${pathname === '/' ? 'text-yellow-500' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Início</span>
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full ${pathname === '/' ? 'w-full' : ''}`}></span>
            </Link>
            <button 
              onClick={() => {
                if (scrollToSection) scrollToSection('services');
                setMobileMenuOpen(false);
              }} 
              className="relative group py-2 text-white text-left"
            >
              <span>Serviços</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <Link 
              href="/galeria" 
              className={`relative group py-2 ${pathname === '/galeria' ? 'text-yellow-500' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Galeria</span>
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full ${pathname === '/galeria' ? 'w-full' : ''}`}></span>
            </Link>
            <button 
              onClick={() => {
                if (scrollToSection) scrollToSection('contact');
                setMobileMenuOpen(false);
              }} 
              className="relative group py-2 text-white text-left"
            >
              <span>Contato</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <Link 
              href="/agendamento" 
              className={`px-4 py-2 rounded-md border border-yellow-500 transition-all duration-300 text-center ${
                pathname === '/agendamento' 
                  ? 'bg-yellow-500 text-dark font-medium' 
                  : 'text-yellow-500 hover:bg-yellow-500 hover:text-dark'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Agendar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
} 