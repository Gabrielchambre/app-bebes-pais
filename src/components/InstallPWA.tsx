'use client'

import { useState, useEffect } from 'react'
import { Download, X } from 'lucide-react'

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallBanner, setShowInstallBanner] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallBanner(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      setShowInstallBanner(false)
    }
  }

  if (!showInstallBanner) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-2xl p-4 z-50 animate-slide-up">
      <button
        onClick={() => setShowInstallBanner(false)}
        className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-lg transition-colors"
      >
        <X size={20} />
      </button>
      
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Download size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">Baixe no Celular</h3>
          <p className="text-sm text-white/90 mb-3">
            Instale o BabyCare no seu celular para acesso rápido e offline!
          </p>
          <button
            onClick={handleInstallClick}
            className="w-full bg-white text-indigo-600 font-bold py-2 px-4 rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Instalar Agora
          </button>
        </div>
      </div>
    </div>
  )
}
