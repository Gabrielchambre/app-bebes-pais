'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, History, Calendar, Clock, Utensils, Moon, Syringe, Bath, Activity, Plus } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface DailyActivity {
  id: string
  date: string
  time: string
  type: 'alimentacao' | 'sono' | 'vacina' | 'banho' | 'atividade' | 'outro'
  description: string
  notes?: string
  created_by: string
}

export default function HistoricoPage() {
  const [activities, setActivities] = useState<DailyActivity[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newActivity, setNewActivity] = useState({
    time: '',
    type: 'alimentacao' as 'alimentacao' | 'sono' | 'vacina' | 'banho' | 'atividade' | 'outro',
    description: '',
    notes: ''
  })

  useEffect(() => {
    loadActivities()
  }, [selectedDate])

  const loadActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('daily_activities')
        .select('*')
        .eq('date', selectedDate)
        .order('time', { ascending: true })

      if (error) throw error
      setActivities(data || [])
    } catch (error) {
      // Fallback para localStorage
      const saved = localStorage.getItem(`baby_activities_${selectedDate}`)
      if (saved) {
        setActivities(JSON.parse(saved))
      } else {
        setActivities([])
      }
    }
  }

  const saveActivities = (newActivities: DailyActivity[]) => {
    setActivities(newActivities)
    localStorage.setItem(`baby_activities_${selectedDate}`, JSON.stringify(newActivities))
  }

  const addActivity = async () => {
    if (newActivity.time && newActivity.description) {
      const activity: DailyActivity = {
        id: Date.now().toString(),
        date: selectedDate,
        ...newActivity,
        created_by: 'user1'
      }

      try {
        const { data, error } = await supabase
          .from('daily_activities')
          .insert([activity])
          .select()

        if (error) throw error
        saveActivities([...activities, data[0]].sort((a, b) => a.time.localeCompare(b.time)))
      } catch (error) {
        // Fallback para localStorage
        saveActivities([...activities, activity].sort((a, b) => a.time.localeCompare(b.time)))
      }

      setNewActivity({ time: '', type: 'alimentacao', description: '', notes: '' })
      setShowAddModal(false)
    }
  }

  const deleteActivity = async (id: string) => {
    try {
      const { error } = await supabase
        .from('daily_activities')
        .delete()
        .eq('id', id)

      if (error) throw error
      saveActivities(activities.filter(a => a.id !== id))
    } catch (error) {
      // Fallback para localStorage
      saveActivities(activities.filter(a => a.id !== id))
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'alimentacao': return <Utensils size={20} />
      case 'sono': return <Moon size={20} />
      case 'vacina': return <Syringe size={20} />
      case 'banho': return <Bath size={20} />
      case 'atividade': return <Activity size={20} />
      default: return <Clock size={20} />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'alimentacao': return 'from-emerald-500 to-teal-600'
      case 'sono': return 'from-indigo-500 to-purple-600'
      case 'vacina': return 'from-green-500 to-emerald-600'
      case 'banho': return 'from-cyan-500 to-blue-600'
      case 'atividade': return 'from-orange-500 to-red-600'
      default: return 'from-gray-500 to-slate-600'
    }
  }

  const getActivityName = (type: string) => {
    switch (type) {
      case 'alimentacao': return 'Alimentação'
      case 'sono': return 'Sono'
      case 'vacina': return 'Vacina'
      case 'banho': return 'Banho'
      case 'atividade': return 'Atividade'
      case 'outro': return 'Outro'
      default: return type
    }
  }

  const groupedActivities = activities.reduce((groups, activity) => {
    const hour = activity.time.split(':')[0]
    if (!groups[hour]) groups[hour] = []
    groups[hour].push(activity)
    return groups
  }, {} as Record<string, DailyActivity[]>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
            <ArrowLeft size={20} />
            Voltar
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <History className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Histórico do Dia</h1>
                <p className="text-gray-600 mt-1">Acompanhe todas as atividades diárias</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
            >
              <Plus size={20} />
              Nova Atividade
            </button>
          </div>

          {/* Seletor de Data */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Selecionar Data</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Timeline de Atividades */}
          <div className="space-y-6">
            {Object.keys(groupedActivities).length === 0 ? (
              <div className="text-center py-12">
                <History size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Nenhuma atividade registrada para esta data</p>
                <p className="text-sm text-gray-400 mt-2">Comece adicionando atividades do dia!</p>
              </div>
            ) : (
              Object.entries(groupedActivities)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([hour, hourActivities]) => (
                  <div key={hour} className="relative">
                    {/* Linha do tempo */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-indigo-200"></div>

                    {/* Hora */}
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg text-white font-bold z-10">
                        {hour}h
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-800">{hour}:00</h3>
                      </div>
                    </div>

                    {/* Atividades da hora */}
                    <div className="ml-16 space-y-3">
                      {hourActivities.map(activity => (
                        <div
                          key={activity.id}
                          className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <div className={`w-10 h-10 bg-gradient-to-br ${getActivityColor(activity.type)} rounded-lg flex items-center justify-center shadow-md flex-shrink-0`}>
                                {getActivityIcon(activity.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-gray-800">{activity.description}</h4>
                                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                    {getActivityName(activity.type)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">{activity.time}</p>
                                {activity.notes && (
                                  <p className="text-sm text-gray-600 italic">{activity.notes}</p>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => deleteActivity(activity.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                              title="Excluir"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Resumo do Dia */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumo do Dia</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
              <Utensils className="mx-auto text-emerald-600 mb-2" size={24} />
              <div className="text-2xl font-bold text-emerald-700">
                {activities.filter(a => a.type === 'alimentacao').length}
              </div>
              <p className="text-sm text-emerald-600">Refeições</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
              <Moon className="mx-auto text-indigo-600 mb-2" size={24} />
              <div className="text-2xl font-bold text-indigo-700">
                {activities.filter(a => a.type === 'sono').length}
              </div>
              <p className="text-sm text-indigo-600">Sonecas</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <Syringe className="mx-auto text-green-600 mb-2" size={24} />
              <div className="text-2xl font-bold text-green-700">
                {activities.filter(a => a.type === 'vacina').length}
              </div>
              <p className="text-sm text-green-600">Vacinas</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl">
              <Bath className="mx-auto text-cyan-600 mb-2" size={24} />
              <div className="text-2xl font-bold text-cyan-700">
                {activities.filter(a => a.type === 'banho').length}
              </div>
              <p className="text-sm text-cyan-600">Banhos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Nova Atividade */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nova Atividade</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Horário</label>
                <input
                  type="time"
                  value={newActivity.time}
                  onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Atividade</label>
                <select
                  value={newActivity.type}
                  onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value as any })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="alimentacao">Alimentação</option>
                  <option value="sono">Sono</option>
                  <option value="vacina">Vacina</option>
                  <option value="banho">Banho</option>
                  <option value="atividade">Atividade</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição</label>
                <input
                  type="text"
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                  placeholder="Ex: Mamadeira de 180ml, Soneca da tarde..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Observações (opcional)</label>
                <textarea
                  value={newActivity.notes}
                  onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
                  placeholder="Detalhes adicionais..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={addActivity}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}