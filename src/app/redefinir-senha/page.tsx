'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Baby, Lock, CheckCircle, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import { supabase } from '@/lib/supabase'

export default function RedefinirSenhaPage() {
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [validatingToken, setValidatingToken] = useState(true)
  const [hasValidToken, setHasValidToken] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Verificar e processar o token de recuperação da URL
    const checkRecoveryToken = async () => {
      try {
        // Verificar se há um hash de recuperação de senha na URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const type = hashParams.get('type')
        
        if (type === 'recovery' && accessToken) {
          // Token válido encontrado na URL
          setHasValidToken(true)
          
          // O Supabase já processa o token automaticamente via middleware
          // Verificar se a sessão foi estabelecida
          const { data: { session } } = await supabase.auth.getSession()
          
          if (!session) {
            // Se não há sessão, tentar estabelecer com o token
            const { error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: hashParams.get('refresh_token') || ''
            })
            
            if (sessionError) {
              throw new Error('Token inválido ou expirado')
            }
          }
        } else {
          // Verificar se já existe uma sessão de recuperação ativa
          const { data: { session } } = await supabase.auth.getSession()
          
          if (session) {
            setHasValidToken(true)
          } else {
            setError('Link inválido ou expirado. Solicite um novo link de recuperação.')
            setHasValidToken(false)
          }
        }
      } catch (err: any) {
        console.error('Erro ao validar token:', err)
        setError(err.message || 'Link inválido ou expirado. Solicite um novo link de recuperação.')
        setHasValidToken(false)
      } finally {
        setValidatingToken(false)
      }
    }

    checkRecoveryToken()

    // Listener para mudanças no estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setHasValidToken(true)
        setValidatingToken(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleRedefinirSenha = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    // Validações
    if (novaSenha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      setLoading(false)
      return
    }

    if (novaSenha !== confirmarSenha) {
      setError('As senhas não coincidem.')
      setLoading(false)
      return
    }

    try {
      // Verificar se Supabase está configurado
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error('Supabase não está configurado. Configure as variáveis de ambiente.')
      }

      // Atualizar senha no Supabase
      const { error: updateError } = await supabase.auth.updateUser({
        password: novaSenha
      })

      if (updateError) throw updateError

      setSuccess(true)
      
      // Fazer logout para limpar a sessão de recuperação
      await supabase.auth.signOut()
      
      // Redirecionar para login após 3 segundos
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (err: any) {
      console.error('Erro ao redefinir senha:', err)
      setError(err.message || 'Erro ao redefinir senha. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center p-4 relative">
      {/* Botão de tema no canto superior direito */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Container principal */}
      <div className="w-full max-w-md">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <Baby className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            BabyCare
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Redefinir senha
          </p>
        </div>

        {/* Card de Redefinição */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          {validatingToken ? (
            // Estado de carregamento/validação
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">
                Validando link de recuperação...
              </p>
            </div>
          ) : !hasValidToken ? (
            // Token inválido ou expirado
            <div>
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <AlertCircle className="text-red-600 dark:text-red-400" size={32} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                Link inválido
              </h2>
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 rounded-xl text-sm">
                {error || 'Este link de recuperação é inválido ou já expirou. Por favor, solicite um novo link.'}
              </div>
              <div className="space-y-3">
                <Link
                  href="/recuperar-senha"
                  className="block w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-center hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Solicitar novo link
                </Link>
                <Link
                  href="/login"
                  className="block w-full py-3 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-center transition-colors"
                >
                  Voltar para o login
                </Link>
              </div>
            </div>
          ) : (
            // Formulário de redefinição (token válido)
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                Criar nova senha
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                Digite sua nova senha abaixo.
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 rounded-xl text-sm flex items-start gap-3">
                  <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Senha redefinida com sucesso!</p>
                    <p>Você será redirecionado para o login em instantes...</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleRedefinirSenha} className="space-y-5">
                {/* Nova Senha */}
                <div>
                  <label htmlFor="novaSenha" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nova senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="novaSenha"
                      type="password"
                      value={novaSenha}
                      onChange={(e) => setNovaSenha(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Mínimo de 6 caracteres
                  </p>
                </div>

                {/* Confirmar Senha */}
                <div>
                  <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirmar nova senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="confirmarSenha"
                      type="password"
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Botão Redefinir */}
                <button
                  type="submit"
                  disabled={loading || success}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Redefinindo...' : success ? 'Senha redefinida!' : 'Redefinir senha'}
                </button>
              </form>

              {/* Link para voltar ao login */}
              {!success && (
                <div className="mt-6 text-center">
                  <Link
                    href="/login"
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
                  >
                    Voltar para o login
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8">
          © 2024 BabyCare - Cuidando com amor 💙
        </p>
      </div>
    </div>
  )
}
