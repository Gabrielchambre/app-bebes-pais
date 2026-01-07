'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Baby, Save, Edit } from 'lucide-react'
import Link from 'next/link'

interface BabyProfile {
  name: string
  birthDate: string
  weight: string
  height: string
  preferences: string
}

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<BabyProfile>({
    name: '',
    birthDate: '',
    weight: '',
    height: '',
    preferences: ''
  })

  useEffect(() => {
    const savedProfile = localStorage.getItem('baby_profile')
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    } else {
      setIsEditing(true)
    }
  }, [])

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return 'Não informado'
    const birth = new Date(birthDate)
    const today = new Date()
    const months = (today.getFullYear() - birth.getFullYear()) * 12 + today.getMonth() - birth.getMonth()
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    
    if (years > 0) {
      return `${years} ano${years > 1 ? 's' : ''} e ${remainingMonths} mês${remainingMonths !== 1 ? 'es' : ''}`
    }
    return `${months} mês${months !== 1 ? 'es' : ''}`
  }

  const handleSave = () => {
    localStorage.setItem('baby_profile', JSON.stringify(profile))
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
            <ArrowLeft size={20} />
            Voltar
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Baby className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Perfil do Bebê</h1>
                <p className="text-gray-600 mt-1">Informações e preferências</p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
              >
                <Edit size={20} />
                Editar
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome do Bebê
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Ex: Maria Silva"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  value={profile.birthDate}
                  onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Peso (kg)
                  </label>
                  <input
                    type="text"
                    value={profile.weight}
                    onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                    placeholder="Ex: 3.5"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Altura (cm)
                  </label>
                  <input
                    type="text"
                    value={profile.height}
                    onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                    placeholder="Ex: 50"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferências do Bebê
                </label>
                <textarea
                  value={profile.preferences}
                  onChange={(e) => setProfile({ ...profile, preferences: e.target.value })}
                  placeholder="Ex: Gosta de música clássica, prefere dormir de lado, adora brinquedos coloridos..."
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-bold text-lg"
              >
                <Save size={24} />
                Salvar Perfil
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Nome</h3>
                <p className="text-2xl font-bold text-gray-800">{profile.name || 'Não informado'}</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-200">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Idade</h3>
                <p className="text-2xl font-bold text-gray-800">{calculateAge(profile.birthDate)}</p>
                {profile.birthDate && (
                  <p className="text-sm text-gray-600 mt-1">
                    Nascimento: {profile.birthDate.split('-').reverse().join('/')}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Peso</h3>
                  <p className="text-2xl font-bold text-gray-800">{profile.weight ? `${profile.weight} kg` : 'Não informado'}</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Altura</h3>
                  <p className="text-2xl font-bold text-gray-800">{profile.height ? `${profile.height} cm` : 'Não informado'}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">Preferências</h3>
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {profile.preferences || 'Nenhuma preferência registrada ainda.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
