'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, ListChecks, Plus, ShoppingCart, ClipboardList, AlertCircle } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import { useState } from 'react'

export default function ListasPage() {
  const router = useRouter()

  const [listas, setListas] = useState([
    {
      id: 1,
      titulo: 'Compras do Bebê',
      tipo: 'compras',
      itens: ['Fraldas tamanho M', 'Lenços umedecidos', 'Pomada para assadura', 'Sabonete neutro'],
    },
    {
      id: 2,
      titulo: 'Tarefas da Semana',
      tipo: 'tarefas',
      itens: ['Marcar consulta pediatra', 'Lavar roupinhas', 'Organizar brinquedos', 'Comprar vitaminas'],
    },
    {
      id: 3,
      titulo: 'Emergência',
      tipo: 'emergencia',
      itens: ['Termômetro', 'Soro fisiológico', 'Antitérmico', 'Contato pediatra'],
    },
  ])

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'compras':
        return ShoppingCart
      case 'tarefas':
        return ClipboardList
      case 'emergencia':
        return AlertCircle
      default:
        return ListChecks
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'compras':
        return 'from-emerald-500 to-teal-600'
      case 'tarefas':
        return 'from-blue-500 to-indigo-600'
      case 'emergencia':
        return 'from-red-500 to-rose-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
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
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <ListChecks className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Listas Compartilhadas
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
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Suas Listas</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg">
              <Plus size={20} />
              Nova Lista
            </button>
          </div>
          
          <div className="space-y-6">
            {listas.map((lista) => {
              const Icon = getTipoIcon(lista.tipo)
              return (
                <div key={lista.id} className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border-2 border-emerald-100 dark:border-gray-600 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 bg-gradient-to-r ${getTipoColor(lista.tipo)} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{lista.titulo}</h3>
                  </div>
                  <ul className="space-y-2">
                    {lista.itens.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg transition-colors duration-300">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded border-2 border-emerald-400 dark:border-emerald-500 cursor-pointer"
                        />
                        <span className="text-gray-800 dark:text-white font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 shadow-lg transition-colors duration-300">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">💡 Dica</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Compartilhe suas listas com familiares para que todos possam colaborar. 
            Perfeito para compras, tarefas e organização em família!
          </p>
        </div>
      </div>
    </div>
  )
}
