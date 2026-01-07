'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Syringe, Plus, Check, Clock, Bell, Calendar, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Vaccine {
  id: string
  name: string
  date: Date
  status: 'aplicada' | 'agendada' | 'atrasada'
  notes?: string
  nextDose?: Date
  notificationTime?: string
  notificationEnabled?: boolean
}

export default function VacinasPage() {
  const [vaccines, setVaccines] = useState<Vaccine[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newVaccine, setNewVaccine] = useState({
    name: '',
    date: '',
    status: 'agendada' as 'aplicada' | 'agendada',
    notes: '',
    notificationTime: '09:00',
    notificationEnabled: false
  })

  useEffect(() => {
    // Carregar vacinas do localStorage
    const saved = localStorage.getItem('baby_vaccines')
    if (saved) {
      const parsed = JSON.parse(saved)
      setVaccines(parsed.map((v: any) => ({
        ...v,
        date: new Date(v.date),
        nextDose: v.nextDose ? new Date(v.nextDose) : undefined
      })))
    } else {
      // Dados iniciais
      setVaccines([
        {
          id: '1',
          name: 'BCG',
          date: new Date(2024, 0, 5),
          status: 'aplicada',
          notes: 'Dose única ao nascer'
        },
        {
          id: '2',
          name: 'Hepatite B',
          date: new Date(2024, 1, 15),
          status: 'agendada',
          notes: 'Segunda dose',
          notificationTime: '09:00',
          notificationEnabled: true
        }
      ])
    }
  }, [])

  useEffect(() => {
    // Salvar vacinas no localStorage
    if (vaccines.length > 0) {
      localStorage.setItem('baby_vaccines', JSON.stringify(vaccines))
      localStorage.setItem('baby_vaccine_schedules', JSON.stringify(vaccines))
    }
  }, [vaccines])

  const commonVaccines = [
    { name: 'BCG', age: 'Ao nascer' },
    { name: 'Hepatite B', age: 'Ao nascer, 1 e 6 meses' },
    { name: 'Pentavalente', age: '2, 4 e 6 meses' },
    { name: 'Poliomielite (VIP/VOP)', age: '2, 4, 6 e 15 meses' },
    { name: 'Pneumocócica 10', age: '2, 4 e 6 meses' },
    { name: 'Rotavírus', age: '2 e 4 meses' },
    { name: 'Meningocócica C', age: '3, 5 e 12 meses' },
    { name: 'Febre Amarela', age: '9 meses' },
    { name: 'Tríplice Viral (SCR)', age: '12 meses e 15 meses' },
    { name: 'Hepatite A', age: '15 meses' },
    { name: 'Varicela', age: '15 meses' }
  ]

  const addVaccine = () => {
    if (newVaccine.name && newVaccine.date) {
      const vaccine: Vaccine = {
        id: Date.now().toString(),
        name: newVaccine.name,
        date: new Date(newVaccine.date),
        status: newVaccine.status,
        notes: newVaccine.notes,
        notificationTime: newVaccine.notificationTime,
        notificationEnabled: newVaccine.notificationEnabled
      }
      setVaccines([...vaccines, vaccine])
      setNewVaccine({ name: '', date: '', status: 'agendada', notes: '', notificationTime: '09:00', notificationEnabled: false })
      setShowAddModal(false)
    }
  }

  const removeVaccine = (id: string) => {
    setVaccines(vaccines.filter(v => v.id !== id))
  }

  const markAsApplied = (id: string) => {
    setVaccines(vaccines.map(v => 
      v.id === id ? { ...v, status: 'aplicada' as const } : v
    ))
  }

  const toggleNotification = (id: string) => {
    setVaccines(vaccines.map(v =>
      v.id === id ? { ...v, notificationEnabled: !v.notificationEnabled } : v
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2">
            <ArrowLeft size={20} />
            Voltar
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Syringe className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Cartão de Vacinas</h1>
                <p className="text-gray-600 mt-1">Controle completo de vacinação</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
            >
              <Plus size={20} />
              Adicionar
            </button>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
              <p className="text-sm font-semibold text-gray-600 mb-1">Aplicadas</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {vaccines.filter(v => v.status === 'aplicada').length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200">
              <p className="text-sm font-semibold text-gray-600 mb-1">Agendadas</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {vaccines.filter(v => v.status === 'agendada').length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-200">
              <p className="text-sm font-semibold text-gray-600 mb-1">Atrasadas</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                {vaccines.filter(v => v.status === 'atrasada').length}
              </p>
            </div>
          </div>

          {/* Lista de Vacinas */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Histórico de Vacinas</h2>
            {vaccines.length === 0 ? (
              <div className="text-center py-12">
                <Syringe size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Nenhuma vacina registrada ainda</p>
              </div>
            ) : (
              vaccines.map(vaccine => (
                <div
                  key={vaccine.id}
                  className={`p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                    vaccine.status === 'aplicada' 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                      : vaccine.status === 'agendada'
                      ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200'
                      : 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
                        vaccine.status === 'aplicada' 
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                          : vaccine.status === 'agendada'
                          ? 'bg-gradient-to-br from-blue-500 to-cyan-600'
                          : 'bg-gradient-to-br from-orange-500 to-red-600'
                      }`}>
                        {vaccine.status === 'aplicada' ? (
                          <Check className="text-white" size={24} />
                        ) : vaccine.status === 'agendada' ? (
                          <Clock className="text-white" size={24} />
                        ) : (
                          <Bell className="text-white" size={24} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800">{vaccine.name}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <Calendar size={14} />
                          {vaccine.date.toLocaleDateString('pt-BR')}
                        </p>
                        {vaccine.notes && (
                          <p className="text-sm text-gray-600 mt-2">{vaccine.notes}</p>
                        )}
                        <div className="flex items-center gap-4 mt-3">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            vaccine.status === 'aplicada' 
                              ? 'bg-green-200 text-green-800' 
                              : vaccine.status === 'agendada'
                              ? 'bg-blue-200 text-blue-800'
                              : 'bg-orange-200 text-orange-800'
                          }`}>
                            {vaccine.status === 'aplicada' ? 'Aplicada' : vaccine.status === 'agendada' ? 'Agendada' : 'Atrasada'}
                          </span>
                          {vaccine.status === 'agendada' && vaccine.notificationTime && (
                            <button
                              onClick={() => toggleNotification(vaccine.id)}
                              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                                vaccine.notificationEnabled
                                  ? 'bg-blue-200 text-blue-800'
                                  : 'bg-gray-200 text-gray-600'
                              }`}
                            >
                              <Bell size={12} />
                              {vaccine.notificationEnabled ? 'Notificação ativa' : 'Ativar notificação'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {vaccine.status !== 'aplicada' && (
                        <button
                          onClick={() => markAsApplied(vaccine.id)}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                          title="Marcar como aplicada"
                        >
                          <Check size={20} />
                        </button>
                      )}
                      <button
                        onClick={() => removeVaccine(vaccine.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="Remover"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Calendário de Vacinação */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Calendário Nacional de Vacinação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonVaccines.map((vaccine, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <h3 className="font-bold text-gray-800 mb-2">{vaccine.name}</h3>
                <p className="text-sm text-gray-600">{vaccine.age}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Adicionar Vacina */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nova Vacina</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome da Vacina</label>
                <input
                  type="text"
                  value={newVaccine.name}
                  onChange={(e) => setNewVaccine({ ...newVaccine, name: e.target.value })}
                  placeholder="Ex: BCG, Hepatite B..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Data</label>
                <input
                  type="date"
                  value={newVaccine.date}
                  onChange={(e) => setNewVaccine({ ...newVaccine, date: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={newVaccine.status}
                  onChange={(e) => setNewVaccine({ ...newVaccine, status: e.target.value as 'aplicada' | 'agendada' })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="agendada">Agendada</option>
                  <option value="aplicada">Aplicada</option>
                </select>
              </div>
              {newVaccine.status === 'agendada' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Horário da Notificação</label>
                    <input
                      type="time"
                      value={newVaccine.notificationTime}
                      onChange={(e) => setNewVaccine({ ...newVaccine, notificationTime: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="notification"
                      checked={newVaccine.notificationEnabled}
                      onChange={(e) => setNewVaccine({ ...newVaccine, notificationEnabled: e.target.checked })}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="notification" className="text-sm font-medium text-gray-700">
                      Ativar notificação
                    </label>
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Observações</label>
                <textarea
                  value={newVaccine.notes}
                  onChange={(e) => setNewVaccine({ ...newVaccine, notes: e.target.value })}
                  placeholder="Notas adicionais..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
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
                  onClick={addVaccine}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
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
