'use client'

import Link from 'next/link'
import { ArrowLeft, Package2, Droplets, AlertCircle, CheckCircle } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

export default function FraldaPage() {
  const passos = [
    'Prepare todos os itens: fralda limpa, lenços, pomada',
    'Deite o bebê em superfície segura e limpa',
    'Abra a fralda suja e limpe da frente para trás',
    'Use lenços umedecidos ou algodão com água morna',
    'Seque bem a área antes de colocar fralda nova',
    'Aplique pomada preventiva se necessário',
    'Coloque a fralda limpa, ajustando sem apertar',
  ]

  const sinaisAssadura = [
    'Vermelhidão intensa na área da fralda',
    'Pele quente ao toque',
    'Bolinhas ou descamação',
    'Bebê chorando ao limpar a área',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
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
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Package2 className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Troca de Fralda
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
            <CheckCircle size={36} className="text-amber-600 dark:text-amber-400" />
            Passo a Passo
          </h2>
          
          <div className="space-y-4 mb-8">
            {passos.map((passo, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border-2 border-amber-100 dark:border-gray-600 transition-colors duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">
                  {index + 1}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg pt-1">{passo}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl p-6 mb-6 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Droplets size={28} className="text-blue-600 dark:text-blue-400" />
              Frequência de Troca
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                <span><strong>Recém-nascidos:</strong> A cada 2-3 horas ou após cada mamada</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                <span><strong>Bebês maiores:</strong> A cada 3-4 horas durante o dia</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                <span><strong>Sempre:</strong> Imediatamente após evacuação</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-xl p-6 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-4 flex items-center gap-2">
              <AlertCircle size={28} />
              Sinais de Assadura
            </h3>
            <ul className="space-y-2">
              {sinaisAssadura.map((sinal, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-red-700 dark:text-red-300 font-medium">{sinal}</span>
                </li>
              ))}
            </ul>
            <p className="text-red-700 dark:text-red-300 mt-4 font-medium">
              Se a assadura persistir por mais de 3 dias, consulte o pediatra.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
