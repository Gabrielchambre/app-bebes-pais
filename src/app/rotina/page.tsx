'use client'

import { useState } from 'react'
import { ArrowLeft, Users, Clock, Bell, Share2, Plus, Edit, Trash2, Check } from 'lucide-react'
import Link from 'next/link'

interface Activity {
  id: string
  time: string
  title: string
  description: string
  color: string
  completed: boolean
}

export default function RotinaPage() {
  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', time: '07:00', title: 'Mamadeira', description: '180ml de leite', color: 'blue', completed: false },
    { id: '2', time: '09:00', title: 'Soneca da Manhã', description: 'Duração: 1-2 horas', color: 'green', completed: false },
    { id: '3', time: '12:00', title: 'Almoço', description: 'Papinha de legumes', color: 'yellow', completed: false },
    { id: '4', time: '18:00', title: 'Banho', description: 'Temperatura: 37°C', color: 'cyan', completed: false }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [newActivity, setNewActivity] = useState({
    time: '',
    title: '',
    description: '',
    color: 'blue'
  })

  const addActivity = () => {
    if (newActivity.time && newActivity.title) {
      const activity: Activity = {
        id: Date.now().toString(),
        ...newActivity,
        completed: false
      }
      setActivities([...activities, activity].sort((a, b) => a.time.localeCompare(b.time)))
      setNewActivity({ time: '', title: '', description: '', color: 'blue' })
      setShowAddModal(false)
    }
  }

  const toggleActivity = (id: string) => {
    setActivities(activities.map(a => 
      a.id === id ? { ...a, completed: !a.completed } : a
    ))
  }

  const removeActivity = (id: string) => {
    setActivities(activities.filter(a => a.id !== id))
  }

  const colorClasses = {
    blue: 'border-blue-500 bg-blue-50',
    green: 'border-green-500 bg-green-50',
    yellow: 'border-yellow-500 bg-yellow-50',
    cyan: 'border-cyan-500 bg-cyan-50',
    purple: 'border-purple-500 bg-purple-50',
    pink: 'border-pink-500 bg-pink-50'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2">
            <ArrowLeft size={20} />
            Voltar
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Rotina e Painel</h1>
                <p className="text-gray-600 mt-1">Organize a rotina do bebê</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
            >
              <Plus size={20} />
              Adicionar
            </button>
          </div>

          {/* Painel de Rotina Diária */}
          <div className="space-y-4">
            {activities.map(activity => (
              <div
                key={activity.id}
                className={`border-l-4 ${colorClasses[activity.color as keyof typeof colorClasses]} p-4 rounded-r-lg transition-all duration-300 ${
                  activity.completed ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => toggleActivity(activity.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        activity.completed 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-600' 
                          : 'border-gray-300 hover:border-indigo-600'
                      }`}
                    >
                      {activity.completed && <Check size={16} className="text-white" />}
                    </button>
                    <div className="flex-1">
                      <p className={`font-semibold text-gray-800 ${activity.completed ? 'line-through' : ''}`}>
                        {activity.time} - {activity.title}
                      </p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeActivity(activity.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compartilhamento */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Share2 className="text-indigo-600" size={24} />
            Compartilhar Rotina
          </h2>
          <p className="text-gray-600 mb-4">
            Compartilhe a rotina do bebê com babás, avós ou outros cuidadores para que todos estejam alinhados.
          </p>
          <div className="flex gap-4">
            <input 
              type="email" 
              placeholder="Digite o e-mail do cuidador"
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium">
              Enviar Convite
            </button>
          </div>
        </div>
      </div>

      {/* Modal Adicionar Atividade */}
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Título</label>
                <input
                  type="text"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                  placeholder="Ex: Mamadeira, Soneca..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição</label>
                <input
                  type="text"
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                  placeholder="Detalhes da atividade..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cor</label>
                <div className="flex gap-2">
                  {['blue', 'green', 'yellow', 'cyan', 'purple', 'pink'].map(color => (
                    <button
                      key={color}
                      onClick={() => setNewActivity({ ...newActivity, color })}
                      className={`w-10 h-10 rounded-lg border-2 transition-all duration-300 ${
                        newActivity.color === color ? 'scale-110 border-gray-800' : 'border-gray-300'
                      } ${colorClasses[color as keyof typeof colorClasses]}`}
                    />
                  ))}
                </div>
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
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
