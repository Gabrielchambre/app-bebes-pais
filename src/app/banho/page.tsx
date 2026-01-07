'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Bath, CheckCircle, Thermometer, Shield, Droplets, Clock, Bell, Users } from 'lucide-react'
import Link from 'next/link'

export default function BanhoPage() {
  const [bathTime, setBathTime] = useState('19:00')
  const [notificationEnabled, setNotificationEnabled] = useState(true)
  const [assignedTo, setAssignedTo] = useState<string[]>(['Mãe'])

  useEffect(() => {
    const saved = localStorage.getItem('baby_bath_settings')
    if (saved) {
      const settings = JSON.parse(saved)
      setBathTime(settings.bathTime || '19:00')
      setNotificationEnabled(settings.notificationEnabled !== false)
      setAssignedTo(settings.assignedTo || ['Mãe'])
    }
  }, [])

  useEffect(() => {
    const settings = {
      bathTime,
      notificationEnabled,
      assignedTo
    }
    localStorage.setItem('baby_bath_settings', JSON.stringify(settings))
    
    // Salvar no formato correto para notificações
    if (notificationEnabled) {
      const schedules = [{
        id: 'bath-schedule',
        time: bathTime,
        activity: 'Hora do Banho',
        enabled: true
      }]
      localStorage.setItem('baby_bath_schedules', JSON.stringify(schedules))
    } else {
      // Se desabilitado, remover ou marcar como disabled
      localStorage.setItem('baby_bath_schedules', JSON.stringify([]))
    }
  }, [bathTime, notificationEnabled, assignedTo])

  const checklist = [
    'Prepare todos os materiais antes de começar',
    'Teste a temperatura da água',
    'Nunca deixe o bebê sozinho na água',
    'Use uma mão para apoiar a cabeça e pescoço',
    'Lave primeiro o rosto e cabelos',
    'Use sabonete suave e enxague bem',
    'Seque imediatamente após o banho',
    'Aplique hidratante se necessário'
  ]

  const people = ['Mãe', 'Pai', 'Babá']

  const togglePerson = (person: string) => {
    if (assignedTo.includes(person)) {
      setAssignedTo(assignedTo.filter(p => p !== person))
    } else {
      setAssignedTo([...assignedTo, person])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/dashboard" className="inline-flex items-center text-cyan-600 hover:text-cyan-800 mb-6 font-medium">
          <ArrowLeft size={20} className="mr-2" />
          Voltar ao início
        </Link>

        <header className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Bath size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Hora do Banho</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Checklist completo de segurança e passo a passo para banhos seguros e prazerosos.
          </p>
        </header>

        {/* Configurações de Horário e Notificação */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-cyan-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Clock className="text-cyan-600" size={24} />
            Configurações do Banho
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Horário */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Clock size={18} className="text-cyan-600" />
                Horário do Banho
              </label>
              <input
                type="time"
                value={bathTime}
                onChange={(e) => setBathTime(e.target.value)}
                className="w-full px-4 py-3 border-2 border-cyan-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg font-semibold text-gray-800"
              />
              <p className="text-sm text-gray-600 mt-3">Defina o melhor horário para o banho do bebê</p>
            </div>

            {/* Notificação */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <Bell size={18} className="text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Notificações</span>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={notificationEnabled}
                    onChange={(e) => setNotificationEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-indigo-600 transition-all duration-300"></div>
                  <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6 shadow-md"></div>
                </div>
              </label>
              <p className="text-sm text-gray-600 mt-3">
                {notificationEnabled 
                  ? `Você receberá um lembrete às ${bathTime}` 
                  : 'Ative para receber lembretes'}
              </p>
            </div>
          </div>

          {/* Responsáveis */}
          <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <label className="block text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Users size={18} className="text-purple-600" />
              Quem dará o banho?
            </label>
            <div className="flex flex-wrap gap-3">
              {people.map(person => (
                <button
                  key={person}
                  onClick={() => togglePerson(person)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    assignedTo.includes(person)
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 border-2 border-gray-300 hover:border-purple-400'
                  }`}
                >
                  {person}
                </button>
              ))}
            </div>
            {assignedTo.length > 0 && (
              <p className="text-sm text-gray-600 mt-3">
                Responsáveis: <span className="font-semibold text-purple-600">{assignedTo.join(', ')}</span>
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <CheckCircle className="mr-2 text-green-600" />
              Checklist de Segurança
            </h2>
            <div className="space-y-3">
              {checklist.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Thermometer className="mr-2 text-red-600" />
              Temperatura Ideal da Água
            </h2>
            <div className="space-y-4">
              <div className="text-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">36-37°C</div>
                <p className="text-sm text-gray-600 font-medium">Temperatura corporal do bebê</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">Como Testar</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Use termômetro de banho</li>
                  <li>• Teste com o cotovelo interno</li>
                  <li>• Deve estar morna, não quente</li>
                  <li>• Verifique durante todo o banho</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 border-2 border-red-300 rounded-xl">
                <h4 className="font-medium text-red-800 mb-2">⚠️ Perigo</h4>
                <p className="text-sm text-red-700 font-medium">Água acima de 38°C pode causar queimaduras graves em segundos.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Droplets className="mr-2 text-blue-600" />
            Passo a Passo do Banho Seguro
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
                <h3 className="font-semibold text-gray-800 text-lg">1. Preparação</h3>
                <p className="text-sm text-gray-600 mt-1">Reúna toalha, roupinha, fralda, sabonete e shampoo. Tenha tudo ao alcance.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
                <h3 className="font-semibold text-gray-800 text-lg">2. Rosto e Cabelos</h3>
                <p className="text-sm text-gray-600 mt-1">Comece pelo rosto com água limpa. Depois lave os cabelos com shampoo suave.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 rounded-r-lg">
                <h3 className="font-semibold text-gray-800 text-lg">3. Corpo</h3>
                <p className="text-sm text-gray-600 mt-1">Lave o corpo com sabonete suave, enxaguando bem. Preste atenção nas dobrinhas.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50 rounded-r-lg">
                <h3 className="font-semibold text-gray-800 text-lg">4. Genitais</h3>
                <p className="text-sm text-gray-600 mt-1">Lave suavemente a área genital. Meninas da frente para trás.</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50 rounded-r-lg">
                <h3 className="font-semibold text-gray-800 text-lg">5. Enxágue</h3>
                <p className="text-sm text-gray-600 mt-1">Enxágue completamente todo o sabão. Use água limpa no final.</p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-50 rounded-r-lg">
                <h3 className="font-semibold text-gray-800 text-lg">6. Secagem</h3>
                <p className="text-sm text-gray-600 mt-1">Seque imediatamente com toalha macia. Hidrate se necessário.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Banho de Recém-nascido</h2>
            <div className="space-y-3">
              <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
                <h4 className="font-medium text-pink-800 text-sm">Primeiro Banho</h4>
                <p className="text-xs text-pink-700 mt-1">Aguarde 24-48 horas após o nascimento.</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 text-sm">Frequência</h4>
                <p className="text-xs text-blue-700 mt-1">2-3 vezes por semana nos primeiros meses.</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 text-sm">Duração</h4>
                <p className="text-xs text-green-700 mt-1">5-10 minutos para evitar resfriado.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Produtos Recomendados</h2>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-800 text-sm">Shampoo</h4>
                <p className="text-xs text-yellow-700 mt-1">Sem lágrimas, pH neutro, sem fragrância forte.</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-800 text-sm">Sabonete</h4>
                <p className="text-xs text-purple-700 mt-1">Suave, sem corantes, hipoalergênico.</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-800 text-sm">Hidratante</h4>
                <p className="text-xs text-orange-700 mt-1">Apenas se a pele estiver seca.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Cuidados Especiais</h2>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-800 text-sm">Pé de atleta</h4>
                <p className="text-xs text-red-700 mt-1">Seque bem entre os dedos dos pés.</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                <h4 className="font-medium text-indigo-800 text-sm">Umbigo</h4>
                <p className="text-xs text-indigo-700 mt-1">Mantenha seco até cair (cerca de 2 semanas).</p>
              </div>
              <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                <h4 className="font-medium text-cyan-800 text-sm">Cabelos</h4>
                <p className="text-xs text-cyan-700 mt-1">Use pente fino para remover crostas.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
            <Shield className="mr-2" size={28} />
            Segurança em Primeiro Lugar
          </h2>
          <p className="mb-6 text-lg">O banho deve ser um momento prazeroso e seguro para você e seu bebê.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-semibold mb-2 text-lg">Nunca Sozinho</h3>
              <p className="opacity-90">O bebê nunca deve ficar sozinho na água, nem por um segundo.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-semibold mb-2 text-lg">Apoio Constante</h3>
              <p className="opacity-90">Sempre use uma mão para apoiar a cabeça e o pescoço do bebê.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-semibold mb-2 text-lg">Ambiente Quente</h3>
              <p className="opacity-90">Mantenha o banheiro aquecido para evitar resfriados.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
