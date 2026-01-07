'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, BookOpen, Plus, Heart, Camera, Smile } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import { useState } from 'react'

export default function DescobertasPage() {
  const router = useRouter()

  const [descobertas, setDescobertas] = useState([
    {
      id: 1,
      titulo: 'Primeiro Sorriso',
      data: '2024-11-15',
      descricao: 'Hoje o bebê deu o primeiro sorriso! Foi um momento mágico e emocionante.',
      tipo: 'marco',
    },
    {
      id: 2,
      titulo: 'Segurou o Chocalho',
      data: '2024-11-20',
      descricao: 'Conseguiu segurar o chocalho pela primeira vez e balançou sozinho.',
      tipo: 'habilidade',
    },
    {
      id: 3,
      titulo: 'Primeira Papinha',
      data: '2024-11-25',
      descricao: 'Experimentou banana amassada e adorou! Comeu tudo com muito entusiasmo.',
      tipo: 'alimentacao',
    },
  ])

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'marco':
        return 'from-pink-500 to-rose-600'
      case 'habilidade':
        return 'from-blue-500 to-indigo-600'
      case 'alimentacao':
        return 'from-emerald-500 to-teal-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'marco':
        return Heart
      case 'habilidade':
        return Smile
      case 'alimentacao':
        return Camera
      default:
        return BookOpen
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
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
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Diário de Descobertas
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
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Momentos Especiais</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg">
              <Plus size={20} />
              Nova Descoberta
            </button>
          </div>
          
          <div className="space-y-6">
            {descobertas.map((descoberta) => {
              const Icon = getTipoIcon(descoberta.tipo)
              return (
                <div key={descoberta.id} className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border-2 border-pink-100 dark:border-gray-600 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${getTipoColor(descoberta.tipo)} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{descoberta.titulo}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(descoberta.data).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{descoberta.descricao}</p>
                      <div className="mt-3">
                        <span className={`px-3 py-1 bg-gradient-to-r ${getTipoColor(descoberta.tipo)} text-white rounded-lg text-sm font-medium`}>
                          {descoberta.tipo}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 shadow-lg transition-colors duration-300">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <Heart size={24} className="text-purple-600 dark:text-purple-400" />
            Preserve Memórias
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Registre cada momento especial do desenvolvimento do seu bebê. Esses registros 
            se tornarão memórias preciosas para toda a família!
          </p>
        </div>
      </div>
    </div>
  )
}
