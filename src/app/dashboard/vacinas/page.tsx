'use client'

import Link from 'next/link'
import { ArrowLeft, Syringe, Calendar, Plus, CheckCircle, Clock } from 'lucide-react'
import { useState } from 'react'

export default function VacinasPage() {
  const [vacinas] = useState([
    { nome: 'BCG', idade: 'Ao nascer', aplicada: true },
    { nome: 'Hepatite B', idade: 'Ao nascer', aplicada: true },
    { nome: 'Pentavalente (1ª dose)', idade: '2 meses', aplicada: true },
    { nome: 'VIP (1ª dose)', idade: '2 meses', aplicada: false },
    { nome: 'Rotavírus (1ª dose)', idade: '2 meses', aplicada: false },
    { nome: 'Pneumocócica (1ª dose)', idade: '2 meses', aplicada: false },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all duration-300"
            >
              <ArrowLeft size={24} />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Syringe className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Cartão de Vacinas
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Histórico de Vacinas</h2>
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2 font-semibold">
              <Plus size={20} />
              Adicionar Vacina
            </button>
          </div>

          <div className="space-y-4">
            {vacinas.map((vacina, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-300 ${
                  vacina.aplicada
                    ? 'bg-green-50 border-green-300'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
                      vacina.aplicada
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                        : 'bg-gray-300'
                    }`}
                  >
                    {vacina.aplicada ? (
                      <CheckCircle size={24} className="text-white" />
                    ) : (
                      <Clock size={24} className="text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{vacina.nome}</h3>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Calendar size={16} />
                      {vacina.idade}
                    </p>
                  </div>
                </div>
                <div>
                  {vacina.aplicada ? (
                    <span className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow-sm">
                      ✓ Aplicada
                    </span>
                  ) : (
                    <span className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold shadow-sm">
                      Pendente
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Calendar size={24} className="text-blue-600" />
            Próxima Vacina
          </h3>
          <p className="text-gray-700 text-lg">
            <strong>VIP (1ª dose)</strong> - Prevista para quando o bebê completar 2 meses
          </p>
        </div>
      </div>
    </div>
  )
}
