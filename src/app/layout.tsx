import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NotificationProvider } from '@/components/NotificationProvider'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BabyCare - Guia para Pais e Babás',
  description: 'Aplicativo completo para cuidar de bebês e crianças pequenas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-900`}>
        <NotificationProvider>
          {children}
          <Toaster position="top-right" />
        </NotificationProvider>
      </body>
    </html>
  )
}
