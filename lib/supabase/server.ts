import { createServerClient } from "@supabase/ssr"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

export function isSupabaseConfigured() {
  return Boolean(
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    !SUPABASE_URL.includes("seu-projeto") &&
    !SUPABASE_ANON_KEY.includes("sua-anon-key")
  )
}

/** Cliente com service role - bypassa RLS. Usar apenas em server actions (admin já autenticado pelo middleware). */
export function createServiceClient() {
  const url = SUPABASE_URL
  const key = SUPABASE_SERVICE_KEY || SUPABASE_ANON_KEY
  if (!url || !key) throw new Error("Supabase não configurado")
  return createSupabaseClient(url, key)
}

export async function createClient() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase não configurado. Adicione NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no arquivo .env.local com suas credenciais do projeto. Obtenha em: https://supabase.com/dashboard/project/_/settings/api"
    )
  }

  const cookieStore = await cookies()

  return createServerClient(
    SUPABASE_URL!,
    SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // Chamado de Server Component — ignorar
          }
        },
      },
    },
  )
}
