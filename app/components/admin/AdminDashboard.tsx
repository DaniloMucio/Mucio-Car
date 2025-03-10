'use client';

import { useState, useEffect } from 'react';
import { useAppointments } from '../context/AppointmentContext';

export default function AdminDashboard() {
  const { appointments } = useAppointments();
  const [stats, setStats] = useState({
    total: 0,
    hoje: 0,
    semana: 0,
    porProfissional: {} as Record<string, number>
  });

  useEffect(() => {
    if (appointments.length > 0) {
      // Data atual
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      
      // Data de uma semana atrás
      const umaSemanaAtras = new Date();
      umaSemanaAtras.setDate(umaSemanaAtras.getDate() - 7);
      umaSemanaAtras.setHours(0, 0, 0, 0);
      
      // Contagem por profissional
      const porProfissional: Record<string, number> = {};
      
      // Filtrar agendamentos
      const agendamentosHoje = appointments.filter(app => {
        const appDate = new Date(app.date);
        appDate.setHours(0, 0, 0, 0);
        return appDate.getTime() === hoje.getTime();
      });
      
      const agendamentosSemana = appointments.filter(app => {
        const appDate = new Date(app.date);
        return appDate >= umaSemanaAtras;
      });
      
      // Contar por profissional
      appointments.forEach(app => {
        if (porProfissional[app.professional]) {
          porProfissional[app.professional]++;
        } else {
          porProfissional[app.professional] = 1;
        }
      });
      
      setStats({
        total: appointments.length,
        hoje: agendamentosHoje.length,
        semana: agendamentosSemana.length,
        porProfissional
      });
    }
  }, [appointments]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-medium text-gray-500">Total de Agendamentos</h3>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <h3 className="text-lg font-medium text-gray-500">Agendamentos Hoje</h3>
          <p className="text-3xl font-bold">{stats.hoje}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <h3 className="text-lg font-medium text-gray-500">Agendamentos na Semana</h3>
          <p className="text-3xl font-bold">{stats.semana}</p>
        </div>
      </div>
      
      {/* Estatísticas por profissional */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Agendamentos por Profissional</h3>
        
        {Object.keys(stats.porProfissional).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(stats.porProfissional).map(([profissional, quantidade]) => (
              <div key={profissional} className="flex items-center">
                <div className="w-1/3 font-medium">{profissional}</div>
                <div className="w-2/3">
                  <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-secondary"
                      style={{ width: `${(quantidade / stats.total) * 100}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-end pr-3">
                      <span className="text-sm font-medium">{quantidade} ({Math.round((quantidade / stats.total) * 100)}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nenhum agendamento registrado.</p>
        )}
      </div>
    </div>
  );
} 