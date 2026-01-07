'use client'

import { ArrowLeft, Package2, AlertTriangle, Clock, Shield, Plus, Check } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface TrocaRecord {
  time: Date
  type: 'xixi' | 'coco' | 'ambos'
  notes?: string
}

export default function FraldaPage() {
  const [trocas, setTrocas] = useState<TrocaRecord[]>([])
  const [selectedType, setSelectedType] = useState<'xixi' | 'coco' | 'ambos'>('xixi')
  const [notes, setNotes] = useState('')

  const addTroca = () => {
    const newTroca: TrocaRecord = {
      time: new Date(),
      type: selectedType,
      notes: notes.trim() || undefined
    }
    setTrocas([newTroca, ...trocas])
    setNotes('')
  }

  const getTrocasToday = () => {
    const today = new Date().toDateString()
    return trocas.filter(t => t.time.toDateString() === today)
  }

  const trocasPorIdade = [
    {
      idade: '0-3 meses',
      trocas: '8-12 vezes por dia',
      motivo: 'Alimentação frequente e digestão imatura'
    },
    {
      idade: '3-6 meses',
      trocas: '6-8 vezes por dia',
      motivo: 'Introdução alimentar e maior controle'
    },
    {
      idade: '6-12 meses',
      trocas: '4-6 vezes por dia',
      motivo: 'Alimentos sólidos e maior mobilidade'
    },
    {
      idade: '1-2 anos',
      trocas: '4-5 vezes por dia',
      motivo: 'Treino do penico e maior autonomia'
    }
  ]

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'xixi': return 'bg-blue-100 text-blue-800'
      case 'coco': return 'bg-amber-100 text-amber-800'
      case 'ambos': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/dashboard" className="inline-flex items-center text-yellow-600 hover:text-yellow-800 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Voltar ao início
        </Link>

        <header className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package2 size={32} className="text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Troca de Fralda</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Registre trocas e monitore a saúde do seu bebê.
          </p>
        </header>

        {/* Registro de Trocas */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Plus className="mr-2 text-yellow-600" />
            Registrar Troca
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Troca</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setSelectedType('xixi')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedType === 'xixi' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  💧 Xixi
                </button>
                <button
                  onClick={() => setSelectedType('coco')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedType === 'coco' 
                      ? 'border-amber-500 bg-amber-50 text-amber-700' 
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  💩 Cocô
                </button>
                <button
                  onClick={() => setSelectedType('ambos')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedType === 'ambos' 
                      ? 'border-purple-500 bg-purple-50 text-purple-700' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  💧💩 Ambos
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Observações (opcional)</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Assadura leve, cor diferente..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <button
              onClick={addTroca}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Check size={20} />
              Registrar Troca
            </button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Hoje:</strong> {getTrocasToday().length} trocas registradas
            </p>
          </div>
        </div>

        {/* Histórico de Trocas */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Histórico de Trocas</h2>
          {trocas.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Nenhuma troca registrada ainda.</p>
          ) : (
            <div className="space-y-3">
              {trocas.slice(0, 10).map((troca, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(troca.type)}`}>
                        {troca.type === 'xixi' ? '💧 Xixi' : troca.type === 'coco' ? '💩 Cocô' : '💧💩 Ambos'}
                      </span>
                      <span className="text-sm text-gray-600">
                        {troca.time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {troca.notes && (
                      <p className="text-xs text-gray-500 mt-1">{troca.notes}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {troca.time.toLocaleDateString('pt-BR')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Passo a Passo da Troca</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-800">1. Prepare o Material</h3>
                <p className="text-sm text-gray-600">Tenha fralda limpa, lenços umedecidos, creme preventivo e lixo ao alcance.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-medium text-gray-800">2. Posicione o Bebê</h3>
                <p className="text-sm text-gray-600">Deite em superfície segura. Nunca deixe sozinho na troca de mesa.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-medium text-gray-800">3. Abra a Fralda</h3>
                <p className="text-sm text-gray-600">Abra os adesivos. Use a parte da frente como barreira se necessário.</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-medium text-gray-800">4. Limpe</h3>
                <p className="text-sm text-gray-600">Limpe da frente para trás com lenços umedecidos. Seque bem.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-medium text-gray-800">5. Aplique Creme</h3>
                <p className="text-sm text-gray-600">Use creme preventivo de assaduras se a pele estiver irritada.</p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-medium text-gray-800">6. Coloque Nova Fralda</h3>
                <p className="text-sm text-gray-600">Posicione corretamente. Parte absorvente para trás em meninos.</p>
              </div>
              <div className="border-l-4 border-cyan-500 pl-4">
                <h3 className="font-medium text-gray-800">7. Feche e Vista</h3>
                <p className="text-sm text-gray-600">Feche adesivos firmemente mas sem apertar. Vista a roupa.</p>
              </div>
              <div className="border-l-4 border-pink-500 pl-4">
                <h3 className="font-medium text-gray-800">8. Lave as Mãos</h3>
                <p className="text-sm text-gray-600">Sempre lave as mãos após a troca para prevenir infecções.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="mr-2 text-blue-600" />
              Quantidade Recomendada
            </h2>
            <div className="space-y-4">
              {trocasPorIdade.map((fase, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800">{fase.idade}</h4>
                  <p className="text-sm text-blue-600 font-semibold">{fase.trocas}</p>
                  <p className="text-xs text-gray-600">{fase.motivo}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <AlertTriangle className="mr-2 text-red-600" />
              Prevenção de Assaduras
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800 text-sm">Sinais de Assadura</h4>
                <p className="text-xs text-red-700">Pele vermelha, irritada, com bolhas ou sangramento.</p>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 text-sm">Causas Comuns</h4>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>• Fralda muito apertada</li>
                  <li>• Troca demorada</li>
                  <li>• Umidade excessiva</li>
                  <li>• Atrito da pele</li>
                </ul>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 text-sm">Prevenção</h4>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>• Troque imediatamente quando suja</li>
                  <li>• Deixe a pele secar ao ar</li>
                  <li>• Use cremes preventivos</li>
                  <li>• Evite fraldas muito apertadas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-600 text-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-center">
            <Shield className="mr-2" />
            Segurança na Troca
          </h2>
          <p className="mb-4">A troca de fralda é um momento importante para higiene e observação do bebê.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium mb-2">Nunca Vire as Costas</h3>
              <p className="opacity-90">Bebês podem rolar inesperadamente. Mantenha sempre uma mão apoiando.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Distraia o Bebê</h3>
              <p className="opacity-90">Use brinquedos ou canções para tornar o momento mais agradável.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
