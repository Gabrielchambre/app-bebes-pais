import { createServerClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createServerClient()
    
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Erro ao confirmar email:', error)
      return NextResponse.redirect(new URL('/cadastro?error=confirmation_failed', requestUrl.origin))
    }
  }

  // Redirecionar para o dashboard após confirmação bem-sucedida
  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
}
