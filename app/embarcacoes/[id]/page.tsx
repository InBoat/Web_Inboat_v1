import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getEmbarcacaoById } from "@/lib/actions"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Users, Anchor, Gauge, Fuel, MessageCircle, ArrowLeft, Phone, ChevronRight } from "lucide-react"
import { GalleryClient } from "./gallery-client"

export default async function BoatDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const boat = await getEmbarcacaoById(id)

  if (!boat) notFound()

  const whatsappNumber = "5511999999999"
  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse na embarcação ${boat.nome}. Gostaria de saber mais informações.`
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  const specsMap = [
    { label: "Motor", value: boat.motor, Icon: Gauge },
    { label: "Velocidade Máxima", value: boat.velocidade_max, Icon: Gauge },
    { label: "Comprimento", value: boat.comprimento, Icon: Anchor },
    { label: "Capacidade", value: boat.capacidade ? `${boat.capacidade} pessoas` : null, Icon: Users },
  ].filter((s) => s.value)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-card border-b border-border py-3">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link href="/embarcacoes" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" />
                Embarcações
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground">{boat.nome}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left */}
            <div className="lg:col-span-2 space-y-8">

              {/* Gallery */}
              <GalleryClient images={boat.imagens ?? []} nome={boat.nome} destaque={boat.destaque} />

              {/* Quick tags */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {boat.localizacao}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  {boat.capacidade} pessoas
                </span>
                {boat.comprimento && (
                  <span className="flex items-center gap-2">
                    <Anchor className="h-4 w-4 text-primary" />
                    {boat.comprimento}
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Sobre a embarcação</h2>
                <p className="text-muted-foreground leading-relaxed">{boat.descricao}</p>
              </div>

              {/* Characteristics */}
              {boat.caracteristicas?.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Características</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {boat.caracteristicas.map((c: string) => (
                      <li key={c} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications */}
              {specsMap.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Especificações Técnicas</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
                    {specsMap.map(({ label, value, Icon }) => (
                      <div key={label} className="bg-card px-5 py-4 flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                          <p className="text-sm font-medium text-foreground">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Pricing Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 bg-card border border-border rounded-lg overflow-hidden">
                <div className="bg-primary/10 border-b border-border px-6 py-5">
                  <p className="text-xs text-muted-foreground mb-1">Investimento por cota</p>
                  <p className="font-serif text-4xl font-bold text-primary">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      minimumFractionDigits: 0,
                    }).format(boat.preco_mensal)}
                  </p>
                </div>

                <div className="p-6 space-y-5">
                  {boat.preco_anual && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Valor total da embarcação</p>
                      <p className="font-semibold text-foreground text-sm">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          minimumFractionDigits: 0,
                        }).format(boat.preco_anual)}
                      </p>
                    </div>
                  )}

                  <div className="space-y-3 pt-2 border-t border-border">
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2"
                      size="lg"
                      asChild
                    >
                      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4" />
                        Quero saber mais
                      </a>
                    </Button>
                    <Button
                      className="w-full border-border text-foreground hover:bg-accent"
                      size="lg"
                      variant="outline"
                      asChild
                    >
                      <Link href="/contato">
                        <Phone className="h-4 w-4 mr-2" />
                        Entrar em contato
                      </Link>
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed text-center pt-2">
                    Entre em contato com nossa equipe para mais informações sobre disponibilidade e processo de aquisição.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
