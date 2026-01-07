'use client'

import { ArrowLeft, Baby, Thermometer, Clock, ShieldAlert, Heart, Plus, Trash2, Milk, Bell } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface FeedingRecord {
  id: string
  time: string
  amount: number
  date: string
}

interface FeedingSchedule {
  id: string
  time: string
  amount: number
  enabled: boolean
}

export default function MamadeiraPage() {
  const [feedingRecords, setFeedingRecords] = useState<FeedingRecord[]>([])
  const [feedingSchedules, setFeedingSchedules] = useState<FeedingSchedule[]>([])
  const [currentAmount, setCurrentAmount] = useState(60)
  const [currentTime, setCurrentTime] = useState('')
  const [scheduleTime, setScheduleTime] = useState('08:00')
  const [scheduleAmount, setScheduleAmount] = useState(120)

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const savedRecords = localStorage.getItem('baby_feeding_records')
    if (savedRecords) {
      setFeedingRecords(JSON.parse(savedRecords))
    }

    const savedSchedules = localStorage.getItem('baby_feeding_schedules')
    if (savedSchedules) {
      setFeedingSchedules(JSON.parse(savedSchedules))
    }

    // Solicitar permissão para notificações
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  // Salvar registros no localStorage sempre que mudarem
  useEffect(() => {
    if (feedingRecords.length > 0) {
      localStorage.setItem('baby_feeding_records', JSON.stringify(feedingRecords))
    }
  }, [feedingRecords])

  // Salvar agendamentos no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem('baby_feeding_schedules', JSON.stringify(feedingSchedules))
  }, [feedingSchedules])

  // Sistema de notificações - verifica a cada minuto
  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date()
      const currentHour = String(now.getHours()).padStart(2, '0')
      const currentMinute = String(now.getMinutes()).padStart(2, '0')
      const currentTime = `${currentHour}:${currentMinute}`
      const today = now.toISOString().split('T')[0]

      feedingSchedules.forEach(schedule => {
        if (schedule.enabled && schedule.time === currentTime) {
          const notificationKey = `feeding-${schedule.id}-${today}-${currentTime}`
          
          // Verificar se já notificou neste horário hoje
          const alreadyNotified = localStorage.getItem(notificationKey)
          if (alreadyNotified) {
            return
          }

          // Marcar como notificado
          localStorage.setItem(notificationKey, 'true')

          // Adicionar notificação no sino
          const notifications = JSON.parse(localStorage.getItem('baby_notifications') || '[]')
          const newNotification = {
            id: Date.now().toString(),
            title: '🍼 Hora da Mamadeira',
            message: `Hora de alimentar o bebê! ${schedule.amount}ml agendados.`,
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            read: false,
            category: 'feeding'
          }
          notifications.unshift(newNotification)
          localStorage.setItem('baby_notifications', JSON.stringify(notifications))
          
          // Disparar evento para atualizar o sino em tempo real
          window.dispatchEvent(new StorageEvent('storage', {
            key: 'baby_notifications',
            newValue: JSON.stringify(notifications),
            url: window.location.href
          }))

          // Notificação nativa do navegador
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('🍼 Hora da Mamadeira', {
              body: `Hora de alimentar o bebê! ${schedule.amount}ml agendados.`,
              icon: '/icon.svg',
              tag: notificationKey,
              requireInteraction: true
            })
          }
        }
      })
    }

    // Verificar imediatamente
    checkNotifications()
    
    // Verificar a cada 30 segundos para maior precisão
    const interval = setInterval(checkNotifications, 30000)

    return () => clearInterval(interval)
  }, [feedingSchedules])

  const addFeeding = () => {
    if (!currentTime) {
      alert('Por favor, selecione um horário')
      return
    }

    const newRecord: FeedingRecord = {
      id: Date.now().toString(),
      time: currentTime,
      amount: currentAmount,
      date: new Date().toLocaleDateString('pt-BR')
    }

    setFeedingRecords([...feedingRecords, newRecord])
    setCurrentTime('')
    setCurrentAmount(60)
  }

  const removeFeeding = (id: string) => {
    setFeedingRecords(feedingRecords.filter(record => record.id !== id))
  }

  const addSchedule = () => {
    const newSchedule: FeedingSchedule = {
      id: Date.now().toString(),
      time: scheduleTime,
      amount: scheduleAmount,
      enabled: true
    }
    const updatedSchedules = [...feedingSchedules, newSchedule]
    setFeedingSchedules(updatedSchedules)
    setScheduleTime('08:00')
    setScheduleAmount(120)
  }

  const toggleSchedule = (id: string) => {
    const updatedSchedules = feedingSchedules.map(s =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    )
    setFeedingSchedules(updatedSchedules)
  }

  const removeSchedule = (id: string) => {
    const updatedSchedules = feedingSchedules.filter(s => s.id !== id)
    setFeedingSchedules(updatedSchedules)
  }

  const totalToday = feedingRecords
    .filter(record => record.date === new Date().toLocaleDateString('pt-BR'))
    .reduce((sum, record) => sum + record.amount, 0)

  const feedingsToday = feedingRecords.filter(
    record => record.date === new Date().toLocaleDateString('pt-BR')
  ).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 mb-6 font-semibold hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft size={20} />
          Voltar ao início
        </Link>

        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl mb-6 shadow-xl">
            <Baby className="text-white" size={36} />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Mamadeira e Amamentação
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Orientações completas sobre posições corretas, tempos ideais e cuidados com a higiene.
          </p>
        </header>

        {/* Agendamento de Notificações */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <Bell className="text-white" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Agendar Notificações
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Horário</label>
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Quantidade (ml)</label>
              <input
                type="number"
                value={scheduleAmount}
                onChange={(e) => setScheduleAmount(Number(e.target.value))}
                min="30"
                max="300"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={addSchedule}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mb-6"
          >
            <Plus size={22} />
            Adicionar Notificação
          </button>

          {/* Lista de Agendamentos */}
          {feedingSchedules.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Notificações Agendadas</h3>
              {feedingSchedules.map(schedule => (
                <div
                  key={schedule.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200"
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleSchedule(schedule.id)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        schedule.enabled
                          ? 'bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg'
                          : 'bg-gray-300'
                      }`}
                    >
                      <Bell className="text-white" size={20} />
                    </button>
                    <div>
                      <p className="font-bold text-gray-800">{schedule.time}</p>
                      <p className="text-sm text-gray-600">{schedule.amount}ml</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeSchedule(schedule.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Guia Interativo de Quantidades */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Milk className="text-white" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Guia de Quantidades
            </h2>
          </div>

          {/* Estatísticas do Dia */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-100">
              <p className="text-sm font-semibold text-gray-600 mb-1">Total Hoje</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {totalToday}ml
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-5 border border-pink-100">
              <p className="text-sm font-semibold text-gray-600 mb-1">Mamadas Hoje</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                {feedingsToday}x
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100">
              <p className="text-sm font-semibold text-gray-600 mb-1">Média por Mamada</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {feedingsToday > 0 ? Math.round(totalToday / feedingsToday) : 0}ml
              </p>
            </div>
          </div>

          {/* Adicionar Nova Mamada */}
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 mb-6 border border-pink-100">
            <h3 className="text-xl font-bold text-gray-800 mb-5">Registrar Nova Mamada</h3>
            
            <div className="space-y-5">
              {/* Seletor de Quantidade */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Quantidade (ml)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="30"
                    max="240"
                    step="10"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(Number(e.target.value))}
                    className="flex-1 h-3 bg-gradient-to-r from-pink-200 to-rose-300 rounded-lg appearance-none cursor-pointer accent-pink-600"
                  />
                  <div className="w-24 text-center">
                    <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                      {currentAmount}
                    </span>
                    <span className="text-sm text-gray-600 font-semibold ml-1">ml</span>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                  <span>30ml</span>
                  <span>240ml</span>
                </div>
              </div>

              {/* Seletor de Horário */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Horário
                </label>
                <input
                  type="time"
                  value={currentTime}
                  onChange={(e) => setCurrentTime(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm font-medium"
                />
              </div>

              <button
                onClick={addFeeding}
                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Plus size={22} />
                Adicionar Mamada
              </button>
            </div>
          </div>

          {/* Histórico de Mamadas */}
          {feedingRecords.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Histórico de Hoje</h3>
              <div className="space-y-3">
                {feedingRecords
                  .filter(record => record.date === new Date().toLocaleDateString('pt-BR'))
                  .sort((a, b) => b.time.localeCompare(a.time))
                  .map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-pink-100 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center shadow-md">
                          <Baby className="text-white" size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-lg">{record.amount}ml</p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Clock size={12} />
                            {record.time}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFeeding(record.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Orientações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 border border-white/50">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Amamentação</h2>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-pink-500 pl-4 py-2">
                <h3 className="font-bold text-gray-800 mb-1">Posição Correta</h3>
                <p className="text-sm text-gray-600">Mãe confortável, bebê alinhado, boca aberta e língua para baixo.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold text-gray-800 mb-1">Frequência</h3>
                <p className="text-sm text-gray-600">A cada 2-3 horas no início, diminuindo conforme cresce.</p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4 py-2">
                <h3 className="font-bold text-gray-800 mb-1">Duração</h3>
                <p className="text-sm text-gray-600">10-20 minutos por mama, até o bebê soltar sozinho.</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 border border-white/50">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Baby className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Mamadeira</h2>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold text-gray-800 mb-1">Preparação</h3>
                <p className="text-sm text-gray-600">Lave as mãos, esterilize mamadeira e bico diariamente.</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4 py-2">
                <h3 className="font-bold text-gray-800 mb-1">Mistura</h3>
                <p className="text-sm text-gray-600">Siga exatamente as instruções do fabricante da fórmula.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="font-bold text-gray-800 mb-1">Posição</h3>
                <p className="text-sm text-gray-600">Segure o bebê semi-sentado, bico cheio de leite.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 border border-white/50">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <Thermometer className="text-white" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Temperatura Ideal</h2>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                <h4 className="font-bold text-emerald-800 text-sm mb-1">Leite Materno</h4>
                <p className="text-xs text-emerald-700">Temperatura corporal (37°C)</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                <h4 className="font-bold text-blue-800 text-sm mb-1">Mamadeira</h4>
                <p className="text-xs text-blue-700">36-37°C. Teste no pulso.</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-100">
                <h4 className="font-bold text-yellow-800 text-sm mb-1">Como Testar</h4>
                <p className="text-xs text-yellow-700">Pingue no pulso interno. Deve estar morno.</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 border border-white/50">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="text-white" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Tempo Ideal</h2>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                <h4 className="font-bold text-purple-800 text-sm mb-1">Recém-nascido</h4>
                <p className="text-xs text-purple-700">20-30 minutos por mamada</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100">
                <h4 className="font-bold text-indigo-800 text-sm mb-1">1-3 meses</h4>
                <p className="text-xs text-indigo-700">15-20 minutos por mamada</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-100">
                <h4 className="font-bold text-pink-800 text-sm mb-1">3-6 meses</h4>
                <p className="text-xs text-pink-700">10-15 minutos por mamada</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 border border-white/50">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <ShieldAlert className="text-white" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Esterilização</h2>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-100">
                <h4 className="font-bold text-red-800 text-sm mb-1">Diariamente</h4>
                <p className="text-xs text-red-700">Ferva por 5 minutos ou use esterilizador</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-100">
                <h4 className="font-bold text-yellow-800 text-sm mb-1">Após Uso</h4>
                <p className="text-xs text-yellow-700">Lave imediatamente após cada mamada</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                <h4 className="font-bold text-emerald-800 text-sm mb-1">Armazenamento</h4>
                <p className="text-xs text-emerald-700">Guarde em local fresco e seco</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 border border-white/50">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">Alertas Importantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl">
              <h3 className="font-bold text-yellow-800 mb-2 text-lg">Sinais de Fome</h3>
              <p className="text-sm text-yellow-700">
                Choro, sucção nos punhos, agitação. Não espere muito para alimentar.
              </p>
            </div>
            <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl">
              <h3 className="font-bold text-blue-800 mb-2 text-lg">Hidratação</h3>
              <p className="text-sm text-blue-700">
                Bebês amamentados não precisam de água extra até 6 meses.
              </p>
            </div>
            <div className="p-5 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-xl">
              <h3 className="font-bold text-red-800 mb-2 text-lg">Refluxo</h3>
              <p className="text-sm text-red-700">
                Mantenha o bebê ereto após mamar por 20-30 minutos.
              </p>
            </div>
            <div className="p-5 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl">
              <h3 className="font-bold text-emerald-800 mb-2 text-lg">Rotação de Mamilos</h3>
              <p className="text-sm text-emerald-700">
                Alterne mamas em cada mamada para estimular produção igual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
