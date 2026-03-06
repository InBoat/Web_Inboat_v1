"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { LogoAdaptive } from "@/components/logo-adaptive"

const navLinks = [
  { href: "/como-funciona", label: "Como Funciona" },
  { href: "/embarcacoes", label: "Embarcações" },
  { href: "/blog", label: "Conteúdo" },
  { href: "/faq", label: "Perguntas Frequentes" },
  { href: "/contato", label: "Contato" },
]

export function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    router.push(href)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 pointer-events-auto",
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm"
          : "bg-background border-b border-border"
      )}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <LogoAdaptive width={110} height={36} className="h-9" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer py-2"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: CTA + Theme Toggle */}
        <div className="hidden md:flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative h-9 w-9 text-muted-foreground hover:text-foreground overflow-hidden"
            aria-label="Alternar tema"
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground text-sm font-medium"
            asChild
          >
            <a href="https://portal.inboat.com.br" target="_blank" rel="noopener noreferrer">
              Área do Cotista
            </a>
          </Button>
          <Button
            size="sm"
            className="text-sm font-semibold text-white px-5"
            style={{ background: "linear-gradient(135deg, #0c5280 0%, #0f6ea8 50%, #1e88c8 100%)" }}
            asChild
          >
            <Link href="/embarcacoes">Ver Embarcações</Link>
          </Button>
        </div>

        {/* Mobile: Theme Toggle + Menu Button */}
        <div className="md:hidden flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative h-9 w-9 text-muted-foreground"
            aria-label="Alternar tema"
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <button
            className="h-9 w-9 flex items-center justify-center text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-5 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-3 cursor-pointer"
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-border flex flex-col gap-2">
              <Button variant="outline" className="w-full" asChild>
                <a
                  href="https://portal.inboat.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Área do Cotista
                </a>
              </Button>
              <Button
                className="w-full font-semibold text-white cursor-pointer"
                style={{ background: "linear-gradient(135deg, #0c5280 0%, #0f6ea8 50%, #1e88c8 100%)" }}
                onClick={() => handleNavClick("/embarcacoes")}
              >
                Ver Embarcações
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
