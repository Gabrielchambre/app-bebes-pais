'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Baby, Calendar, Bell, Heart, Dumbbell, Utensils, TrendingUp, Save, Check } from 'lucide-react'

// Dados de desenvolvimento por semana
const weeklyData = {
  4: {
    fruit: 'Semente de Papoula',
    size: '2mm',
    fruitImage: 'https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/beb06e1f-7c2e-49a2-bc46-e83842117ce6.webp',
    development: 'O embrião está se implantando no útero. As células estão se dividindo rapidamente e começando a formar as estruturas básicas do bebê.',
    motherBody: 'Você pode não sentir nada ainda, mas seu corpo já está produzindo hormônios da gravidez. Algumas mulheres podem ter um leve sangramento de implantação.',
    symptoms: ['Possível sangramento leve', 'Cansaço', 'Sensibilidade nos seios'],
    nutrition: 'Comece a tomar ácido fólico se ainda não começou. Mantenha uma dieta balanceada rica em folato, ferro e cálcio.',
    exercise: 'Continue com suas atividades normais. Caminhadas leves são sempre bem-vindas.',
    wellness: 'Evite álcool, cigarro e medicamentos sem orientação médica. Comece a se hidratar bem.'
  },
  8: {
    fruit: 'Framboesa',
    size: '1,6cm',
    fruitImage: 'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=400&h=400&fit=crop&q=80',
    development: 'O bebê agora tem todos os órgãos principais formados! Os dedos das mãos e pés estão começando a se formar, e o coração bate cerca de 150 vezes por minuto.',
    motherBody: 'Os enjoos matinais podem estar no auge. Seus seios estão crescendo e você pode sentir mais cansaço que o normal.',
    symptoms: ['Enjoos e náuseas', 'Fadiga intensa', 'Aumento da frequência urinária', 'Sensibilidade a cheiros'],
    nutrition: 'Faça refeições pequenas e frequentes para controlar os enjoos. Gengibre pode ajudar. Mantenha-se hidratada.',
    exercise: 'Yoga para gestantes e caminhadas leves são ideais. Evite exercícios de alto impacto.',
    wellness: 'Descanse sempre que possível. Os enjoos são temporários e devem melhorar no segundo trimestre.'
  },
  12: {
    fruit: 'Ameixa',
    size: '5,4cm',
    fruitImage: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop&q=80',
    development: 'O bebê está se movendo! Embora você ainda não sinta, ele já está chutando e se alongando. Os órgãos vitais estão funcionando.',
    motherBody: 'O risco de aborto diminui significativamente após esta semana. Você pode começar a sentir menos enjoos.',
    symptoms: ['Enjoos diminuindo', 'Aumento de energia', 'Barriga começando a aparecer'],
    nutrition: 'Aumente a ingestão de proteínas e cálcio. Inclua peixes ricos em ômega-3 (evite os com alto teor de mercúrio).',
    exercise: 'Natação é excelente nesta fase. Continue com caminhadas e yoga.',
    wellness: 'Este é um bom momento para contar a novidade para família e amigos, se ainda não contou.'
  },
  16: {
    fruit: 'Abacate',
    size: '11,6cm',
    fruitImage: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop&q=80',
    development: 'O bebê pode fazer caretas! Os músculos faciais estão se desenvolvendo. O sistema nervoso está começando a funcionar.',
    motherBody: 'Você pode começar a sentir os primeiros movimentos do bebê (especialmente se não for a primeira gravidez). Sua barriga está crescendo.',
    symptoms: ['Possíveis primeiros movimentos', 'Aumento do apetite', 'Pele mais brilhante'],
    nutrition: 'Mantenha uma dieta rica em ferro para prevenir anemia. Inclua vegetais verde-escuros e carnes magras.',
    exercise: 'Exercícios de fortalecimento do assoalho pélvico são importantes. Continue com atividades aeróbicas leves.',
    wellness: 'Comece a usar creme para prevenir estrias. Hidrate bem a pele da barriga.'
  },
  20: {
    fruit: 'Banana',
    size: '16,4cm',
    fruitImage: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop&q=80',
    development: 'O bebê pode ouvir sons externos! Ele está engolindo líquido amniótico e seus rins estão produzindo urina. Os cabelos começam a crescer.',
    motherBody: 'Você definitivamente está sentindo os movimentos do bebê agora. Sua barriga está bem visível e você pode sentir o útero na altura do umbigo.',
    symptoms: ['Movimentos fetais regulares', 'Aumento da libido', 'Possível dor nas costas'],
    nutrition: 'Aumente a ingestão de cálcio para o desenvolvimento ósseo do bebê. Leite, queijo e iogurte são ótimas opções.',
    exercise: 'Pilates para gestantes ajuda com a postura. Evite exercícios deitada de costas por muito tempo.',
    wellness: 'Use travesseiros para apoio ao dormir de lado. Converse e cante para o bebê - ele pode ouvir!'
  },
  24: {
    fruit: 'Espiga de Milho',
    size: '30cm',
    fruitImage: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=400&fit=crop&q=80',
    development: 'Os pulmões do bebê estão se desenvolvendo rapidamente. Ele está ganhando peso e sua pele está ficando menos transparente. Pode ter soluços!',
    motherBody: 'Você pode sentir contrações de Braxton Hicks (contrações de treinamento). Seu útero está crescendo e pode pressionar outros órgãos.',
    symptoms: ['Contrações leves ocasionais', 'Azia', 'Inchaço nos pés', 'Falta de ar leve'],
    nutrition: 'Coma pequenas porções para evitar azia. Evite alimentos muito condimentados ou gordurosos antes de dormir.',
    exercise: 'Exercícios na água são ideais para aliviar o peso. Continue com caminhadas regulares.',
    wellness: 'Eleve os pés quando possível para reduzir inchaço. Use sapatos confortáveis.'
  },
  28: {
    fruit: 'Berinjela',
    size: '37,6cm',
    fruitImage: 'https://images.unsplash.com/photo-1659261200833-ec993c0e3b4f?w=400&h=400&fit=crop&q=80',
    development: 'O bebê está abrindo e fechando os olhos! Ele pode distinguir luz e escuridão. O cérebro está se desenvolvendo rapidamente.',
    motherBody: 'Bem-vinda ao terceiro trimestre! Você pode sentir mais cansaço novamente. O bebê está pressionando seus órgãos.',
    symptoms: ['Fadiga aumentada', 'Dificuldade para dormir', 'Azia frequente', 'Falta de ar'],
    nutrition: 'Mantenha refeições leves e frequentes. Aumente a ingestão de fibras para prevenir constipação.',
    exercise: 'Reduza a intensidade dos exercícios. Foque em alongamentos e relaxamento.',
    wellness: 'Comece a pensar no plano de parto. Considere fazer aulas de preparação para o parto.'
  },
  32: {
    fruit: '',
    size: '42,4cm',
    fruitImage: 'https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/ec5fe14f-9bd4-4da1-b2ec-0d94b6dd7ddc.jpg',
    development: 'O bebê está praticando respirar! Ele está ganhando cerca de 200g por semana. As unhas estão crescendo.',
    motherBody: 'Você pode sentir falta de ar com mais frequência. O útero está pressionando o diafragma. Consultas pré-natais são mais frequentes agora.',
    symptoms: ['Falta de ar', 'Inchaço aumentado', 'Dor nas costas', 'Insônia'],
    nutrition: 'Continue com alimentação balanceada. Evite sal em excesso para controlar o inchaço.',
    exercise: 'Caminhadas curtas e exercícios de respiração são ideais. Evite atividades extenuantes.',
    wellness: 'Prepare a mala da maternidade. Descanse sempre que possível.'
  },
  36: {
    fruit: '',
    size: '47,4cm',
    fruitImage: 'https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/e6d39b5a-3ee6-4e9a-9dfe-f756a335196d.webp',
    development: 'O bebê está quase pronto! Ele está ganhando peso rapidamente e se posicionando para o nascimento (geralmente de cabeça para baixo).',
    motherBody: 'Você pode sentir o bebê "encaixar" na pelve. Isso pode aliviar a falta de ar, mas aumentar a pressão na bexiga.',
    symptoms: ['Pressão pélvica', 'Aumento da frequência urinária', 'Contrações de Braxton Hicks mais frequentes'],
    nutrition: 'Mantenha-se bem hidratada. Coma alimentos ricos em energia para o trabalho de parto que se aproxima.',
    exercise: 'Caminhadas leves ajudam o bebê a se posicionar. Exercícios de agachamento (com orientação) podem ajudar.',
    wellness: 'Revise seu plano de parto. Tenha os contatos de emergência sempre à mão.'
  },
  40: {
    fruit: 'Melancia',
    size: '51,2cm',
    fruitImage: 'https://images.unsplash.com/photo-1587049352846-4a222e784210?w=400&h=400&fit=crop&q=80',
    development: 'O bebê está pronto para nascer! Ele está apenas ganhando peso e esperando o momento certo. Todos os órgãos estão maduros.',
    motherBody: 'Você está no final da jornada! Pode sentir contrações mais intensas. O colo do útero está se preparando para dilatar.',
    symptoms: ['Contrações regulares', 'Perda do tampão mucoso', 'Rompimento da bolsa (possível)', 'Ansiedade'],
    nutrition: 'Mantenha-se nutrida e hidratada. Tenha lanches leves à mão para o trabalho de parto.',
    exercise: 'Movimente-se conforme se sentir confortável. Caminhadas podem ajudar a iniciar o trabalho de parto.',
    wellness: 'Descanse, mas mantenha-se ativa. Pratique técnicas de respiração. Seu bebê chegará em breve!'
  }
}

export default function GravidezPage() {
  const [dum, setDum] = useState('')
  const [dpp, setDpp] = useState('')
  const [currentWeek, setCurrentWeek] = useState(0)
  const [currentDay, setCurrentDay] = useState(0)
  const [notifications, setNotifications] = useState(false)
  const [showConfig, setShowConfig] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Carregar dados salvos
    const savedData = localStorage.getItem('pregnancy_data')
    if (savedData) {
      const data = JSON.parse(savedData)
      setDum(data.dum)
      setDpp(data.dpp)
      setCurrentWeek(data.currentWeek)
      setCurrentDay(data.currentDay)
      setNotifications(data.notifications)
      setShowConfig(false)
    }
  }, [])

  const calculateDPP = (dumDate: string) => {
    if (!dumDate) return ''
    const date = new Date(dumDate)
    date.setDate(date.getDate() + 280) // 40 semanas
    return date.toISOString().split('T')[0]
  }

  const calculateWeeks = (dumDate: string) => {
    if (!dumDate) return { weeks: 0, days: 0 }
    const dum = new Date(dumDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - dum.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const weeks = Math.floor(diffDays / 7)
    const days = diffDays % 7
    return { weeks, days }
  }

  const handleDumChange = (value: string) => {
    setDum(value)
    const calculatedDpp = calculateDPP(value)
    setDpp(calculatedDpp)
    const { weeks, days } = calculateWeeks(value)
    setCurrentWeek(weeks)
    setCurrentDay(days)
  }

  const handleSave = () => {
    const data = {
      dum,
      dpp,
      currentWeek,
      currentDay,
      notifications
    }
    localStorage.setItem('pregnancy_data', JSON.stringify(data))
    setSaved(true)
    setShowConfig(false)
    setTimeout(() => setSaved(false), 3000)
  }

  const getWeekData = () => {
    // Encontrar a semana mais próxima com dados
    const availableWeeks = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40]
    const closestWeek = availableWeeks.reduce((prev, curr) => 
      Math.abs(curr - currentWeek) < Math.abs(prev - currentWeek) ? curr : prev
    )
    return weeklyData[closestWeek as keyof typeof weeklyData]
  }

  const weekData = getWeekData()
  const progressPercentage = (currentWeek / 40) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Header Moderno */}
      <nav className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-30 border-b border-pink-100">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-all duration-300 font-medium"
            >
              <ArrowLeft size={22} />
              <span>Voltar</span>
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
              Acompanhamento da Gravidez
            </h1>
            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Configuração Inicial */}
        {showConfig && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 mb-8 border border-pink-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 via-rose-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Baby className="text-white" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Informações Iniciais</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Data da Última Menstruação (DUM)
                </label>
                <input
                  type="date"
                  value={dum}
                  onChange={(e) => handleDumChange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                />
              </div>

              {dpp && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Data Prevista do Parto (DPP)
                  </label>
                  <input
                    type="date"
                    value={dpp}
                    readOnly
                    className="w-full px-4 py-3 bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200 rounded-xl text-gray-700 font-medium"
                  />
                </div>
              )}

              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <input
                  type="checkbox"
                  id="notifications"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
                />
                <label htmlFor="notifications" className="flex items-center gap-2 text-gray-700 font-medium cursor-pointer">
                  <Bell size={20} className="text-purple-600" />
                  Receber notificações semanais personalizadas
                </label>
              </div>

              <button
                onClick={handleSave}
                disabled={!dum}
                className="w-full py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {saved ? (
                  <>
                    <Check size={20} />
                    Salvo com Sucesso!
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Salvar e Começar
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Painel Principal */}
        {!showConfig && currentWeek > 0 && (
          <div className="space-y-6">
            {/* Semana Atual - Card Hero */}
            <div className="bg-gradient-to-br from-white to-pink-50/50 rounded-3xl shadow-2xl p-6 sm:p-8 border border-pink-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {currentWeek} semanas e {currentDay} dias
                  </h2>
                  <p className="text-gray-600 mt-2 font-medium">de gestação</p>
                </div>
                <button
                  onClick={() => setShowConfig(true)}
                  className="px-5 py-2.5 text-pink-600 hover:bg-pink-100 rounded-xl transition-all duration-300 font-semibold border border-pink-200"
                >
                  Editar
                </button>
              </div>

              {/* Barra de Progresso Moderna */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-3 font-medium">
                  <span>Progresso da Gestação</span>
                  <span className="text-pink-600 font-bold">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full h-5 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 transition-all duration-500 rounded-full shadow-lg"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-5 border border-pink-200 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1 font-medium">Data Prevista</p>
                  <p className="text-lg font-bold text-gray-800">
                    {new Date(dpp).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-200 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1 font-medium">Faltam</p>
                  <p className="text-lg font-bold text-gray-800">
                    {40 - currentWeek} semanas
                  </p>
                </div>
              </div>
            </div>

            {/* Desenvolvimento do Bebê ao Longo do Tempo - Inspirado na Imagem */}
            <div className="bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 rounded-3xl shadow-2xl overflow-hidden border border-pink-300">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Baby className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Desenvolvimento ao Longo do Tempo</h3>
                </div>

                {/* Card Principal - COM IMAGEM REALISTA */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
                  <div className="p-6 bg-gradient-to-br from-pink-50 to-white">
                    <div className="text-center mb-4">
                      <p className="text-sm text-gray-600 font-medium mb-1">Semana Atual</p>
                      <p className="text-3xl font-bold text-pink-600">{currentWeek} semanas, {currentDay} dias</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {currentWeek <= 13 ? '1º Trimestre' : currentWeek <= 26 ? '2º Trimestre' : '3º Trimestre'}
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4 p-5 bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl border border-pink-200">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white">
                        <img
                          src={weekData.fruitImage}
                          alt={weekData.fruit || 'Tamanho do bebê'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 font-medium">Tamanho aproximado</p>
                        {weekData.fruit && <p className="text-xl font-bold text-gray-800">{weekData.fruit}</p>}
                        <p className="text-sm text-gray-600">{weekData.size}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Linha do Tempo Visual */}
                <div className="bg-white rounded-3xl shadow-xl p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-6 text-center">Marcos do Desenvolvimento</h4>
                  
                  <div className="space-y-4">
                    {[
                      { week: 4, milestone: 'Implantação', icon: '🌱', completed: currentWeek >= 4 },
                      { week: 8, milestone: 'Coração batendo', icon: '💗', completed: currentWeek >= 8 },
                      { week: 12, milestone: 'Órgãos formados', icon: '✨', completed: currentWeek >= 12 },
                      { week: 16, milestone: 'Movimentos iniciais', icon: '🤸', completed: currentWeek >= 16 },
                      { week: 20, milestone: 'Pode ouvir sons', icon: '👂', completed: currentWeek >= 20 },
                      { week: 24, milestone: 'Pulmões em desenvolvimento', icon: '🫁', completed: currentWeek >= 24 },
                      { week: 28, milestone: 'Abre os olhos', icon: '👁️', completed: currentWeek >= 28 },
                      { week: 32, milestone: 'Praticando respirar', icon: '💨', completed: currentWeek >= 32 },
                      { week: 36, milestone: 'Posicionando para nascer', icon: '🔄', completed: currentWeek >= 36 },
                      { week: 40, milestone: 'Pronto para nascer!', icon: '🎉', completed: currentWeek >= 40 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${
                          item.completed 
                            ? 'bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg scale-110' 
                            : 'bg-gray-200'
                        }`}>
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className={`font-semibold ${item.completed ? 'text-pink-600' : 'text-gray-500'}`}>
                              {item.milestone}
                            </p>
                            <p className={`text-sm font-medium ${item.completed ? 'text-pink-500' : 'text-gray-400'}`}>
                              {item.week} semanas
                            </p>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-500 ${
                                item.completed 
                                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 w-full' 
                                  : 'w-0'
                              }`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Desenvolvimento do Bebê - Card Detalhado */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Baby className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">O Que Está Acontecendo Esta Semana</h3>
              </div>

              <p className="text-gray-700 leading-relaxed text-base">{weekData.development}</p>
            </div>

            {/* Corpo da Mãe */}
            <div className="bg-gradient-to-br from-white to-purple-50/50 rounded-3xl shadow-2xl p-6 sm:p-8 border border-purple-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Seu Corpo</h3>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 text-base">{weekData.motherBody}</p>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-200 shadow-sm">
                <p className="font-semibold text-gray-800 mb-3 text-lg">Sintomas Comuns:</p>
                <ul className="space-y-2">
                  {weekData.symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-sm"></div>
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Dicas Semanais - Grid Moderno */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Alimentação */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-green-200 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Utensils className="text-white" size={22} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">Alimentação</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{weekData.nutrition}</p>
              </div>

              {/* Exercícios */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-orange-200 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Dumbbell className="text-white" size={22} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">Exercícios</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{weekData.exercise}</p>
              </div>

              {/* Bem-estar */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-pink-200 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="text-white" size={22} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">Bem-estar</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{weekData.wellness}</p>
              </div>
            </div>
          </div>
        )}

        {/* Estado Inicial */}
        {!showConfig && currentWeek === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-500 via-rose-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Baby className="text-white" size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Configure suas informações para começar
            </h2>
            <button
              onClick={() => setShowConfig(true)}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Começar Agora
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
