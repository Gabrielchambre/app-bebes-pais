'use client'

import { ArrowLeft, Moon, Clock, Bell, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface SleepSchedule {
  id: string
  time: string
  enabled: boolean
}

export default function SonoPage() {
  const [schedules, setSchedules] = useState<SleepSchedule[]>([])
  const [newScheduleTime, setNewScheduleTime] = useState('')
  const [mounted, setMounted] = useState(false)

  // Carregar agendamentos do localStorage
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('baby_sleep_schedules')
    if (saved) {
      try {
        setSchedules(JSON.parse(saved))
      } catch (error) {
        console.error('Erro ao carregar agendamentos:', error)
        // Inicializar com agendamentos padrão
        const defaultSchedules = [
          { id: '1', time: '14:00', enabled: true },
          { id: '2', time: '20:00', enabled: true }
        ]
        setSchedules(defaultSchedules)
        localStorage.setItem('baby_sleep_schedules', JSON.stringify(defaultSchedules))
      }
    } else {
      // Inicializar com agendamentos padrão
      const defaultSchedules = [
        { id: '1', time: '14:00', enabled: true },
        { id: '2', time: '20:00', enabled: true }
      ]
      setSchedules(defaultSchedules)
      localStorage.setItem('baby_sleep_schedules', JSON.stringify(defaultSchedules))
    }
  }, [])

  // Salvar agendamentos no localStorage sempre que mudarem
  useEffect(() => {
    if (mounted && schedules.length > 0) {
      localStorage.setItem('baby_sleep_schedules', JSON.stringify(schedules))
    }
  }, [schedules, mounted])

  const addSchedule = () => {
    if (newScheduleTime) {
      const newSchedule: SleepSchedule = {
        id: Date.now().toString(),
        time: newScheduleTime,
        enabled: true
      }
      const updatedSchedules = [...schedules, newSchedule]
      setSchedules(updatedSchedules)
      setNewScheduleTime('')
    }
  }

  const toggleSchedule = (id: string) => {
    const updatedSchedules = schedules.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    )
    setSchedules(updatedSchedules)
  }

  const removeSchedule = (id: string) => {
    const updatedSchedules = schedules.filter(s => s.id !== id)
    setSchedules(updatedSchedules)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2">
            <ArrowLeft size={20} />
            Voltar
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Moon className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Sono do Bebê</h1>
              <p className="text-gray-600 mt-1">Rotina de sono e notificações</p>
            </div>
          </div>

          {/* Horários Agendados */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="text-indigo-600" size={20} />
              Horários de Sono
            </h2>
            
            <div className="space-y-3 mb-4">
              {schedules.map(schedule => (
                <div
                  key={schedule.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                      <Moon className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">{schedule.time}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Bell size={12} />
                        {schedule.enabled ? 'Notificação ativa' : 'Notificação desativada'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSchedule(schedule.id)}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        schedule.enabled ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                        schedule.enabled ? 'translate-x-6' : ''
                      }`} />
                    </button>
                    <button
                      onClick={() => removeSchedule(schedule.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                type="time"
                value={newScheduleTime}
                onChange={(e) => setNewScheduleTime(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={addSchedule}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium flex items-center gap-2"
              >
                <Plus size={20} />
                Adicionar
              </button>
            </div>
          </div>
        </div>

        {/* Dicas de Sono */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Dicas para um Sono Tranquilo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-2">Ambiente Ideal</h3>
              <p className="text-sm text-blue-700">Quarto escuro, silencioso e com temperatura entre 20-22°C.</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <h3 className="font-bold text-purple-800 mb-2">Rotina Consistente</h3>
              <p className="text-sm text-purple-700">Mantenha horários regulares para dormir e acordar.</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <h3 className="font-bold text-green-800 mb-2">Ritual de Sono</h3>
              <p className="text-sm text-green-700">Banho morno, música suave e história antes de dormir.</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
              <h3 className="font-bold text-orange-800 mb-2">Evite Estímulos</h3>
              <p className="text-sm text-orange-700">Desligue telas 1 hora antes de dormir.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
