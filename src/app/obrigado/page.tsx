'use client'

import Link from 'next/link'
import { CheckCircle, Sparkles, ArrowRight, Baby } from 'lucide-react'

export default function ObrigadoPage() {
  const CHECKOUT_URL = 'https://checkout.keoto.com/f090b6db-5628-4c90-9af9-200ae12a891b'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Card Principal */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 text-center">
          {/* Ícone de Sucesso */}
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
            <CheckCircle className="text-white" size={48} />
          </div>

          {/* Título */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            🎉 Parabéns!
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Seu pagamento foi confirmado!
          </h2>

          {/* Mensagem */}
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Bem-vindo ao <span className="font-bold text-purple-600">BabyCare Premium</span>! 
            Agora você tem acesso completo a todas as funcionalidades do aplicativo.
          </p>

          {/* Badge de Assinatura Ativa */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-lg mb-10">
            <Sparkles size={20} />
            <span className="font-semibold">Assinatura Ativa</span>
          </div>

          {/* Botão Principal - CORRIGIDO PARA IR PARA DASHBOARD */}
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-xl mb-6"
          >
            <Baby size={24} />
            Acessar a Plataforma
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
          </Link>

          {/* Informações Adicionais */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              O que você pode fazer agora:
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                <p className="text-sm font-semibold text-gray-800 mb-1">📱 Explorar</p>
                <p className="text-xs text-gray-600">Todas as 12 funcionalidades disponíveis</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                <p className="text-sm font-semibold text-gray-800 mb-1">💜 Organizar</p>
                <p className="text-xs text-gray-600">Rotina completa do seu bebê</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                <p className="text-sm font-semibold text-gray-800 mb-1">🎯 Aproveitar</p>
                <p className="text-xs text-gray-600">Suporte 24/7 sempre disponível</p>
              </div>
            </div>
          </div>

          {/* Botão Secundário - Caso não tenha pago ainda */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">
              Ainda não completou o pagamento?
            </p>
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium text-sm"
            >
              Voltar para o Checkout
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          © 2024 BabyCare - Cuidando com amor 💙
        </p>
      </div>
    </div>
  )
}
