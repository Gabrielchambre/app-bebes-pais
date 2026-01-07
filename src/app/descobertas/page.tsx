'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, BookOpen, Plus, Heart, Star, Calendar, Trash2, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Discovery {
  id: number
  title: string
  description: string
  date: string
  category: string
  image_url?: string
  created_at?: string
}

export default function DescobertasPage() {
  const [discoveries, setDiscoveries] = useState<Discovery[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newDiscovery, setNewDiscovery] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Marco',
    rating: 5
  })
  const [selectedCategory, setSelectedCategory] = useState<string>('todas')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    loadDiscoveries()
  }, [])

  const loadDiscoveries = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('discoveries')
        .select('*')
        .order('date', { ascending: false })

      if (error) {
        console.error('Erro ao carregar descobertas:', error)
        return
      }
      
      setDiscoveries(data || [])
    } catch (error) {
      console.error('Erro ao carregar descobertas:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addDiscovery = async () => {
    // Limpar mensagens anteriores
    setErrorMessage('')
    setSuccessMessage('')

    // Validação
    if (!newDiscovery.title.trim()) {
      setErrorMessage('Por favor, preencha o título da descoberta')
      return
    }

    if (!newDiscovery.description.trim()) {
      setErrorMessage('Por favor, preencha a descrição da descoberta')
      return
    }

    try {
      setIsSaving(true)
      
      // Preparar dados para inserção (sem user_id)
      const insertData = {
        title: newDiscovery.title.trim(),
        description: newDiscovery.description.trim(),
        date: newDiscovery.date,
        category: newDiscovery.category,
        image_url: null
      }

      const { data, error } = await supabase
        .from('discoveries')
        .insert([insertData])
        .select()

      if (error) {
        console.error('Erro ao adicionar descoberta:', error)
        
        // Mensagem de erro mais amigável
        if (error.message.includes('row-level security')) {
          setErrorMessage('Erro de permissão: Configure as políticas RLS no Supabase Dashboard. Vá em Authentication > Policies da tabela "discoveries" e adicione uma política que permita INSERT para usuários anônimos ou autenticados.')
        } else {
          setErrorMessage(`Erro ao salvar: ${error.message}`)
        }
        return
      }

      if (data && data.length > 0) {
        setDiscoveries([data[0], ...discoveries])
        setSuccessMessage('Descoberta registrada com sucesso!')
        
        // Resetar formulário
        setNewDiscovery({
          title: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
          category: 'Marco',
          rating: 5
        })

        // Fechar modal após 1.5 segundos
        setTimeout(() => {
          setShowAddModal(false)
          setSuccessMessage('')
        }, 1500)
      }
    } catch (error) {
      console.error('Erro ao adicionar descoberta:', error)
      setErrorMessage('Erro inesperado ao salvar. Tente novamente.')
    } finally {
      setIsSaving(false)
    }
  }

  const deleteDiscovery = async (id: number) => {
    try {
      const { error } = await supabase
        .from('discoveries')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Erro ao deletar descoberta:', error)
        return
      }

      setDiscoveries(discoveries.filter(d => d.id !== id))
    } catch (error) {
      console.error('Erro ao deletar descoberta:', error)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Marco': return 'from-blue-500 to-cyan-600'
      case 'Habilidade': return 'from-purple-500 to-pink-600'
      case 'Social': return 'from-green-500 to-emerald-600'
      case 'Linguagem': return 'from-orange-500 to-red-600'
      default: return 'from-gray-500 to-slate-600'
    }
  }

  const filteredDiscoveries = selectedCategory === 'todas' 
    ? discoveries 
    : discoveries.filter(d => d.category === selectedCategory)

  const categories = [
    { id: 'todas', name: 'Todas' },
    { id: 'Marco', name: 'Marcos' },
    { id: 'Habilidade', name: 'Habilidades' },
    { id: 'Social', name: 'Social' },
    { id: 'Linguagem', name: 'Linguagem' }
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2">
            <ArrowLeft size={20} />
            Voltar ao Dashboard
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-700">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Diário de Descobertas</h1>
                <p className="text-gray-400 mt-1">Registre momentos especiais do bebê</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
            >
              <Plus size={20} />
              Nova Descoberta
            </button>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Carregando descobertas...</p>
            </div>
          )}

          {/* Grid de Descobertas */}
          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDiscoveries.map(discovery => (
                <div
                  key={discovery.id}
                  className="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:shadow-lg hover:border-pink-500 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(discovery.category)} rounded-lg flex items-center justify-center shadow-md`}>
                      <Heart className="text-white" size={20} />
                    </div>
                    <button
                      onClick={() => deleteDiscovery(discovery.id)}
                      className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Excluir"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{discovery.title}</h3>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-3">{discovery.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(discovery.date).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="px-2 py-1 bg-pink-900/30 text-pink-400 rounded-full">
                      {discovery.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && filteredDiscoveries.length === 0 && (
            <div className="text-center py-12">
              <BookOpen size={64} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400">Nenhuma descoberta registrada ainda</p>
              <p className="text-sm text-gray-500 mt-2">Comece registrando os primeiros marcos do seu bebê!</p>
            </div>
          )}
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 text-center border border-gray-700">
            <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {discoveries.length}
            </div>
            <p className="text-gray-400 text-sm">Descobertas Registradas</p>
          </div>
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 text-center border border-gray-700">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              {discoveries.filter(d => d.category === 'Marco').length}
            </div>
            <p className="text-gray-400 text-sm">Marcos Importantes</p>
          </div>
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 text-center border border-gray-700">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {discoveries.filter(d => d.category === 'Habilidade').length}
            </div>
            <p className="text-gray-400 text-sm">Novas Habilidades</p>
          </div>
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 text-center border border-gray-700">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              {discoveries.filter(d => d.category === 'Social').length}
            </div>
            <p className="text-gray-400 text-sm">Interações Sociais</p>
          </div>
        </div>
      </div>

      {/* Modal Nova Descoberta */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Nova Descoberta</h2>
            
            {/* Mensagens de erro/sucesso */}
            {errorMessage && (
              <div className="mb-4 p-4 bg-red-900/30 border border-red-500 rounded-xl flex items-start gap-3">
                <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-red-300 text-sm">{errorMessage}</p>
              </div>
            )}
            
            {successMessage && (
              <div className="mb-4 p-4 bg-green-900/30 border border-green-500 rounded-xl flex items-start gap-3">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-green-300 text-sm">{successMessage}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Título *</label>
                <input
                  type="text"
                  value={newDiscovery.title}
                  onChange={(e) => setNewDiscovery({ ...newDiscovery, title: e.target.value })}
                  placeholder="Ex: Primeiro sorriso, Primeiras palavras..."
                  className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  disabled={isSaving}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Data</label>
                <input
                  type="date"
                  value={newDiscovery.date}
                  onChange={(e) => setNewDiscovery({ ...newDiscovery, date: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  disabled={isSaving}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Categoria</label>
                <select
                  value={newDiscovery.category}
                  onChange={(e) => setNewDiscovery({ ...newDiscovery, category: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  disabled={isSaving}
                >
                  <option value="Marco">Marco Importante</option>
                  <option value="Habilidade">Nova Habilidade</option>
                  <option value="Social">Interação Social</option>
                  <option value="Linguagem">Desenvolvimento da Linguagem</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Descrição *</label>
                <textarea
                  value={newDiscovery.description}
                  onChange={(e) => setNewDiscovery({ ...newDiscovery, description: e.target.value })}
                  placeholder="Descreva o que aconteceu..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                  disabled={isSaving}
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                  disabled={isSaving}
                >
                  Cancelar
                </button>
                <button
                  onClick={addDiscovery}
                  disabled={isSaving}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      Salvando...
                    </>
                  ) : (
                    'Registrar'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
