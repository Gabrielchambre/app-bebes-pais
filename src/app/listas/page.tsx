'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, ListChecks, Plus, Check, Trash2, ShoppingCart, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface ListItem {
  id: string
  text: string
  completed: boolean
  category: 'compras' | 'tarefas' | 'emergencias'
  shared: boolean
  created_by: string
  list_id: string
}

interface SharedList {
  id: string
  name: string
  category: 'compras' | 'tarefas' | 'emergencias'
  items: ListItem[]
  shared: boolean
  created_by: string
}

export default function ListasPage() {
  const [lists, setLists] = useState<SharedList[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newList, setNewList] = useState({
    name: '',
    category: 'compras' as 'compras' | 'tarefas' | 'emergencias'
  })
  const [selectedList, setSelectedList] = useState<SharedList | null>(null)
  const [newItem, setNewItem] = useState('')

  useEffect(() => {
    loadLists()
  }, [])

  const loadLists = async () => {
    try {
      const { data, error } = await supabase
        .from('shared_lists')
        .select(`
          *,
          items:list_items(*)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setLists(data || [])
    } catch (error) {
      // Fallback para localStorage
      const saved = localStorage.getItem('baby_lists')
      if (saved) {
        setLists(JSON.parse(saved))
      }
    }
  }

  const saveLists = (newLists: SharedList[]) => {
    setLists(newLists)
    localStorage.setItem('baby_lists', JSON.stringify(newLists))
  }

  const addList = async () => {
    if (newList.name) {
      const list: SharedList = {
        id: Date.now().toString(),
        ...newList,
        items: [],
        shared: false,
        created_by: 'user1'
      }

      try {
        const { data, error } = await supabase
          .from('shared_lists')
          .insert([{
            id: list.id,
            name: list.name,
            category: list.category,
            shared: list.shared,
            created_by: list.created_by
          }])
          .select()

        if (error) throw error
        saveLists([data[0], ...lists])
      } catch (error) {
        // Fallback para localStorage
        saveLists([list, ...lists])
      }

      setNewList({ name: '', category: 'compras' })
      setShowAddModal(false)
    }
  }

  const deleteList = async (listId: string) => {
    try {
      // Deletar itens da lista primeiro
      const { error: itemsError } = await supabase
        .from('list_items')
        .delete()
        .eq('list_id', listId)

      if (itemsError) throw itemsError

      // Deletar a lista
      const { error: listError } = await supabase
        .from('shared_lists')
        .delete()
        .eq('id', listId)

      if (listError) throw listError

      const updatedLists = lists.filter(list => list.id !== listId)
      saveLists(updatedLists)
    } catch (error) {
      // Fallback para localStorage
      const updatedLists = lists.filter(list => list.id !== listId)
      saveLists(updatedLists)
    }
  }

  const addItem = async (listId: string) => {
    if (newItem.trim()) {
      const item: ListItem = {
        id: Date.now().toString(),
        text: newItem,
        completed: false,
        category: lists.find(l => l.id === listId)?.category || 'compras',
        shared: true,
        created_by: 'user1',
        list_id: listId
      }

      try {
        const { data, error } = await supabase
          .from('list_items')
          .insert([item])
          .select()

        if (error) throw error
        const updatedLists = lists.map(list => 
          list.id === listId 
            ? { ...list, items: [...list.items, data[0]] }
            : list
        )
        saveLists(updatedLists)
      } catch (error) {
        // Fallback para localStorage
        const updatedLists = lists.map(list => 
          list.id === listId 
            ? { ...list, items: [...list.items, item] }
            : list
        )
        saveLists(updatedLists)
      }

      setNewItem('')
    }
  }

  const toggleItem = async (itemId: string, listId: string) => {
    const list = lists.find(l => l.id === listId)
    const item = list?.items.find(i => i.id === itemId)
    
    if (item) {
      const updatedItem = { ...item, completed: !item.completed }
      
      try {
        const { error } = await supabase
          .from('list_items')
          .update({ completed: updatedItem.completed })
          .eq('id', itemId)

        if (error) throw error
        const updatedLists = lists.map(list => ({
          ...list,
          items: list.items.map(item => 
            item.id === itemId ? updatedItem : item
          )
        }))
        saveLists(updatedLists)
      } catch (error) {
        // Fallback para localStorage
        const updatedLists = lists.map(list => ({
          ...list,
          items: list.items.map(item => 
            item.id === itemId ? updatedItem : item
          )
        }))
        saveLists(updatedLists)
      }
    }
  }

  const deleteItem = async (itemId: string, listId: string) => {
    try {
      const { error } = await supabase
        .from('list_items')
        .delete()
        .eq('id', itemId)

      if (error) throw error
      const updatedLists = lists.map(list => ({
        ...list,
        items: list.items.filter(item => item.id !== itemId)
      }))
      saveLists(updatedLists)
    } catch (error) {
      // Fallback para localStorage
      const updatedLists = lists.map(list => ({
        ...list,
        items: list.items.filter(item => item.id !== itemId)
      }))
      saveLists(updatedLists)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'compras': return <ShoppingCart size={20} />
      case 'tarefas': return <ListChecks size={20} />
      case 'emergencias': return <AlertTriangle size={20} />
      default: return <ListChecks size={20} />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'compras': return 'from-green-500 to-emerald-600'
      case 'tarefas': return 'from-blue-500 to-cyan-600'
      case 'emergencias': return 'from-red-500 to-pink-600'
      default: return 'from-gray-500 to-gray-600'
    }
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <ListChecks className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Lista de Compras</h1>
                <p className="text-gray-600 mt-1">Compras, tarefas e emergências em família</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
            >
              <Plus size={20} />
              Nova Lista
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.map(list => (
              <div
                key={list.id}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${getCategoryColor(list.category)} rounded-lg flex items-center justify-center shadow-md`}>
                      {getCategoryIcon(list.category)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{list.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{list.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteList(list.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Apagar lista"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="space-y-2 mb-4">
                  {list.items.slice(0, 3).map(item => (
                    <div key={item.id} className="flex items-center gap-2">
                      <button
                        onClick={() => toggleItem(item.id, list.id)}
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          item.completed 
                            ? 'bg-emerald-500 border-emerald-500' 
                            : 'border-gray-300 hover:border-emerald-500'
                        }`}
                      >
                        {item.completed && <Check size={12} className="text-white" />}
                      </button>
                      <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                  {list.items.length > 3 && (
                    <p className="text-xs text-gray-500">+{list.items.length - 3} itens</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {list.items.filter(i => i.completed).length}/{list.items.length} concluídos
                  </span>
                  <button
                    onClick={() => setSelectedList(list)}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                  >
                    Ver tudo
                  </button>
                </div>
              </div>
            ))}
          </div>

          {lists.length === 0 && (
            <div className="text-center py-12">
              <ListChecks size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Nenhuma lista criada ainda</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Nova Lista */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nova Lista</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome da Lista</label>
                <input
                  type="text"
                  value={newList.name}
                  onChange={(e) => setNewList({ ...newList, name: e.target.value })}
                  placeholder="Ex: Compras da Semana, Tarefas Domésticas..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Categoria</label>
                <select
                  value={newList.category}
                  onChange={(e) => setNewList({ ...newList, category: e.target.value as any })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="compras">Compras</option>
                  <option value="tarefas">Tarefas</option>
                  <option value="emergencias">Emergências</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={addList}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Criar Lista
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detalhes da Lista */}
      {selectedList && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${getCategoryColor(selectedList.category)} rounded-lg flex items-center justify-center shadow-md`}>
                  {getCategoryIcon(selectedList.category)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedList.name}</h2>
                  <p className="text-gray-600 capitalize">{selectedList.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedList(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Adicionar novo item..."
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && addItem(selectedList.id)}
                />
                <button
                  onClick={() => addItem(selectedList.id)}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="space-y-3">
                {selectedList.items.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <button
                      onClick={() => toggleItem(item.id, selectedList.id)}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        item.completed 
                          ? 'bg-emerald-500 border-emerald-500' 
                          : 'border-gray-300 hover:border-emerald-500'
                      }`}
                    >
                      {item.completed && <Check size={14} className="text-white" />}
                    </button>
                    <span className={`flex-1 ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                      {item.text}
                    </span>
                    <button
                      onClick={() => deleteItem(item.id, selectedList.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
