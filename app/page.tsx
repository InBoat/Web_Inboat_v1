import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Anchor, DollarSign, Shield, Users, Wrench, HeartHandshake, MapPin, ArrowRight, ChevronRight } from "lucide-react"
import Image from "next/image"
import { getActiveBoats, siteContent } from "@/lib/data"
import { getConfiguracoes } from "@/lib/actions"

export default async function HomePage() {
  const boats = getActiveBoats()
  const { howItWorks } = siteContent
  const configs = await getConfiguracoes().catch(() => ({} as Record<string, string>))

  const heroHeadline = configs.hero_headline || siteContent.hero.headline
  const heroSubheadline = configs.hero_subheadline || siteContent.hero.subheadline
  const heroImagem = configs.hero_imagem || "/hero-speedboat.jpg"
  const heroHeadlineStyle = {
    fontFamily: configs.hero_headline_font || "var(--font-serif)",
    fontSize: configs.hero_headline_size || "clamp(2.5rem, 5vw, 4.5rem)",
    color: configs.hero_headline_color || undefined,
  }
  const heroSubheadlineStyle = {
    fontFamily: configs.hero_subheadline_font || "var(--font-sans)",
    fontSize: configs.hero_subheadline_size || "1.125rem",
    color: configs.hero_subheadline_color || undefined,
  }

  const benefitIcons = [DollarSign, HeartHandshake, Wrench, Shield]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src={heroImagem}
              alt="Lancha de luxo navegando em mar aberto"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium tracking-widest uppercase">
                <Anchor className="h-3 w-3" />
                <span>Multipropriedade Náutica</span>
              </div>

              <h1
                className="font-bold leading-tight text-balance"
                style={heroHeadlineStyle}
              >
                {heroHeadline}
              </h1>

              <p
                className="leading-relaxed text-pretty max-w-xl"
                style={heroSubheadlineStyle}
              >
                {heroSubheadline}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide gap-2"
                  asChild
                >
                  <Link href="/embarcacoes">
                    Ver Embarcações
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-accent hover:text-foreground"
                  asChild
                >
                  <Link href="/como-funciona">Como Funciona</Link>
                </Button>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8 pt-6 border-t border-border/50">
                <div>
                  <p className="font-serif text-3xl font-bold text-primary">85%</p>
                  <p className="text-xs text-muted-foreground tracking-wide uppercase mt-0.5">Economia na aquisição</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-primary">4</p>
                  <p className="text-xs text-muted-foreground tracking-wide uppercase mt-0.5">Embarcações disponíveis</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-primary">24h</p>
                  <p className="text-xs text-muted-foreground tracking-wide uppercase mt-0.5">Sistema de reservas</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works / Benefits Section */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
              <div className="max-w-xl">
                <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Como funciona</p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
                  {howItWorks.title}
                </h2>
              </div>
              <p className="text-muted-foreground max-w-sm leading-relaxed text-pretty text-sm md:text-base">
                {howItWorks.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden">
              {howItWorks.benefits.map((benefit, index) => {
                const Icon = benefitIcons[index]
                return (
                  <div
                    key={index}
                    className="bg-background p-8 flex flex-col gap-4 hover:bg-accent/30 transition-colors group"
                  >
                    <div className="h-10 w-10 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/20 transition-all">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2 text-lg">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/como-funciona"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Entender o modelo completo
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Boats Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Nossa Frota</p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
                  Embarcações Disponíveis
                </h2>
              </div>
              <Button variant="outline" className="border-border text-foreground hover:bg-accent w-fit" asChild>
                <Link href="/embarcacoes" className="gap-2 flex items-center">
                  Ver todas
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {boats.slice(0, 3).map((boat) => (
                <Link
                  key={boat.id}
                  href={`/embarcacoes/${boat.id}`}
                  className="group block bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all"
                >
                  {/* Image */}
                  <div className="relative h-56 bg-muted overflow-hidden">
                    <Image
                      src={boat.images?.[0] || "/placeholder.svg?height=400&width=600&query=luxury+speedboat+ocean"}
                      alt={boat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                    {boat.available_shares > 0 && (
                      <Badge className="absolute top-4 right-4 bg-primary/90 text-primary-foreground text-xs font-semibold tracking-wide border-0">
                        {boat.available_shares} cotas disponíveis
                      </Badge>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <p className="font-serif text-xl font-bold text-foreground">{boat.name}</p>
                      <p className="text-xs text-foreground/70">{boat.manufacturer} — {boat.year}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {boat.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        {boat.capacity} pessoas
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Valor por cota</p>
                        <p className="font-serif text-xl font-bold text-primary">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                            minimumFractionDigits: 0,
                          }).format(boat.price_per_share)}
                        </p>
                      </div>
                      <div className="h-8 w-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-card border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium tracking-widest uppercase">
                <Anchor className="h-3 w-3" />
                <span>Pronto para navegar?</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
                Navegue com economia e tranquilidade
              </h2>
              <p className="text-muted-foreground leading-relaxed text-pretty max-w-2xl mx-auto">
                Entre em contato e descubra como a multipropriedade pode transformar sua experiência náutica. Nossa equipe está pronta para apresentar o modelo e responder todas as suas dúvidas.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2"
                  asChild
                >
                  <Link href="/embarcacoes">
                    Ver Embarcações
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-accent"
                  asChild
                >
                  <Link href="/contato">Fale Conosco</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
