'use client'

import Link from 'next/link'
import { ArrowLeft, Calendar as CalendarIcon, Plus, Users, Clock } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import { useState } from 'react'

export default function CalendarioPage() {
  const [eventos, setEventos] = useState([
    { id: 1, titulo: 'Consulta Pediatra', data: '2024-12-05', horario: '10:00', tipo: 'consulta' },
    { id: 2, titulo: 'Vacina 6 meses', data: '2024-12-10', horario: '14:30', tipo: 'vacina' },
    { id: 3, titulo: 'Aniversário 1 ano', data: '2025-01-15', horario: '15:00', tipo: 'evento' },
  ])

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'consulta':
        return 'from-blue-500 to-cyan-600'
      case 'vacina':
        return 'from-green-500 to-emerald-600'
      case 'evento':
        return 'from-purple-500 to-pink-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
              >
                <ArrowLeft size={24} />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <CalendarIcon className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Calendário Compartilhado
                </h1>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Próximos Eventos</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg">
              <Plus size={20} />
              Novo Evento
            </button>
          </div>
          
          <div className="space-y-4">
            {eventos.map((evento) => (
              <div key={evento.id} className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border-2 border-blue-100 dark:border-gray-600 transition-colors duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getTipoColor(evento.tipo)}`} />
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{evento.titulo}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <CalendarIcon size={18} />
                        <span>{new Date(evento.data).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={18} />
                        <span>{evento.horario}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 bg-gradient-to-r ${getTipoColor(evento.tipo)} text-white rounded-lg text-sm font-medium`}>
                    {evento.tipo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl p-6 shadow-lg transition-colors duration-300">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <Users size={24} className="text-emerald-600 dark:text-emerald-400" />
            Compartilhar com a Família
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Mantenha toda a família sincronizada com consultas, vacinas e eventos importantes 
            do bebê. Todos recebem notificações automáticas.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg font-medium">
            Gerenciar Compartilhamentos
          </button>
        </div>
      </div>
    </div>
  )
}
