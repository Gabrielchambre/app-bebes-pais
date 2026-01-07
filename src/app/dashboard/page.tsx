'use client'

import Link from 'next/link'
import { Moon, Utensils, Heart, Baby, Bath, Package2, Clock, Users, LogOut, HelpCircle, MessageSquare, Shield, Calendar, ListChecks, BookOpen, History, Syringe, User, HeartHandshake } from 'lucide-react'
import { NotificationBell } from '@/components/NotificationBell'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const sections = [
  {
    title: 'Perfil do Bebê',
    description: 'Nome, idade, peso, altura e preferências',
    icon: User,
    href: '/perfil',
    gradient: 'from-blue-400 to-indigo-500',
    bgGradient: 'from-gray-800 to-gray-700',
  },
  {
    title: 'Acompanhamento da Gravidez',
    description: 'Jornada semanal com desenvolvimento do bebê e dicas',
    icon: HeartHandshake,
    href: '/gravidez',
    gradient: 'from-pink-500 to-purple-600',
    bgGradient: 'from-gray-800 to-gray-700',
  },
  {
    title: 'Cartão de Vacinas',
    description: 'Controle histórico, agendamento e notificações',
    icon: Syringe,
    href: '/vacinas',
    gradient: 'from-green-400 to-emerald-500',
    bgGradient: 'from-gray-800 to-gray-700',
  },
  {
    title: 'Sono do Bebê',
    description: 'Dicas de rotina, acompanhamento e alertas personalizados',
    icon: Moon,
    href: '/sono',
    gradient: 'from-indigo-400 to-purple-500',
    bgGradient: 'from-gray-800 to-gray-700',
  },
  {
    title: 'Introdução Alimentar',
    description: 'Passo a passo, alimentos por idade e receitas',
    icon: Utensils,
    href: '/alimentacao',
    gradient: 'from-emerald-400 to-teal-500',
    bgGradient: 'from-gray-800 to-gray-700',
  },
  {
    title: 'Engasgo e Primeiros Socorros',
    description: 'Guia ilustrado e botão de emergência',
    icon: Heart,
    href: '/primeiros-socorros',
    gradient: 'from-rose-400 to-red-500',
    bgGradient: 'from-gray-800 to-gray-700',
  },
  {
    title: 'Mamadeira e Amamentação',
    description: 'Orientações sobre posição, tempo e esterilização',
    icon: Baby,
    href: '/mamadeira',
    gradient: 'from-pink-400 to-rose-500',
    bgGradient: 'from-gray-800 to-gray-700',
  },
  {
    title: 'Cólicas do Bebê',
    description: 'Técnicas, posições e gatilhos comuns',
    icon: Clock,
    href: '/colicas',
    gradient: 'from-violet-400 to-purple-500',
    bgGradient: 'from-gray-800 to-gray-700',
  },
  {
    title: 'Hora do Banho',
    description: 'Checklist de segurança e passo a passo',
    icon: Bath,
    href: '/banho',
    gradient: 'from-cyan-400 to-blue-500',
    bgGradient: 'from-gray-800 to-gray-700',
  },
  {
    title: 'Troca de Fralda',
    description: 'Passo a passo e alertas sobre assaduras',
    icon: Package2,
    href: '/fralda',
    gradient: 'from-amber-400 to-orange-500',
    bgGradient: 'from-gray-800 to-gray-700',
  },
  {
    title: 'Rotina e Painel',
    description: 'Salve rotinas e compartilhe com babás',
    icon: Users,
    href: '/rotina',
    gradient: 'from-blue-400 to-indigo-500',
    bgGradient: 'from-gray-800 to-gray-700',
  },
  {
    title: 'Calendário',
    description: 'Organize consultas e eventos com a família',
    icon: Calendar,
    href: '/calendario',
    gradient: 'from-blue-500 to-purple-600',
    bgGradient: 'from-gray-800 to-gray-700',
  },
  {
    title: 'Listas de Compras',
    description: 'Compras, tarefas e emergências em família',
    icon: ListChecks,
    href: '/listas',
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-gray-800 to-gray-700',
  },
  {
    title: 'Diário de Descobertas',
    description: 'Registre momentos especiais do bebê',
    icon: BookOpen,
    href: '/descobertas',
    gradient: 'from-pink-500 to-rose-600',
    bgGradient: 'from-gray-800 to-gray-700',
  },
  {
    title: 'Histórico do Dia',
    description: 'Acompanhe todas as atividades diárias',
    icon: History,
    href: '/historico',
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-gray-800 to-gray-700',
  },
]

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar se estamos no browser
    if (typeof window === 'undefined') {
      return
    }

    // Verificar se usuário está logado
    const user = localStorage.getItem('babycare_user')
    if (!user) {
      router.push('/login')
      return
    }
    
    try {
      const userData = JSON.parse(user)
      setUserEmail(userData.email)
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error)
      router.push('/login')
    } finally {
      setIsLoading(false)
    }

    // Prevenir voltar para login - adiciona entrada no histórico
    window.history.pushState(null, '', window.location.href)
    
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [router])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('babycare_user')
    }
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Baby className="text-white" size={32} />
          </div>
          <p className="text-gray-300 font-medium">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header com navegação */}
      <nav className="bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-gray-700">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Baby className="text-white" size={20} />
              </div>
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent truncate">
                BabyCare
              </h1>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <Link
                href="/ajuda"
                className="flex items-center gap-1 sm:gap-2 text-gray-300 hover:text-blue-400 transition-all duration-300 hover:scale-105 p-1 sm:p-0"
              >
                <HelpCircle size={18} className="sm:w-5 sm:h-5" />
                <span className="hidden md:inline font-medium text-sm">Ajuda</span>
              </Link>
              
              <Link
                href="/feedback"
                className="flex items-center gap-1 sm:gap-2 text-gray-300 hover:text-purple-400 transition-all duration-300 hover:scale-105 p-1 sm:p-0"
              >
                <MessageSquare size={18} className="sm:w-5 sm:h-5" />
                <span className="hidden md:inline font-medium text-sm">Feedback</span>
              </Link>
              
              <NotificationBell />
              
              <div className="flex items-center gap-1 sm:gap-2">
                <Link
                  href="/perfil"
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-blue-900/30 rounded-xl hover:scale-105 transition-all duration-300"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md text-xs sm:text-base">
                    {userEmail.charAt(0).toUpperCase()}
                  </div>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-gray-300 hover:text-red-400 transition-all duration-300 hover:scale-105"
                  title="Sair"
                >
                  <LogOut size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
            Seu guia completo para<br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              cuidar do bebê
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Informações práticas, educativas e visuais para pais e babás.
            Acompanhe rotinas, receba lembretes e tenha tudo em um só lugar.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group"
              >
                <div className={`bg-gradient-to-br ${section.bgGradient} rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-5 sm:p-6 h-full border border-gray-600 hover:scale-105 hover:-translate-y-1`}>
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon size={24} className="sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                    {section.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        <footer className="mt-16 sm:mt-20 pt-6 sm:pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400 text-sm sm:text-base">
            <p className="font-medium text-center sm:text-left">© 2024 BabyCare - Cuidando com amor 💙</p>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="/privacidade" className="flex items-center gap-2 hover:text-blue-400 transition-all duration-300 hover:scale-105 font-medium">
                <Shield size={16} className="sm:w-[18px] sm:h-[18px]" />
                Privacidade
              </Link>
              <Link href="/feedback" className="hover:text-purple-400 transition-all duration-300 hover:scale-105 font-medium">
                Contato
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
