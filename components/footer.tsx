import Link from "next/link"
import { Anchor, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-5 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="h-8 w-8 rounded-full border border-primary/50 flex items-center justify-center group-hover:border-primary transition-colors">
                <Anchor className="h-4 w-4 text-primary" />
              </div>
              <span className="font-serif text-xl font-bold text-foreground tracking-wide">
                In<span className="text-primary">Boat</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Multipropriedade de embarcações de alto padrão com gestão profissional completa. Navegue com economia e tranquilidade.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {[
                { href: "https://facebook.com/inboat", Icon: Facebook, label: "Facebook" },
                { href: "https://instagram.com/inboat", Icon: Instagram, label: "Instagram" },
                { href: "https://tiktok.com/@inboat", Icon: TikTokIcon, label: "TikTok" },
                { href: "https://youtube.com/@inboat", Icon: Youtube, label: "YouTube" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-5">Navegação</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Início" },
                { href: "/embarcacoes", label: "Embarcações" },
                { href: "/como-funciona", label: "Como Funciona" },
                { href: "/faq", label: "Perguntas Frequentes" },
                { href: "/contato", label: "Contato" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-5">Legal</h3>
            <ul className="space-y-3">
              {[
                { href: "/termos-de-uso", label: "Termos de Uso" },
                { href: "/politica-de-privacidade", label: "Política de Privacidade" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-5">Contato</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contato@inboat.com.br"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4 text-primary/70 shrink-0" />
                  contato@inboat.com.br
                </a>
              </li>
              <li>
                <a
                  href="tel:+551140004000"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4 text-primary/70 shrink-0" />
                  +55 11 4000-4000
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary/70 shrink-0 mt-0.5" />
                São Paulo, SP — Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} InBoat. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="/termos-de-uso" className="hover:text-foreground transition-colors">
              Termos de Uso
            </Link>
            <span className="text-border">|</span>
            <Link href="/politica-de-privacidade" className="hover:text-foreground transition-colors">
              Política de Privacidade
            </Link>
            <span className="text-border">|</span>
            <Link href="/admin" className="hover:text-foreground transition-colors opacity-30 hover:opacity-70">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
