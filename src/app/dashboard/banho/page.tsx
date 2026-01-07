'use client'

import Link from 'next/link'
import { ArrowLeft, Bath, Thermometer, Clock, CheckCircle, AlertTriangle } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

export default function BanhoPage() {
  const checklist = [
    'Temperatura da água entre 36-37°C',
    'Toalha macia e aquecida',
    'Sabonete neutro para bebês',
    'Shampoo suave (se necessário)',
    'Fralda limpa e roupa separada',
    'Ambiente aquecido (23-25°C)',
  ]

  const passos = [
    'Prepare todos os itens antes de começar',
    'Teste a temperatura da água com o cotovelo',
    'Segure o bebê com firmeza, apoiando cabeça e pescoço',
    'Lave do rosto aos pés, deixando a área da fralda por último',
    'Enxágue bem para remover todo o sabonete',
    'Seque com toalha macia, especialmente nas dobrinhas',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
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
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Bath className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Hora do Banho
                </h1>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 transition-colors duration-300">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center flex items-center justify-center gap-3">
            <CheckCircle size={36} className="text-cyan-600 dark:text-cyan-400" />
            Checklist de Segurança
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {checklist.map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border-2 border-cyan-100 dark:border-gray-600 transition-colors duration-300">
                <CheckCircle size={20} className="text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-xl p-6 mb-6 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Clock size={28} className="text-cyan-600 dark:text-cyan-400" />
              Passo a Passo do Banho
            </h3>
            <ul className="space-y-3">
              {passos.map((passo, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 pt-1">{passo}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl p-6 mb-6 transition-colors duration-300">
            <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-400 mb-3 flex items-center gap-2">
              <Thermometer size={24} />
              Temperatura Ideal
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              A água deve estar entre 36-37°C. Use um termômetro de banho ou teste com o cotovelo 
              - deve estar morna, nem quente nem fria.
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-xl p-6 transition-colors duration-300">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-400 mb-3 flex items-center gap-2">
              <AlertTriangle size={24} />
              Nunca Deixe o Bebê Sozinho
            </h3>
            <p className="text-red-700 dark:text-red-300">
              Mesmo por alguns segundos! Bebês podem se afogar em poucos centímetros de água. 
              Prepare tudo antes e mantenha sempre uma mão no bebê.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
