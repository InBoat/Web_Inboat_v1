"use client"

import Link from "next/link"
import { Anchor, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/como-funciona", label: "Como Funciona" },
  { href: "/embarcacoes", label: "Embarcações" },
  { href: "/faq", label: "Perguntas Frequentes" },
  { href: "/contato", label: "Contato" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg shadow-background/20"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav className="container mx-auto flex h-18 items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-8 w-8 rounded-full border border-primary/50 flex items-center justify-center group-hover:border-primary transition-colors">
            <Anchor className="h-4 w-4 text-primary" />
          </div>
          <span className="font-serif text-xl font-bold text-foreground tracking-wide">
            In<span className="text-primary">Boat</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground hover:bg-accent"
            asChild
          >
            <a href="https://portal.inboat.com.br" target="_blank" rel="noopener noreferrer">
              Área do Cotista
            </a>
          </Button>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide"
            asChild
          >
            <Link href="/embarcacoes">Ver Embarcações</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full border-border text-foreground hover:bg-accent"
                asChild
              >
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
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                asChild
              >
                <Link href="/embarcacoes" onClick={() => setMobileMenuOpen(false)}>
                  Ver Embarcações
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
