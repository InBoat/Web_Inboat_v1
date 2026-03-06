import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    return supabaseResponse
  }

  try {
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Protege /admin e /admin/* — redireciona para login se não autenticado
    if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin-login") && !user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = "/admin-login"
      return NextResponse.redirect(redirectUrl)
    }

    // Redireciona usuário logado que tenta acessar o login
    if (request.nextUrl.pathname.startsWith("/admin-login") && user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = "/admin"
      return NextResponse.redirect(redirectUrl)
    }
  } catch {
    return supabaseResponse
  }

  return supabaseResponse
}
