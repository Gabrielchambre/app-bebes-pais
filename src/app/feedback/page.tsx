'use client'

import { ArrowLeft, MessageSquare, Star, Send, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

export default function FeedbackPage() {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [category, setCategory] = useState('sugestao')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulação de envio (em produção, enviar para backend)
    console.log({ rating, feedback, category })
    
    toast.success('Feedback enviado com sucesso! Obrigado pela sua contribuição.')
    
    // Limpar formulário
    setRating(0)
    setFeedback('')
    setCategory('sugestao')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft size={20} />
          Voltar
        </Link>

        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-xl">
            <MessageSquare className="text-white" size={36} />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Feedback e Sugestões
          </h1>
          <p className="text-xl text-gray-600">
            Sua opinião é muito importante para nós!
          </p>
        </header>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avaliação */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4 text-center">
                Como você avalia o BabyCare?
              </label>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-all duration-300 hover:scale-125"
                  >
                    <Star
                      size={44}
                      className={
                        star <= rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 hover:text-yellow-200'
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Tipo de feedback
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm font-medium shadow-md"
              >
                <option value="sugestao">Sugestão de melhoria</option>
                <option value="bug">Reportar problema</option>
                <option value="elogio">Elogio</option>
                <option value="duvida">Dúvida</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            {/* Mensagem */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Sua mensagem
              </label>
              <textarea
                required
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={6}
                placeholder="Conte-nos o que você pensa sobre o BabyCare. Suas sugestões nos ajudam a melhorar!"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-300 bg-white/50 backdrop-blur-sm font-medium shadow-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Send size={22} />
              Enviar Feedback
            </button>
          </form>

          <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <p className="text-sm text-gray-700 text-center font-medium flex items-center justify-center gap-2">
              <Sparkles size={16} className="text-purple-600" />
              Dica: Seja específico em suas sugestões para que possamos implementar melhorias mais precisas!
            </p>
          </div>
        </div>

        {/* Estatísticas de feedback */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-5 text-center border border-white/50 hover:shadow-lg transition-all duration-300">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">1.2k</div>
            <div className="text-sm text-gray-600 font-semibold">Feedbacks recebidos</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-5 text-center border border-white/50 hover:shadow-lg transition-all duration-300">
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">87%</div>
            <div className="text-sm text-gray-600 font-semibold">Implementados</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-5 text-center border border-white/50 hover:shadow-lg transition-all duration-300">
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-1">4.8</div>
            <div className="text-sm text-gray-600 font-semibold">Avaliação média</div>
          </div>
        </div>
      </div>
    </div>
  )
}
