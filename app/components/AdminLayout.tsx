'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiCalendar, FiImage, FiMessageSquare, FiSettings, FiTool } from 'react-icons/fi';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: FiHome },
    { href: '/admin/agendamentos', label: 'Agendamentos', icon: FiCalendar },
    { href: '/admin/servicos', label: 'Serviços', icon: FiTool },
    { href: '/admin/galeria', label: 'Galeria', icon: FiImage },
    { href: '/admin/depoimentos', label: 'Depoimentos', icon: FiMessageSquare },
    { href: '/admin/configuracoes', label: 'Configurações', icon: FiSettings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-screen">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-yellow-500">Admin</h1>
          </div>
          <nav className="mt-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${
                    isActive ? 'bg-yellow-50 text-yellow-500 border-r-4 border-yellow-500' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
} 