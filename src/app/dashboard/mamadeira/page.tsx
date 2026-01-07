'use client'

import Link from 'next/link'
import { ArrowLeft, Baby, Clock, Thermometer, CheckCircle, AlertCircle } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

export default function MamadeiraPage() {
  const dicas = [
    {
      titulo: 'Posição Correta',
      descricao: 'Mantenha o bebê semi-inclinado, nunca deitado completamente',
      icon: Baby,
    },
    {
      titulo: 'Temperatura Ideal',
      descricao: 'Leite deve estar morno (37°C), teste no pulso antes de oferecer',
      icon: Thermometer,
    },
    {
      titulo: 'Tempo de Mamada',
      descricao: 'Deixe o bebê mamar no seu ritmo, fazendo pausas para arrotar',
      icon: Clock,
    },
  ]

  const esterilizacao = [
    'Lave mamadeiras e bicos com água e sabão neutro',
    'Ferva em água por 15 minutos ou use esterilizador',
    'Deixe secar naturalmente em local limpo',
    'Guarde em recipiente fechado e limpo',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
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
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Baby size={24} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Mamadeira e Amamentação
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
            Orientações sobre Mamadeira
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {dicas.map((dica, index) => {
              const Icon = dica.icon
              return (
                <div key={index} className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border-2 border-pink-100 dark:border-gray-600 transition-colors duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{dica.titulo}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{dica.descricao}</p>
                </div>
              )
            })}
          </div>

          <div className="bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 rounded-xl p-6 mb-6 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle size={28} className="text-pink-600 dark:text-pink-400" />
              Esterilização da Mamadeira
            </h3>
            <ul className="space-y-3">
              {esterilizacao.map((passo, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-pink-500 dark:bg-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{passo}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-xl p-6 transition-colors duration-300">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-3 flex items-center gap-2">
              <AlertCircle size={24} />
              Amamentação Natural
            </h3>
            <p className="text-blue-700 dark:text-blue-300 mb-3">
              O leite materno é o alimento mais completo para o bebê até os 6 meses. 
              Benefícios incluem:
            </p>
            <ul className="space-y-2 text-blue-700 dark:text-blue-300">
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="mt-1 flex-shrink-0" />
                <span>Fortalece o sistema imunológico</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="mt-1 flex-shrink-0" />
                <span>Previne alergias e infecções</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="mt-1 flex-shrink-0" />
                <span>Fortalece o vínculo mãe-bebê</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
