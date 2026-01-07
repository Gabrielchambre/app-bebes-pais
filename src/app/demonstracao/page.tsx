'use client'

import Link from 'next/link'
import { ArrowLeft, Baby, Clock, Calendar, Bell, Heart, Utensils, Moon } from 'lucide-react'

export default function DemonstracaoPage() {
  const checkoutUrl = 'https://checkout.keoto.com/f090b6db-5628-4c90-9af9-200ae12a891b'

  const features = [
    {
      icon: Calendar,
      title: 'Agenda Completa',
      description: 'Visualize todos os horários de mamadas, trocas e banhos em um só lugar',
      image: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=600&fit=crop'
    },
    {
      icon: Bell,
      title: 'Notificações Inteligentes',
      description: 'Receba lembretes automáticos para nunca perder nenhum horário importante',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=600&fit=crop'
    },
    {
      icon: Utensils,
      title: 'Controle de Alimentação',
      description: 'Registre mamadas, quantidade de leite e introdução alimentar',
      image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=600&fit=crop'
    },
    {
      icon: Moon,
      title: 'Rotina de Sono',
      description: 'Acompanhe os horários de sono e crie uma rotina saudável',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop'
    },
    {
      icon: Heart,
      title: 'Saúde e Bem-estar',
      description: 'Monitore peso, altura e marcos de desenvolvimento do bebê',
      image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=600&fit=crop'
    },
    {
      icon: Clock,
      title: 'Histórico Completo',
      description: 'Acesse todo o histórico de cuidados e compartilhe com pediatra',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&h=600&fit=crop'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950">
      {/* Header */}
      <nav className="border-b border-purple-900/20 backdrop-blur-xl bg-gray-950/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Baby className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                BabyCare
              </h1>
            </div>
            <Link
              href="/vendas"
              className="flex items-center gap-2 px-4 py-2 text-purple-300 hover:text-purple-200 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Voltar</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Conheça o{' '}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              BabyCare
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Veja como nosso app vai transformar a rotina do seu bebê em momentos de tranquilidade e organização
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-gray-900/50 to-purple-900/20 border border-purple-500/20 rounded-3xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 backdrop-blur-sm hover:scale-[1.02]"
                >
                  {/* Imagem */}
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-4 left-4 w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/30">
                      <Icon className="text-white" size={28} />
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Interface Preview */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Interface Simples e Intuitiva
            </h2>
            <p className="text-xl text-gray-300 text-center mb-10 leading-relaxed">
              Desenvolvido pensando em você: fácil de usar, bonito e eficiente
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Dashboard',
                  description: 'Visão geral de todas as atividades do dia',
                  color: 'from-pink-500 to-rose-500'
                },
                {
                  title: 'Calendário',
                  description: 'Planeje e organize toda a semana',
                  color: 'from-purple-500 to-indigo-500'
                },
                {
                  title: 'Relatórios',
                  description: 'Acompanhe o desenvolvimento do bebê',
                  color: 'from-pink-500 to-purple-500'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} mb-4 shadow-lg`} />
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-pink-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl shadow-purple-500/30">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Pronto para transformar sua rotina?
            </h2>
            <p className="text-xl text-purple-100 mb-10 leading-relaxed">
              Junte-se a milhares de pais que já estão aproveitando mais tempo com seus bebês
            </p>
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 bg-white text-purple-600 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-xl"
            >
              Começar Agora
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-900/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400">
            <p className="font-medium">© 2024 BabyCare - Cuidando com amor 💙</p>
            <Link href="/vendas" className="hover:text-pink-400 transition-colors">
              Voltar para página inicial
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
