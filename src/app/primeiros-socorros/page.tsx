import { ArrowLeft, Heart, AlertTriangle, Phone, Shield } from 'lucide-react'
import Link from 'next/link'

export default function PrimeirosSocorrosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/dashboard" className="inline-flex items-center text-red-600 hover:text-red-800 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Voltar ao início
        </Link>

        <header className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart size={32} className="text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Engasgo e Primeiros Socorros</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Guia ilustrado para situações de emergência. Conheça os procedimentos corretos.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Shield className="mr-2 text-red-600" />
              Desengasgo em Bebês (0-1 ano)
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-medium text-gray-800">Passo 1: Verificar</h3>
                <p className="text-sm text-gray-600">Não consegue chorar, tossir ou respirar? Agiu rapidamente!</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-medium text-gray-800">Passo 2: Golpes nas Costas</h3>
                <p className="text-sm text-gray-600">Deite o bebê de bruços no antebraço. Dê 5 golpes firmes entre as escápulas.</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="font-medium text-gray-800">Passo 3: Compressões Torácicas</h3>
                <p className="text-sm text-gray-600">Vire o bebê de costas. Dê 5 compressões no peito (abaixo dos mamilos).</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-medium text-gray-800">Passo 4: Repetir ou Ligar</h3>
                <p className="text-sm text-gray-600">Repita os passos. Se não resolver, ligue para emergência.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Shield className="mr-2 text-blue-600" />
              Desengasgo em Crianças (1-8 anos)
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-800">Método Heimlich</h3>
                <p className="text-sm text-gray-600">Para crianças maiores que conseguem ficar em pé.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-medium text-gray-800">Posicione a Criança</h3>
                <p className="text-sm text-gray-600">Fique atrás, envolva com os braços abaixo do diafragma.</p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-medium text-gray-800">Compressões</h3>
                <p className="text-sm text-gray-600">Dê compressões rápidas para cima. Continue até desengasgar ou perder consciência.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-yellow-600" />
            Situações de Emergência
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-red-200 bg-red-50 rounded">
              <h3 className="font-medium text-red-800 mb-2">Queimaduras</h3>
              <p className="text-sm text-red-700">Resfrie com água corrente por 10 minutos. Cubra com pano limpo.</p>
            </div>
            <div className="p-4 border border-blue-200 bg-blue-50 rounded">
              <h3 className="font-medium text-blue-800 mb-2">Febre Alta</h3>
              <p className="text-sm text-blue-700">Use compressas mornas. Medicamentos apenas com orientação médica.</p>
            </div>
            <div className="p-4 border border-green-200 bg-green-50 rounded">
              <h3 className="font-medium text-green-800 mb-2">Convulsões</h3>
              <p className="text-sm text-green-700">Mantenha seguro, não restrinja. Ligue para emergência.</p>
            </div>
            <div className="p-4 border border-purple-200 bg-purple-50 rounded">
              <h3 className="font-medium text-purple-800 mb-2">Cortes</h3>
              <p className="text-sm text-purple-700">Lave com água e sabão. Aperte para estancar sangue.</p>
            </div>
            <div className="p-4 border border-orange-200 bg-orange-50 rounded">
              <h3 className="font-medium text-orange-800 mb-2">Intoxicação</h3>
              <p className="text-sm text-orange-700">Não induza vômito. Ligue para emergência ou centro de intoxicação.</p>
            </div>
            <div className="p-4 border border-indigo-200 bg-indigo-50 rounded">
              <h3 className="font-medium text-indigo-800 mb-2">Afogamento</h3>
              <p className="text-sm text-indigo-700">Retire da água, inicie RCP se necessário. Ligue emergência.</p>
            </div>
          </div>
        </div>

        <div className="bg-red-600 text-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-center">
            <Phone className="mr-2" />
            Botão de Emergência
          </h2>
          <p className="mb-4">Em caso de emergência real, ligue imediatamente para:</p>
          <div className="space-y-2">
            <p className="text-lg font-bold">192 - SAMU (Brasil)</p>
            <p className="text-lg font-bold">190 - Polícia Militar</p>
            <p className="text-lg font-bold">193 - Corpo de Bombeiros</p>
          </div>
          <p className="text-sm mt-4 opacity-90">
            Este aplicativo não substitui atendimento médico profissional.
          </p>
        </div>
      </div>
    </div>
  )
}