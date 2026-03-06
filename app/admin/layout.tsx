import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"

/**
 * Layout do admin. A autenticação é feita pelo middleware (lib/supabase/middleware.ts).
 * Evitamos createClient/getUser aqui para não gerar erros de Server Components durante revalidação.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 bg-muted/10">{children}</main>
    </div>
  )
}
