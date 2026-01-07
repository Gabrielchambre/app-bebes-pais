'use client'

import Link from 'next/link'
import { ArrowLeft, Baby, Moon, Clock, Bell, CheckCircle } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

export default function SonoPage() {
  const dicas = [
    {
      titulo: 'Ambiente Ideal',
      descricao: 'Quarto escuro, silencioso e com temperatura entre 20-22°C',
      icon: Moon,
    },
    {
      titulo: 'Rotina Consistente',
      descricao: 'Mantenha horários regulares para dormir e acordar',
      icon: Clock,
    },
    {
      titulo: 'Sinais de Sono',
      descricao: 'Observe bocejos, esfregar os olhos e irritabilidade',
      icon: Bell,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
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
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Moon className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Sono do Bebê
                </h1>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 transition-colors duration-300">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Guia Completo do Sono
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {dicas.map((dica, index) => {
              const Icon = dica.icon
              return (
                <div key={index} className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border-2 border-indigo-100 dark:border-gray-600 transition-colors duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{dica.titulo}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{dica.descricao}</p>
                </div>
              )
            })}
          </div>

          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-6 mb-6 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Baby size={28} />
              Tempo de Sono por Idade
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle size={20} className="text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300"><strong>0-3 meses:</strong> 14-17 horas por dia (incluindo sonecas)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={20} className="text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300"><strong>4-11 meses:</strong> 12-15 horas por dia</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={20} className="text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300"><strong>1-2 anos:</strong> 11-14 horas por dia</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl p-6 transition-colors duration-300">
            <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-400 mb-3 flex items-center gap-2">
              <Bell size={24} />
              Dica Importante
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Sempre coloque o bebê para dormir de barriga para cima. Evite cobertores soltos, 
              travesseiros e brinquedos no berço para prevenir sufocamento.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
