'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  visible?: boolean;
  size?: 'small' | 'medium' | 'large' | 'admin';
}

export default function Logo({ className = '', visible = true, size = 'large' }: LogoProps) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        const newOpacity = Math.max(0, 1 - (scrollPosition - 50) / 200);
        setOpacity(newOpacity);
      } else {
        setOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Definir dimensões com base no tamanho
  const dimensions = {
    small: { width: '180px', height: '90px' },
    medium: { width: '240px', height: '120px' },
    large: { width: '350px', height: '175px' },
    admin: { width: '175px', height: '87px' }
  };

  const { width, height } = dimensions[size];

  return (
    <div 
      className={`${className} fixed z-50 transition-all duration-500 ${
        visible ? 'opacity-100 transform translate-y-0' : 'opacity-0 pointer-events-none transform -translate-y-full'
      }`}
      style={{ marginLeft: '120px', marginTop: '40px', opacity: opacity }}
    >
      <Link href="/" className="block group">
        <div className="bg-black shadow-xl rounded-b-lg overflow-hidden border-l border-r border-b border-yellow-600/30 transition-all duration-300 group-hover:shadow-2xl group-hover:border-yellow-500/50" style={{ width, height, transformOrigin: 'top center' }}>
          <div className="relative w-full h-full overflow-hidden">
            <Image 
              src="/images/logo/Gemini_Generated_Image_aqzr79aqzr79aqzr.jpg"
              alt="Mucio Car Logo" 
              fill
              style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
              priority
              className="rounded-b-lg transition-all duration-300 group-hover:scale-105 group-hover:blur-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </Link>
    </div>
  );
} 