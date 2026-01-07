'use client'

import Link from 'next/link'
import { ArrowLeft, Users, Clock, Bell, Plus, CheckCircle } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import { useState } from 'react'

export default function RotinaPage() {
  const [rotinas, setRotinas] = useState([
    { id: 1, titulo: 'Rotina Matinal', horario: '07:00', atividades: ['Trocar fralda', 'Mamada', 'Banho'] },
    { id: 2, titulo: 'Rotina da Tarde', horario: '14:00', atividades: ['Soneca', 'Mamada', 'Brincadeiras'] },
    { id: 3, titulo: 'Rotina Noturna', horario: '19:00', atividades: ['Banho', 'Mamada', 'Dormir'] },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
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
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Rotina e Painel
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
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Rotinas Salvas</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg">
              <Plus size={20} />
              Nova Rotina
            </button>
          </div>
          
          <div className="space-y-4">
            {rotinas.map((rotina) => (
              <div key={rotina.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border-2 border-blue-100 dark:border-gray-600 transition-colors duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Clock size={24} className="text-blue-600 dark:text-blue-400" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{rotina.titulo}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{rotina.horario}</p>
                    </div>
                  </div>
                  <Bell size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <ul className="space-y-2">
                  {rotina.atividades.map((atividade, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <CheckCircle size={18} className="text-blue-600 dark:text-blue-400" />
                      {atividade}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 shadow-lg transition-colors duration-300">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <Users size={24} className="text-purple-600 dark:text-purple-400" />
            Compartilhar com Babás
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Compartilhe suas rotinas com babás, avós ou outros cuidadores para garantir 
            consistência nos cuidados do bebê.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg font-medium">
            Gerenciar Compartilhamentos
          </button>
        </div>
      </div>
    </div>
  )
}
