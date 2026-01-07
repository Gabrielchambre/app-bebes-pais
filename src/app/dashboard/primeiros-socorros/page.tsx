'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Heart, AlertTriangle, Phone, CheckCircle } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

export default function PrimeirosSocorrosPage() {
  const router = useRouter()

  const passos = [
    'Mantenha a calma e avalie a situação',
    'Verifique se o bebê está consciente e respirando',
    'Se houver engasgo, realize a manobra de Heimlich para bebês',
    'Ligue imediatamente para 192 (SAMU) ou 193 (Bombeiros)',
    'Siga as orientações do atendente até a chegada do socorro',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
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
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
                  Primeiros Socorros
                </h1>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-red-500 dark:bg-red-600 text-white rounded-2xl shadow-2xl p-8 mb-8 text-center transition-colors duration-300">
          <Phone size={64} className="mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4">EMERGÊNCIA</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:192"
              className="bg-white text-red-600 dark:text-red-700 px-8 py-4 rounded-xl font-bold text-2xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              📞 192 - SAMU
            </a>
            <a
              href="tel:193"
              className="bg-white text-red-600 dark:text-red-700 px-8 py-4 rounded-xl font-bold text-2xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              📞 193 - Bombeiros
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 transition-colors duration-300">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
            <AlertTriangle size={36} className="text-yellow-500 dark:text-yellow-400" />
            Passos em Caso de Emergência
          </h2>
          
          <div className="space-y-4">
            {passos.map((passo, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-rose-50 to-red-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border-2 border-rose-200 dark:border-gray-600 transition-colors duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">
                  {index + 1}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg pt-1">{passo}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl p-6 shadow-lg border-2 border-yellow-300 dark:border-yellow-700 transition-colors duration-300">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <CheckCircle size={28} className="text-yellow-600 dark:text-yellow-400" />
            Manobra de Heimlich para Bebês
          </h3>
          <ol className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="font-bold text-yellow-700 dark:text-yellow-400">1.</span>
              <span>Posicione o bebê de bruços no seu antebraço, com a cabeça mais baixa que o corpo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-yellow-700 dark:text-yellow-400">2.</span>
              <span>Dê 5 pancadas firmes nas costas, entre as omoplatas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-yellow-700 dark:text-yellow-400">3.</span>
              <span>Vire o bebê de barriga para cima e faça 5 compressões no peito</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-yellow-700 dark:text-yellow-400">4.</span>
              <span>Repita até o objeto sair ou o bebê começar a chorar</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
