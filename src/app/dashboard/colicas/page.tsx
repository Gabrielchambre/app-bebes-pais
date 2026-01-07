'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Clock, Heart, Wind, CheckCircle } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

export default function ColicasPage() {
  const router = useRouter()

  const tecnicas = [
    {
      titulo: 'Massagem na Barriga',
      descricao: 'Movimentos circulares suaves no sentido horário',
      icon: Heart,
    },
    {
      titulo: 'Posição Fetal',
      descricao: 'Dobre as perninhas do bebê em direção à barriga',
      icon: Clock,
    },
    {
      titulo: 'Calor Local',
      descricao: 'Compressa morna na barriga para aliviar desconforto',
      icon: Wind,
    },
  ]

  const gatilhos = [
    'Alimentação da mãe (se amamentando)',
    'Fórmula inadequada',
    'Ar engolido durante mamadas',
    'Sistema digestivo imaturo',
    'Estresse ou excesso de estímulos',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
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
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Cólicas do Bebê
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
            Técnicas para Aliviar Cólicas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {tecnicas.map((tecnica, index) => {
              const Icon = tecnica.icon
              return (
                <div key={index} className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border-2 border-violet-100 dark:border-gray-600 transition-colors duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{tecnica.titulo}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{tecnica.descricao}</p>
                </div>
              )
            })}
          </div>

          <div className="bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-xl p-6 mb-6 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle size={28} className="text-violet-600 dark:text-violet-400" />
              Outras Posições que Ajudam
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-violet-500 dark:bg-violet-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Posição do aviãozinho:</strong> Bebê de bruços no seu antebraço</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-violet-500 dark:bg-violet-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Colo vertical:</strong> Bebê em pé apoiado no seu ombro</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-violet-500 dark:bg-violet-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Balanço suave:</strong> Movimentos rítmicos e calmos</span>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-300 dark:border-orange-700 rounded-xl p-6 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-orange-800 dark:text-orange-400 mb-4">
              Gatilhos Comuns de Cólicas
            </h3>
            <ul className="space-y-2">
              {gatilhos.map((gatilho, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" />
                  <span className="text-orange-700 dark:text-orange-300">{gatilho}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
