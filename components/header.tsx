"use client"

import Link from "next/link"
import { Anchor, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Anchor className="h-7 w-7" />
          <span>InBoat</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/como-funciona"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Como Funciona
          </Link>
          <Link
            href="/embarcacoes"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Embarcações
          </Link>
          <Link 
            href="/faq" 
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Perguntas Frequentes
          </Link>
          <Link 
            href="/contato" 
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Contato
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" asChild className="bg-transparent">
            <a href="https://portal.inboat.com.br" target="_blank" rel="noopener noreferrer">Área do Cotista</a>
          </Button>
          <Button asChild>
            <Link href="/embarcacoes">Conheça as Embarcações</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/como-funciona"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link
              href="/embarcacoes"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Embarcações
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Perguntas Frequentes
            </Link>
            <Link
              href="/contato"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contato
            </Link>
            <div className="pt-2 border-t border-border space-y-2">
              <Button variant="outline" asChild className="w-full bg-transparent" onClick={() => setMobileMenuOpen(false)}>
                <a href="https://portal.inboat.com.br" target="_blank" rel="noopener noreferrer">Área do Cotista</a>
              </Button>
              <Button asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                <Link href="/embarcacoes">Conheça as Embarcações</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
