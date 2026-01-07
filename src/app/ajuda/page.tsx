'use client'

import { ArrowLeft, BookOpen, Video, MessageCircle, Search, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const tutorials = [
  {
    id: 1,
    title: 'Como começar a usar o BabyCare',
    description: 'Aprenda os primeiros passos para configurar seu perfil e começar a registrar as atividades do seu bebê',
    duration: '5 min',
    category: 'Iniciante',
  },
  {
    id: 2,
    title: 'Registrando horários de sono',
    description: 'Tutorial completo sobre como usar o cronômetro e registrar padrões de sono do bebê',
    duration: '3 min',
    category: 'Sono',
  },
  {
    id: 3,
    title: 'Rastreando alimentação e alergias',
    description: 'Como monitorar a introdução alimentar e identificar possíveis reações alérgicas',
    duration: '4 min',
    category: 'Alimentação',
  },
  {
    id: 4,
    title: 'Configurando notificações',
    description: 'Aprenda a configurar lembretes para não esquecer horários importantes',
    duration: '2 min',
    category: 'Configurações',
  },
  {
    id: 5,
    title: 'Compartilhando rotinas com cuidadores',
    description: 'Como compartilhar informações e rotinas com babás e outros cuidadores',
    duration: '3 min',
    category: 'Rotina',
  },
]

const faqs = [
  {
    question: 'Como faço para criar uma conta?',
    answer: 'Clique no botão "Entrar" no canto superior direito e depois em "Criar conta". Preencha seus dados e pronto!',
  },
  {
    question: 'Meus dados estão seguros?',
    answer: 'Sim! Todos os dados são criptografados e armazenados com segurança. Consulte nossa Política de Privacidade para mais detalhes.',
  },
  {
    question: 'Como configurar notificações?',
    answer: 'Acesse as configurações do app e ative as notificações para os eventos que deseja ser lembrado.',
  },
  {
    question: 'Posso usar o app offline?',
    answer: 'Algumas funcionalidades básicas funcionam offline, mas para sincronizar dados você precisará de conexão com a internet.',
  },
  {
    question: 'Como compartilhar informações com outros cuidadores?',
    answer: 'Na seção "Rotina e Painel", você pode gerar um link de compartilhamento ou adicionar outros usuários como cuidadores.',
  },
]

export default function AjudaPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTutorials = tutorials.filter(
    (tutorial) =>
      tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft size={20} />
          Voltar
        </Link>

        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-xl">
            <BookOpen className="text-white" size={36} />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Central de Ajuda
          </h1>
          <p className="text-xl text-gray-600">
            Tutoriais, guias e respostas para suas dúvidas
          </p>
        </header>

        {/* Barra de pesquisa */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar tutoriais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm font-medium shadow-md"
            />
          </div>
        </div>

        {/* Tutoriais em vídeo */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Video className="text-white" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Tutoriais em Vídeo
            </h2>
          </div>

          <div className="grid gap-4">
            {filteredTutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 border border-white/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-4 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 text-xs font-bold rounded-full">
                        {tutorial.category}
                      </span>
                      <span className="text-sm text-gray-500 font-semibold flex items-center gap-1">
                        <Sparkles size={14} />
                        {tutorial.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {tutorial.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {tutorial.description}
                    </p>
                  </div>
                  <Video className="text-purple-400 ml-4" size={28} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Perguntas Frequentes */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
              <MessageCircle className="text-white" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 group hover:shadow-xl transition-all duration-300 border border-white/50"
              >
                <summary className="font-bold text-gray-800 cursor-pointer list-none flex items-center justify-between text-lg">
                  {faq.question}
                  <span className="text-purple-600 group-open:rotate-180 transition-transform duration-300">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Contato */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 text-center border border-white/50">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ainda precisa de ajuda?
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            Nossa equipe está pronta para ajudar você
          </p>
          <Link
            href="/feedback"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <MessageCircle size={22} />
            Enviar mensagem
          </Link>
        </section>
      </div>
    </div>
  )
}
