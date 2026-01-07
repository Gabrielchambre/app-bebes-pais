'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Baby, Mail, Lock, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Verificar se Supabase está configurado
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error('Supabase não está configurado. Configure as variáveis de ambiente.')
      }

      // Fazer login no Supabase Auth
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      if (data.session && data.user) {
        // Salvar dados do usuário no localStorage
        localStorage.setItem('babycare_user', JSON.stringify({
          email: data.user.email,
          id: data.user.id,
          nome: data.user.user_metadata?.nome || data.user.email?.split('@')[0]
        }))
        
        // Redirecionar para dashboard
        router.push('/dashboard')
        router.refresh()
      } else {
        throw new Error('Erro ao criar sessão. Tente novamente.')
      }
    } catch (err: any) {
      console.error('Erro no login:', err)
      setError(err.message || 'Email ou senha incorretos. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center p-4 relative">
      {/* Botão de tema no canto superior direito */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Container principal com duas colunas */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        
        {/* Coluna da Imagem - Oculta em mobile */}
        <div className="hidden lg:block lg:w-1/2">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/3d7df05b-6ef8-4a4e-9c4e-5db417a1bd84.png"
              alt="Mãe e bebê brincando"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Coluna do Formulário */}
        <div className="w-full lg:w-1/2 max-w-md">
          {/* Logo e Título */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <Baby className="text-white" size={40} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              BabyCare
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Seu guia completo para cuidar do bebê
            </p>
          </div>

          {/* Card de Login */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Entrar na sua conta
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 rounded-xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              {/* Senha */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              {/* Link Esqueci a senha */}
              <div className="text-right">
                <Link href="/recuperar-senha" className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
                  Esqueceu a senha?
                </Link>
              </div>

              {/* Botão Entrar */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Entrando...' : 'Entrar'}
                {!loading && <ArrowRight size={20} />}
              </button>
            </form>

            {/* Divisor */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">ou</span>
              </div>
            </div>

            {/* Link para criar conta */}
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Ainda não tem uma conta?
              </p>
              <Link
                href="/cadastro"
                className="inline-block w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
              >
                Criar conta
              </Link>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8">
            © 2024 BabyCare - Cuidando com amor 💙
          </p>
        </div>
      </div>
    </div>
  )
}
