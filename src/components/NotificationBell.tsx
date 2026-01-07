'use client'

import { useState, useEffect } from 'react'
import { Bell, X } from 'lucide-react'

interface Notification {
  id: string
  title: string
  message: string
  time: string
  type: 'info' | 'warning' | 'success'
  read: boolean
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [lastCheckedMinute, setLastCheckedMinute] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Carregar notificações do localStorage
    const saved = localStorage.getItem('baby_notifications')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setNotifications(parsed)
        setUnreadCount(parsed.filter((n: Notification) => !n.read).length)
      } catch (error) {
        console.error('Erro ao carregar notificações:', error)
      }
    }

    // Verificar notificações agendadas a cada segundo
    const checkScheduledNotifications = () => {
      try {
        const now = new Date()
        const currentTime = now.toTimeString().slice(0, 5) // HH:MM
        const currentMinute = `${now.getHours()}:${now.getMinutes()}`

        // Evitar disparar múltiplas vezes no mesmo minuto
        if (currentMinute === lastCheckedMinute) {
          return
        }
        setLastCheckedMinute(currentMinute)

        // Verificar agendamentos de refeições
        const mealSchedules = JSON.parse(localStorage.getItem('baby_meal_schedules') || '[]')
        mealSchedules.forEach((schedule: any) => {
          if (schedule.enabled && schedule.time === currentTime) {
            addNotification({
              title: 'Hora da Refeição',
              message: `Hora de ${schedule.meal}!`,
              type: 'info'
            })
          }
        })

        // Verificar agendamentos de sono
        const sleepSchedules = JSON.parse(localStorage.getItem('baby_sleep_schedules') || '[]')
        sleepSchedules.forEach((schedule: any) => {
          if (schedule.enabled && schedule.time === currentTime) {
            addNotification({
              title: 'Hora do Sono',
              message: 'Hora de colocar o bebê para dormir!',
              type: 'info'
            })
          }
        })

        // Verificar agendamentos de banho
        const bathSchedules = JSON.parse(localStorage.getItem('baby_bath_schedules') || '[]')
        bathSchedules.forEach((schedule: any) => {
          if (schedule.enabled && schedule.time === currentTime) {
            addNotification({
              title: 'Hora do Banho',
              message: 'Hora de dar banho no bebê!',
              type: 'info'
            })
          }
        })

        // Verificar agendamentos de cólicas
        const colicSchedules = JSON.parse(localStorage.getItem('baby_colic_schedules') || '[]')
        colicSchedules.forEach((schedule: any) => {
          if (schedule.enabled && schedule.time === currentTime) {
            addNotification({
              title: 'Hora da Técnica de Cólica',
              message: `Hora de aplicar: ${schedule.technique}!`,
              type: 'info'
            })
          }
        })

        // Verificar vacinas próximas (uma vez por dia às 09:00)
        if (currentTime === '09:00') {
          const vaccineSchedules = JSON.parse(localStorage.getItem('baby_vaccine_schedules') || '[]')
          vaccineSchedules.forEach((vaccine: any) => {
            if (vaccine.status === 'agendada' && vaccine.date) {
              const vaccineDate = new Date(vaccine.date)
              const diffTime = vaccineDate.getTime() - now.getTime()
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

              if (diffDays === 1) {
                addNotification({
                  title: 'Vacina Amanhã',
                  message: `A vacina ${vaccine.name} está agendada para amanhã!`,
                  type: 'warning'
                })
              } else if (diffDays === 0) {
                addNotification({
                  title: 'Vacina Hoje',
                  message: `A vacina ${vaccine.name} está agendada para hoje!`,
                  type: 'warning'
                })
              }
            }
          })
        }
      } catch (error) {
        console.error('Erro ao verificar notificações:', error)
      }
    }

    // Verificar imediatamente
    checkScheduledNotifications()

    // Verificar a cada 10 segundos para maior precisão
    const interval = setInterval(checkScheduledNotifications, 10000)

    return () => clearInterval(interval)
  }, [mounted, lastCheckedMinute])

  const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'read'>) => {
    if (!mounted) return

    const newNotification: Notification = {
      id: Date.now().toString(),
      ...notification,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      read: false
    }

    setNotifications(prev => {
      // Evitar duplicatas (mesma notificação nos últimos 2 minutos)
      const recentDuplicate = prev.find(n => 
        n.title === newNotification.title && 
        n.message === newNotification.message &&
        (Date.now() - parseInt(n.id)) < 120000 // 2 minutos
      )
      
      if (recentDuplicate) {
        return prev
      }

      const updated = [newNotification, ...prev]
      localStorage.setItem('baby_notifications', JSON.stringify(updated))
      setUnreadCount(updated.filter(n => !n.read).length)
      
      // Solicitar permissão para notificações do navegador
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission()
      }

      // Mostrar notificação do navegador se permitida
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/icon.svg',
          badge: '/icon.svg',
          tag: newNotification.id
        })
      }

      return updated
    })
  }

  const markAsRead = (id: string) => {
    if (!mounted) return

    setNotifications(prev => {
      const updated = prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
      localStorage.setItem('baby_notifications', JSON.stringify(updated))
      setUnreadCount(updated.filter(n => !n.read).length)
      return updated
    })
  }

  const deleteNotification = (id: string) => {
    if (!mounted) return

    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id)
      localStorage.setItem('baby_notifications', JSON.stringify(updated))
      setUnreadCount(updated.filter(n => !n.read).length)
      return updated
    })
  }

  const markAllAsRead = () => {
    if (!mounted) return

    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }))
      localStorage.setItem('baby_notifications', JSON.stringify(updated))
      setUnreadCount(0)
      return updated
    })
  }

  if (!mounted) {
    return (
      <div className="relative">
        <button className="relative p-2 text-gray-300 rounded-lg">
          <Bell size={20} />
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-800"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-xl shadow-xl border border-gray-700 z-50">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Notificações</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                >
                  Marcar todas como lidas
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                <Bell size={32} className="mx-auto mb-2 text-gray-600" />
                <p>Nenhuma notificação</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-700 hover:bg-gray-700/50 transition-colors ${
                    !notification.read ? 'bg-blue-900/30' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-white">{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-300 mb-1">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-blue-400 hover:bg-blue-900/50 rounded"
                          title="Marcar como lida"
                        >
                          ✓
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 text-red-400 hover:bg-red-900/50 rounded"
                        title="Excluir"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-700 text-center">
              <button
                onClick={() => setShowDropdown(false)}
                className="text-sm text-gray-400 hover:text-gray-200"
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
