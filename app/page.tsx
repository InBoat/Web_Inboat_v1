import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Anchor, DollarSign, Shield, Users, Wrench, HeartHandshake, MapPin } from "lucide-react"
import Image from "next/image"
import { getActiveBoats, siteContent } from "@/lib/data"

export default function HomePage() {
  const boats = getActiveBoats()
  const { hero, howItWorks } = siteContent

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-speedboat.jpg"
              alt="Lancha de luxo navegando em mar aberto"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                {hero.headline}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
                {hero.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link href="/embarcacoes">{hero.cta}</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent" asChild>
                  <Link href="/como-funciona">Como Funciona</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                {howItWorks.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
                {howItWorks.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {howItWorks.benefits.map((benefit, index) => {
                const icons = [DollarSign, HeartHandshake, Wrench, Shield]
                const Icon = icons[index]
                return (
                  <Card key={index} className="border-border hover:border-primary/50 transition-colors text-center">
                    <CardContent className="pt-6">
                      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Boats Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Anchor className="h-4 w-4" />
                <span>Nossa Frota</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Embarcações Disponíveis
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Conheça nossas lanchas de alto padrão disponíveis para multipropriedade.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {boats.slice(0, 3).map((boat) => (
                <Card key={boat.id} className="overflow-hidden border-border hover:border-primary/50 transition-all">
                  <div className="relative h-64 bg-muted">
                    <Image
                      src={boat.images?.[0] || "/placeholder.svg?height=400&width=600&query=luxury+speedboat+ocean"}
                      alt={boat.name}
                      fill
                      className="object-cover"
                    />
                    {boat.available_shares > 0 && (
                      <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                        {boat.available_shares} cotas disponíveis
                      </Badge>
                    )}
                  </div>

                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{boat.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {boat.manufacturer} - {boat.year}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{boat.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>Capacidade: {boat.capacity} pessoas</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Valor total</span>
                        <span className="font-semibold text-foreground">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                            minimumFractionDigits: 0,
                          }).format(boat.total_price)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Cotas disponíveis</span>
                        <span className="font-semibold text-primary">{boat.available_shares} de {boat.total_shares}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href={`/embarcacoes/${boat.id}`}>Ver detalhes</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button size="lg" variant="outline" className="bg-transparent" asChild>
                <Link href="/embarcacoes">Ver todas as embarcações</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Pronto para navegar com economia e tranquilidade?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90 text-pretty">
              Entre em contato conosco e descubra como a multipropriedade pode transformar sua experiência náutica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/embarcacoes">Ver Embarcações</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link href="/contato">Fale Conosco</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
