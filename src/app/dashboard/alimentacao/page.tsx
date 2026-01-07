'use client'

import Link from 'next/link'
import { ArrowLeft, Utensils, Apple, AlertCircle, CheckCircle } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

export default function AlimentacaoPage() {
  const alimentosPorIdade = [
    {
      idade: '6 meses',
      alimentos: ['Banana amassada', 'Batata doce', 'Abóbora', 'Cenoura cozida'],
      cor: 'from-emerald-400 to-teal-500',
    },
    {
      idade: '7-8 meses',
      alimentos: ['Maçã cozida', 'Pera', 'Frango desfiado', 'Arroz'],
      cor: 'from-blue-400 to-cyan-500',
    },
    {
      idade: '9-12 meses',
      alimentos: ['Feijão', 'Ovo cozido', 'Peixe', 'Massas'],
      cor: 'from-purple-400 to-pink-500',
    },
  ]

  const evitar = [
    'Mel (antes de 1 ano)',
    'Alimentos com muito sal',
    'Açúcar refinado',
    'Alimentos duros e redondos (risco de engasgo)',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
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
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Utensils className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Introdução Alimentar
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
            <Apple size={36} className="text-emerald-600 dark:text-emerald-400" />
            Alimentos por Idade
          </h2>
          
          <div className="space-y-6 mb-8">
            {alimentosPorIdade.map((grupo, index) => (
              <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border-2 border-emerald-100 dark:border-gray-600 transition-colors duration-300">
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${grupo.cor} bg-clip-text text-transparent mb-4`}>
                  {grupo.idade}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {grupo.alimentos.map((alimento, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm transition-colors duration-300">
                      <CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{alimento}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-xl p-6 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-4 flex items-center gap-2">
              <AlertCircle size={28} />
              Alimentos a Evitar
            </h3>
            <ul className="space-y-3">
              {evitar.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-red-700 dark:text-red-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl p-6 shadow-lg transition-colors duration-300">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">💡 Dica Importante</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Introduza um alimento novo por vez e aguarde 3 dias antes de adicionar outro. 
            Isso ajuda a identificar possíveis alergias ou intolerâncias.
          </p>
        </div>
      </div>
    </div>
  )
}
