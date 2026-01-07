'use client'

import { ArrowLeft, Utensils, AlertTriangle, ChefHat, Calendar, Plus, Check, X, Clock, Bell, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const recipes = [
  {
    id: '1',
    name: 'Papa de Banana',
    age: '4-6 meses',
    ingredients: ['1 banana madura'],
    instructions: ['Amasse bem a banana', 'Sirva morna ou em temperatura ambiente'],
    category: 'frutas'
  },
  {
    id: '2',
    name: 'Papa de Abóbora',
    age: '4-6 meses',
    ingredients: ['100g de abóbora', 'Água'],
    instructions: ['Cozinhe a abóbora até ficar macia', 'Amasse bem', 'Adicione um pouco de água se necessário'],
    category: 'vegetais'
  },
  {
    id: '3',
    name: 'Papa de Batata Doce com Frango',
    age: '6-8 meses',
    ingredients: ['1 batata doce pequena', '50g de frango desfiado', '1 fio de azeite'],
    instructions: ['Cozinhe a batata doce e o frango', 'Amasse tudo junto', 'Adicione um fio de azeite'],
    category: 'proteinas'
  },
  {
    id: '4',
    name: 'Purê de Cenoura com Carne',
    age: '6-8 meses',
    ingredients: ['2 cenouras', '50g de carne moída', 'Água'],
    instructions: ['Cozinhe a cenoura e a carne', 'Amasse bem', 'Adicione água para ajustar consistência'],
    category: 'proteinas'
  },
  {
    id: '5',
    name: 'Papa de Maçã com Aveia',
    age: '6-8 meses',
    ingredients: ['1 maçã', '2 colheres de aveia', 'Água'],
    instructions: ['Cozinhe a maçã até ficar macia', 'Adicione a aveia', 'Amasse tudo junto'],
    category: 'cereais'
  },
  {
    id: '6',
    name: 'Risoto de Legumes',
    age: '8-12 meses',
    ingredients: ['2 colheres de arroz', 'Cenoura picada', 'Abobrinha picada', 'Caldo de legumes'],
    instructions: ['Refogue os legumes', 'Adicione o arroz e o caldo', 'Cozinhe até ficar cremoso'],
    category: 'refeicoes'
  },
  {
    id: '7',
    name: 'Omelete de Legumes',
    age: '8-12 meses',
    ingredients: ['1 ovo', 'Tomate picado', 'Espinafre picado', 'Queijo ralado'],
    instructions: ['Bata o ovo', 'Adicione os legumes', 'Cozinhe em fogo baixo'],
    category: 'proteinas'
  },
  {
    id: '8',
    name: 'Panqueca de Banana',
    age: '8-12 meses',
    ingredients: ['1 banana', '1 ovo', '2 colheres de aveia'],
    instructions: ['Amasse a banana', 'Misture com ovo e aveia', 'Cozinhe em frigideira antiaderente'],
    category: 'lanches'
  }
]

interface MealSchedule {
  id: string
  time: string
  meal: string
  enabled: boolean
}

export default function AlimentacaoPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todas')
  const [selectedRecipe, setSelectedRecipe] = useState<typeof recipes[0] | null>(null)
  const [schedules, setSchedules] = useState<MealSchedule[]>([])
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [newSchedule, setNewSchedule] = useState({ time: '', meal: '' })
  const [mounted, setMounted] = useState(false)

  // Carregar agendamentos do localStorage
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('baby_meal_schedules')
    if (saved) {
      try {
        setSchedules(JSON.parse(saved))
      } catch (error) {
        console.error('Erro ao carregar agendamentos:', error)
        // Inicializar com agendamentos padrão
        const defaultSchedules = [
          { id: '1', time: '07:00', meal: 'Café da Manhã', enabled: true },
          { id: '2', time: '12:00', meal: 'Almoço', enabled: true },
          { id: '3', time: '16:00', meal: 'Lanche da Tarde', enabled: true },
          { id: '4', time: '19:00', meal: 'Jantar', enabled: true }
        ]
        setSchedules(defaultSchedules)
        localStorage.setItem('baby_meal_schedules', JSON.stringify(defaultSchedules))
      }
    } else {
      // Inicializar com agendamentos padrão
      const defaultSchedules = [
        { id: '1', time: '07:00', meal: 'Café da Manhã', enabled: true },
        { id: '2', time: '12:00', meal: 'Almoço', enabled: true },
        { id: '3', time: '16:00', meal: 'Lanche da Tarde', enabled: true },
        { id: '4', time: '19:00', meal: 'Jantar', enabled: true }
      ]
      setSchedules(defaultSchedules)
      localStorage.setItem('baby_meal_schedules', JSON.stringify(defaultSchedules))
    }
  }, [])

  // Salvar agendamentos no localStorage sempre que mudarem
  useEffect(() => {
    if (mounted && schedules.length > 0) {
      localStorage.setItem('baby_meal_schedules', JSON.stringify(schedules))
    }
  }, [schedules, mounted])

  const categories = [
    { id: 'todas', name: 'Todas' },
    { id: 'frutas', name: 'Frutas' },
    { id: 'vegetais', name: 'Vegetais' },
    { id: 'proteinas', name: 'Proteínas' },
    { id: 'cereais', name: 'Cereais' },
    { id: 'refeicoes', name: 'Refeições' },
    { id: 'lanches', name: 'Lanches' }
  ]

  const filteredRecipes = selectedCategory === 'todas' 
    ? recipes 
    : recipes.filter(r => r.category === selectedCategory)

  const addSchedule = () => {
    if (newSchedule.time && newSchedule.meal) {
      const schedule: MealSchedule = {
        id: Date.now().toString(),
        time: newSchedule.time,
        meal: newSchedule.meal,
        enabled: true
      }
      const updatedSchedules = [...schedules, schedule]
      setSchedules(updatedSchedules)
      setNewSchedule({ time: '', meal: '' })
      setShowScheduleModal(false)
    }
  }

  const toggleSchedule = (id: string) => {
    const updatedSchedules = schedules.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    )
    setSchedules(updatedSchedules)
  }

  const removeSchedule = (id: string) => {
    const updatedSchedules = schedules.filter(s => s.id !== id)
    setSchedules(updatedSchedules)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2">
            <ArrowLeft size={20} />
            Voltar
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <Utensils className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Introdução Alimentar</h1>
              <p className="text-gray-600 mt-1">Receitas saudáveis para bebês e crianças</p>
            </div>
          </div>

          {/* Agendamento de Refeições */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Calendar className="text-emerald-600" size={20} />
                Agendamento de Refeições
              </h2>
              <button
                onClick={() => setShowScheduleModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
              >
                <Plus size={16} />
                Adicionar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schedules.map(schedule => (
                <div
                  key={schedule.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
                      <Clock className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{schedule.time} - {schedule.meal}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Bell size={12} />
                        {schedule.enabled ? 'Notificação ativa' : 'Notificação desativada'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSchedule(schedule.id)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        schedule.enabled ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        schedule.enabled ? 'translate-x-6' : ''
                      }`} />
                    </button>
                    <button
                      onClick={() => removeSchedule(schedule.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filtros de Categoria */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grid de Receitas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map(recipe => (
              <div
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className="bg-gradient-to-br from-white to-emerald-50 rounded-xl p-6 border border-emerald-200 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
                    <ChefHat className="text-white" size={20} />
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                    {recipe.age}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{recipe.name}</h3>
                <p className="text-sm text-gray-600">
                  {recipe.ingredients.length} ingredientes • {recipe.instructions.length} passos
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dicas de Introdução Alimentar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Dicas Importantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-2">Quando Começar</h3>
              <p className="text-sm text-blue-700">A partir dos 6 meses, quando o bebê consegue sentar com apoio.</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <h3 className="font-bold text-purple-800 mb-2">Introdução Gradual</h3>
              <p className="text-sm text-purple-700">Introduza um alimento novo por vez, aguardando 3 dias.</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <h3 className="font-bold text-green-800 mb-2">Variedade</h3>
              <p className="text-sm text-green-700">Ofereça diferentes cores, texturas e sabores.</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
              <h3 className="font-bold text-orange-800 mb-2">Sem Sal e Açúcar</h3>
              <p className="text-sm text-orange-700">Não adicione sal ou açúcar até 1 ano de idade.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Receita */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedRecipe.name}</h2>
                <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                  {selectedRecipe.age}
                </span>
              </div>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Ingredientes</h3>
                <ul className="space-y-2">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <Check size={16} className="text-emerald-600" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Modo de Preparo</h3>
                <ol className="space-y-3">
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3 text-gray-700">
                      <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Agendamento */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Novo Agendamento</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Horário</label>
                <input
                  type="time"
                  value={newSchedule.time}
                  onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Refeição</label>
                <input
                  type="text"
                  value={newSchedule.meal}
                  onChange={(e) => setNewSchedule({ ...newSchedule, meal: e.target.value })}
                  placeholder="Ex: Café da Manhã, Almoço..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={addSchedule}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Agendar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
