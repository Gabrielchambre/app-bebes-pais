import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck } from 'lucide-react'
import Link from 'next/link'

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft size={20} />
          Voltar
        </Link>

        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-xl">
            <Shield className="text-white" size={36} />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Política de Privacidade
          </h1>
          <p className="text-xl text-gray-600">
            Última atualização: Janeiro de 2024
          </p>
        </header>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8 border border-white/50">
          {/* Introdução */}
          <section>
            <p className="text-gray-700 leading-relaxed text-lg">
              No BabyCare, levamos sua privacidade muito a sério. Esta política
              explica como coletamos, usamos, armazenamos e protegemos suas
              informações pessoais e as informações sobre seu bebê.
            </p>
          </section>

          {/* Coleta de dados */}
          <section>
            <div className="flex items-center mb-5">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mr-3">
                <Database className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Dados que Coletamos
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p className="font-bold text-gray-800 text-lg">Informações de Cadastro:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-base">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Senha (criptografada)</li>
              </ul>

              <p className="font-bold text-gray-800 text-lg mt-6">Informações do Bebê:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-base">
                <li>Horários de sono, alimentação e troca de fraldas</li>
                <li>Registros de saúde e desenvolvimento</li>
                <li>Notas e observações pessoais</li>
              </ul>

              <p className="font-bold text-gray-800 text-lg mt-6">Dados de Uso:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-base">
                <li>Páginas visitadas e funcionalidades utilizadas</li>
                <li>Preferências e configurações do aplicativo</li>
              </ul>
            </div>
          </section>

          {/* Como usamos os dados */}
          <section>
            <div className="flex items-center mb-5">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg mr-3">
                <Eye className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Como Usamos Seus Dados
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4 text-base">
              <li>Fornecer e melhorar nossos serviços</li>
              <li>Personalizar sua experiência no aplicativo</li>
              <li>Enviar notificações e lembretes importantes</li>
              <li>Responder suas dúvidas e solicitações de suporte</li>
              <li>Analisar o uso do aplicativo para melhorias</li>
              <li>Garantir a segurança e prevenir fraudes</li>
            </ul>
          </section>

          {/* Segurança */}
          <section>
            <div className="flex items-center mb-5">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg mr-3">
                <Lock className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Segurança dos Dados
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p className="text-base">
                Implementamos medidas de segurança robustas para proteger suas
                informações:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4 text-base">
                <li>Criptografia de ponta a ponta para dados sensíveis</li>
                <li>Servidores seguros com certificados SSL/TLS</li>
                <li>Autenticação de dois fatores disponível</li>
                <li>Backups regulares e redundância de dados</li>
                <li>Monitoramento contínuo de segurança</li>
              </ul>
            </div>
          </section>

          {/* Compartilhamento */}
          <section>
            <div className="flex items-center mb-5">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mr-3">
                <UserCheck className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Compartilhamento de Dados
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p className="font-bold text-gray-800 text-lg">
                Nós NÃO vendemos seus dados pessoais.
              </p>
              <p className="text-base">Compartilhamos informações apenas quando:</p>
              <ul className="list-disc list-inside space-y-3 ml-4 text-base">
                <li>Você autoriza explicitamente (ex: compartilhar com babás)</li>
                <li>Exigido por lei ou ordem judicial</li>
                <li>Necessário para proteger direitos e segurança</li>
              </ul>
            </div>
          </section>

          {/* Seus direitos */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-5">
              Seus Direitos
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-base">Você tem direito a:</p>
              <ul className="list-disc list-inside space-y-3 ml-4 text-base">
                <li>Acessar seus dados pessoais a qualquer momento</li>
                <li>Corrigir informações incorretas ou desatualizadas</li>
                <li>Solicitar a exclusão de sua conta e dados</li>
                <li>Exportar seus dados em formato legível</li>
                <li>Revogar consentimentos previamente dados</li>
                <li>Optar por não receber comunicações de marketing</li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Cookies e Tecnologias Similares
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Utilizamos cookies e tecnologias similares para melhorar sua
              experiência, lembrar suas preferências e analisar o uso do
              aplicativo. Você pode gerenciar suas preferências de cookies nas
              configurações do navegador.
            </p>
          </section>

          {/* Menores */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Privacidade de Menores
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              O BabyCare é destinado a pais e cuidadores maiores de 18 anos.
              Não coletamos intencionalmente informações de menores de idade.
              Os dados sobre bebês são coletados apenas para fins de
              acompanhamento pelos responsáveis legais.
            </p>
          </section>

          {/* Alterações */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Alterações nesta Política
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Podemos atualizar esta política periodicamente. Notificaremos
              você sobre mudanças significativas por e-mail ou através de um
              aviso no aplicativo. Recomendamos revisar esta página
              regularmente.
            </p>
          </section>

          {/* Contato */}
          <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-5">
              Entre em Contato
            </h2>
            <p className="text-gray-700 mb-5 text-base">
              Se você tiver dúvidas sobre esta política ou sobre como tratamos
              seus dados, entre em contato conosco:
            </p>
            <div className="space-y-3 text-gray-700 text-base">
              <p>
                <strong className="text-gray-800">E-mail:</strong> privacidade@babycare.com
              </p>
              <p>
                <strong className="text-gray-800">Telefone:</strong> (11) 1234-5678
              </p>
              <p>
                <strong className="text-gray-800">Endereço:</strong> Rua Exemplo, 123 - São Paulo, SP
              </p>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/feedback"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Tem dúvidas? Envie um feedback
          </Link>
        </div>
      </div>
    </div>
  )
}
