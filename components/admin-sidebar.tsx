"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Anchor, LayoutDashboard, Ship, FileText, Home, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Embarcações", href: "/admin/embarcacoes", icon: Ship },
  { name: "Leads", href: "/admin/leads", icon: FileText },
]

export function AdminSidebar() {
  const pathname = usePathname()

  function handleLogout() {
    try {
      localStorage.removeItem("inboat_admin_auth")
    } catch (err) {
      // fallback silencioso
    }
    window.location.href = "/admin"
  }

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-sidebar-primary">
          <Anchor className="h-7 w-7" />
          <span>InBoat</span>
        </Link>
        <p className="text-sm text-sidebar-foreground/60 mt-1">Painel Administrativo</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-1">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/">
            <Home className="h-5 w-5 mr-3" />
            Voltar ao Site
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sair
        </Button>
      </div>
    </aside>
  )
}
