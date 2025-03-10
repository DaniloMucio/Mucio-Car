'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getAllImages, GalleryImage } from '../services/galleryService';

export default function GaleriaPage() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1583&auto=format&fit=crop)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="text-center">
            <div className="vintage-text mb-6">
              <h1 className="text-5xl font-bold text-yellow-500 mb-2 font-serif">Nossa Galeria</h1>
              <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
            </div>
            <p className="text-xl text-light italic">
              "Preservando a beleza automotiva através da arte da estética"
            </p>
          </div>
        </div>
      </div>
      
      {/* Gallery Content */}
      <GalleryContent />
      
      <Footer />
    </main>
  );
}

function GalleryContent() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  
  useEffect(() => {
    const galleryImages = getAllImages();
    setImages(galleryImages);
    
    // Extrair todas as tags únicas
    const tags = new Set<string>();
    galleryImages.forEach(image => {
      image.tags.forEach(tag => tags.add(tag));
    });
    setAllTags(Array.from(tags).sort());
  }, []);
  
  const filteredImages = selectedTag 
    ? images.filter(image => image.tags.includes(selectedTag))
    : images;
  
  return (
    <section className="py-16 vintage-bg">
      <div className="container mx-auto px-4">
        {/* Ornamento decorativo */}
        <div className="flex justify-center mb-8">
          <div className="w-32 h-8 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-yellow-500"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 transform rotate-45"></div>
            </div>
          </div>
        </div>
        
        {/* Elementos decorativos vintage */}
        <div className="hidden md:flex justify-center mb-10">
          <div className="w-16 h-16 mx-4">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2554/2554936.png" 
              alt="Ícone vintage de carro" 
              className="w-full h-full opacity-70 filter invert"
            />
          </div>
          <div className="w-16 h-16 mx-4">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3774/3774278.png" 
              alt="Ícone vintage de polimento" 
              className="w-full h-full opacity-70 filter invert"
            />
          </div>
          <div className="w-16 h-16 mx-4">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2830/2830312.png" 
              alt="Ícone vintage de ferramenta" 
              className="w-full h-full opacity-70 filter invert"
            />
          </div>
        </div>
        
        {/* Filtros */}
        <div className="mb-12">
          <h2 className="text-3xl font-serif text-center mb-6 text-yellow-500">Categorias</h2>
          <div className="flex flex-wrap justify-center gap-3 vintage-border p-4 bg-dark-light/30 max-w-3xl mx-auto">
            <button
              onClick={() => setSelectedTag(null)}
              className={`${
                selectedTag === null 
                  ? 'vintage-button' 
                  : 'vintage-button-secondary'
              }`}
            >
              Todos
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`${
                  selectedTag === tag 
                    ? 'vintage-button' 
                    : 'vintage-button-secondary'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        {/* Grid de imagens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map(image => (
            <div 
              key={image.id} 
              className="vintage-card overflow-hidden transform transition-all duration-500 hover:shadow-xl hover:scale-105 group"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20 z-10 transition-opacity duration-300 group-hover:opacity-0"></div>
                <Image 
                  src={image.url} 
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-0 right-0 bg-yellow-500 text-dark px-3 py-1 text-sm font-bold z-20">
                  {new Date(image.date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                  })}
                </div>
              </div>
              <div className="p-6 border-t border-yellow-500/30">
                <h3 className="text-xl font-bold mb-2 text-yellow-500 font-serif">{image.title}</h3>
                <p className="text-light-dark mb-4">{image.description}</p>
                <div className="flex flex-wrap gap-2">
                  {image.tags.map(tag => (
                    <span 
                      key={`${image.id}-${tag}`}
                      className="inline-block px-3 py-1 bg-dark-medium text-yellow-light text-xs rounded-sm border border-yellow-dark/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredImages.length === 0 && (
          <div className="text-center py-12 vintage-card">
            <p className="text-xl text-yellow-light">Nenhuma imagem encontrada para esta categoria.</p>
          </div>
        )}
        
        {/* Elementos decorativos vintage */}
        <div className="flex justify-center mt-12 mb-6">
          <div className="w-full max-w-3xl h-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="h-0.5 bg-yellow-500/50 w-full"></div>
            </div>
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="bg-gray-900 px-4">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/3033/3033143.png" 
                  alt="Separador vintage" 
                  className="h-8 w-8 opacity-70 filter invert"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Ornamento decorativo */}
        <div className="flex justify-center mt-6">
          <div className="w-32 h-8 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-yellow-500"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 transform rotate-45"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 