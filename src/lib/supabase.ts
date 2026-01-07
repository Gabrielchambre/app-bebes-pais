import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Validação das variáveis de ambiente
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://placeholder.supabase.co' || supabaseAnonKey === 'placeholder-key') {
  console.warn('⚠️ Variáveis de ambiente do Supabase não configuradas')
}

// Cliente Supabase para uso no browser (Client Components)
export const supabase = createSupabaseClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

// Função para criar cliente Supabase com cookies (para Server Components/Routes)
// Esta função só deve ser importada em Server Components ou Route Handlers
export async function createServerClient() {
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  
  // Validação em runtime para Server Components
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Variáveis de ambiente do Supabase não configuradas. ' +
      'Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY'
    )
  }
  
  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: {
        getItem: async (key: string) => {
          const cookie = cookieStore.get(key)
          return cookie?.value ?? null
        },
        setItem: async (key: string, value: string) => {
          cookieStore.set(key, value, {
            maxAge: 60 * 60 * 24 * 7, // 7 dias
            path: '/',
          })
        },
        removeItem: async (key: string) => {
          cookieStore.delete(key)
        },
      },
    },
  })
}
