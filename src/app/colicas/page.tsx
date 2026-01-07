'use client'

import { ArrowLeft, Clock, Wind, Play, AlertCircle, Bell, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface ColicSchedule {
  id: string
  time: string
  technique: string
  enabled: boolean
}

export default function CólicasPage() {
  const [schedules, setSchedules] = useState<ColicSchedule[]>([])
  const [scheduleTime, setScheduleTime] = useState('18:00')
  const [scheduleTechnique, setScheduleTechnique] = useState('Massagem Circular')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('baby_colic_schedules')
    if (saved) {
      setSchedules(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('baby_colic_schedules', JSON.stringify(schedules))
  }, [schedules])

  const addSchedule = () => {
    const newSchedule: ColicSchedule = {
      id: Date.now().toString(),
      time: scheduleTime,
      technique: scheduleTechnique,
      enabled: true
    }
    setSchedules([...schedules, newSchedule])
    setScheduleTime('18:00')
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  const toggleSchedule = (id: string) => {
    setSchedules(schedules.map(s =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ))
  }

  const removeSchedule = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id))
  }

  const posicoes = [
    {
      nome: 'Posição de Futebol Americano',
      descricao: 'Segure o bebê como uma bola de futebol, com a barriga apoiada no antebraço.',
      beneficios: 'Ajuda a liberar gases e alivia pressão abdominal.'
    },
    {
      nome: 'Berço do Vento',
      descricao: 'Deite o bebê de bruços sobre suas pernas, com movimentos suaves.',
      beneficios: 'Massageia suavemente o abdômen e ajuda na digestão.'
    },
    {
      nome: 'Posição Vertical',
      descricao: 'Segure o bebê ereto contra o peito, com a cabeça apoiada no ombro.',
      beneficios: 'Reduz refluxo e ajuda gases a subirem.'
    }
  ]

  const gatilhos = [
    'Alimentação rápida demais',
    'Ar engolido durante mamada',
    'Intolerância a lactose ou proteínas',
    'Ambiente muito estimulante',
    'Fases de crescimento',
    'Mudanças na rotina'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/dashboard" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Voltar ao início
        </Link>

        <header className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock size={32} className="text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Cólicas do Bebê</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Técnicas eficazes para aliviar cólicas e identificar os gatilhos mais comuns.
          </p>
        </header>

        {/* Agendamento de Notificações */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
              <Bell className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Agendar Lembretes de Técnicas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Horário</label>
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Técnica</label>
              <select
                value={scheduleTechnique}
                onChange={(e) => setScheduleTechnique(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option>Massagem Circular</option>
                <option>Bicicleta</option>
                <option>Balanços Suaves</option>
                <option>Ruído Branco</option>
              </select>
            </div>
          </div>

          <button
            onClick={addSchedule}
            className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mb-6"
          >
            <Plus size={20} />
            Adicionar Lembrete
          </button>

          {showSuccessMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bell className="text-white" size={16} />
              </div>
              <div>
                <p className="font-semibold text-green-800">Lembrete salvo com sucesso!</p>
                <p className="text-sm text-green-700">Você será notificado no horário agendado.</p>
              </div>
            </div>
          )}

          {schedules.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Lembretes Agendados</h3>
              {schedules.map(schedule => (
                <div
                  key={schedule.id}
                  className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200"
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleSchedule(schedule.id)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                        schedule.enabled
                          ? 'bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg'
                          : 'bg-gray-300'
                      }`}
                    >
                      <Bell className="text-white" size={18} />
                    </button>
                    <div>
                      <p className="font-bold text-gray-800">{schedule.time}</p>
                      <p className="text-sm text-gray-600">{schedule.technique}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeSchedule(schedule.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Wind className="mr-2 text-purple-600" />
            Técnicas para Aliviar Cólicas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posicoes.map((posicao, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-800 mb-2">{posicao.nome}</h3>
                <p className="text-sm text-gray-600 mb-3">{posicao.descricao}</p>
                <p className="text-xs text-purple-700 bg-purple-50 p-2 rounded">{posicao.beneficios}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Play className="mr-2 text-green-600" />
              Massagens e Movimentos
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-medium text-gray-800">Massagem Circular</h3>
                <p className="text-sm text-gray-600">Faça movimentos circulares suaves no sentido horário no abdômen.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-800">Bicicleta</h3>
                <p className="text-sm text-gray-600">Mova as pernas do bebê como se estivesse pedalando.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-medium text-gray-800">Balanços Suaves</h3>
                <p className="text-sm text-gray-600">Balance o bebê suavemente em um sling ou nos braços.</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-medium text-gray-800">Ruído Branco</h3>
                <p className="text-sm text-gray-600">Use sons constantes como aspirador ou secador de cabelo.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <AlertCircle className="mr-2 text-red-600" />
              Gatilhos Comuns
            </h2>
            <div className="space-y-3">
              {gatilhos.map((gatilho, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-sm text-gray-600">{gatilho}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Dica:</strong> Mantenha um diário das cólicas para identificar padrões e gatilhos específicos do seu bebê.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quando Consultar um Médico</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <h3 className="font-medium text-red-800 mb-2">Sintomas de Alerta</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Cólicas que duram mais de 3 horas seguidas</li>
                <li>• Bebê não ganha peso adequado</li>
                <li>• Sangue nas fezes</li>
                <li>• Febre acima de 38°C</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
              <h3 className="font-medium text-blue-800 mb-2">Quando Melhoram</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Geralmente melhoram após 3-4 meses</li>
                <li>• Sistema digestivo amadurece</li>
                <li>• Bebê aprende a autorregular</li>
                <li>• Rotina consistente ajuda</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-purple-600 text-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Dicas Gerais para Cólicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <h3 className="font-medium mb-2">Alimentação</h3>
              <p className="text-sm opacity-90">Evite alimentar quando o bebê estiver muito agitado. Faça pausas para arrotar.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Ambiente</h3>
              <p className="text-sm opacity-90">Mantenha ambiente calmo e com iluminação suave durante crises.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Paciência</h3>
              <p className="text-sm opacity-90">Cólicas são temporárias. Abrace seu bebê e ofereça conforto constante.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}