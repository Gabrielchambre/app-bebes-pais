'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, History as HistoryIcon, Moon, Utensils, Package2, Bath, Clock } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import { useState } from 'react'

export default function HistoricoPage() {
  const router = useRouter()

  const [atividades, setAtividades] = useState([
    { id: 1, tipo: 'sono', descricao: 'Dormiu por 2 horas', horario: '14:30', icon: Moon, cor: 'from-indigo-500 to-purple-600' },
    { id: 2, tipo: 'alimentacao', descricao: 'Mamou 120ml', horario: '12:00', icon: Utensils, cor: 'from-emerald-500 to-teal-600' },
    { id: 3, tipo: 'fralda', descricao: 'Troca de fralda', horario: '11:30', icon: Package2, cor: 'from-amber-500 to-orange-600' },
    { id: 4, tipo: 'banho', descricao: 'Banho completo', horario: '09:00', icon: Bath, cor: 'from-cyan-500 to-blue-600' },
    { id: 5, tipo: 'sono', descricao: 'Soneca de 1 hora', horario: '10:30', icon: Moon, cor: 'from-indigo-500 to-purple-600' },
  ])

  const getDataAtual = () => {
    return new Date().toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 cursor-pointer"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <HistoryIcon className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Histórico do Dia
                </h1>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 transition-colors duration-300">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Atividades de Hoje</h2>
            <p className="text-gray-600 dark:text-gray-400 capitalize">{getDataAtual()}</p>
          </div>
          
          <div className="relative">
            {/* Linha do tempo vertical */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800" />
            
            <div className="space-y-6">
              {atividades.map((atividade) => {
                const Icon = atividade.icon
                return (
                  <div key={atividade.id} className="relative flex items-start gap-4 pl-16">
                    <div className={`absolute left-0 w-12 h-12 bg-gradient-to-br ${atividade.cor} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border-2 border-blue-100 dark:border-gray-600 transition-colors duration-300">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">{atividade.descricao}</h3>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <Clock size={16} />
                          <span className="text-sm font-medium">{atividade.horario}</span>
                        </div>
                      </div>
                      <span className={`inline-block px-3 py-1 bg-gradient-to-r ${atividade.cor} text-white rounded-lg text-xs font-medium`}>
                        {atividade.tipo}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-6 text-center transition-colors duration-300">
            <Moon size={32} className="mx-auto mb-2 text-indigo-600 dark:text-indigo-400" />
            <p className="text-2xl font-bold text-gray-800 dark:text-white">3h</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Total de Sono</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl p-6 text-center transition-colors duration-300">
            <Utensils size={32} className="mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
            <p className="text-2xl font-bold text-gray-800 dark:text-white">5x</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Mamadas</p>
          </div>
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6 text-center transition-colors duration-300">
            <Package2 size={32} className="mx-auto mb-2 text-amber-600 dark:text-amber-400" />
            <p className="text-2xl font-bold text-gray-800 dark:text-white">6x</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Trocas de Fralda</p>
          </div>
        </div>
      </div>
    </div>
  )
}
