"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getBoatById } from "@/lib/data"
import { notFound, useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Users, Anchor, Gauge, Fuel, MessageCircle, ArrowLeft, Phone, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function BoatDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const boat = getBoatById(id)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!boat) {
    notFound()
  }

  const whatsappNumber = "5511999999999"
  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse na embarcação ${boat.name}. Gostaria de saber mais informações.`
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  const specsMap = [
    { label: "Motor", value: boat.specifications?.engine, Icon: Gauge },
    { label: "Qtd. de Motores", value: boat.specifications?.motors, Icon: Anchor },
    { label: "Combustível", value: boat.specifications?.fuel, Icon: Fuel },
    { label: "Veloc. de Cruzeiro", value: boat.specifications?.cruising_speed, Icon: Gauge },
    { label: "Velocidade Máxima", value: boat.specifications?.max_speed, Icon: Gauge },
    { label: "Cap. Combustível", value: boat.specifications?.fuel_capacity, Icon: Fuel },
    { label: "Cap. de Água", value: boat.specifications?.water_capacity, Icon: Anchor },
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
              <span className="text-foreground">{boat.name}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Images + Details */}
            <div className="lg:col-span-2 space-y-8">

              {/* Gallery */}
              <div className="space-y-3">
                {/* Main Image */}
                <div className="relative h-[380px] md:h-[460px] rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={boat.images?.[selectedImage] || "/placeholder.svg?height=600&width=800&query=luxury+speedboat+ocean+sunset"}
                    alt={boat.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
                        {boat.name}
                      </h1>
                      <p className="text-sm text-foreground/70 mt-1">
                        {boat.manufacturer} {boat.model} — {boat.year}
                      </p>
                    </div>
                    {boat.available_shares > 0 && (
                      <Badge className="bg-primary/90 text-primary-foreground text-xs font-semibold border-0">
                        {boat.available_shares} cotas disponíveis
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-3">
                  {[0, 1, 2, 3].map((index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 rounded overflow-hidden bg-muted border-2 transition-all ${
                        selectedImage === index
                          ? "border-primary"
                          : "border-transparent hover:border-border"
                      }`}
                    >
                      <Image
                        src={boat.images?.[index] || `/placeholder.svg?height=200&width=300&query=speedboat+${index}`}
                        alt={`${boat.name} - foto ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick tags */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {boat.location}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  {boat.capacity} pessoas
                </span>
                <span className="flex items-center gap-2">
                  <Anchor className="h-4 w-4 text-primary" />
                  {boat.length_meters}m de comprimento
                </span>
              </div>

              {/* Description */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Sobre a embarcação</h2>
                <p className="text-muted-foreground leading-relaxed">{boat.description}</p>
              </div>

              {/* Specifications */}
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
            </div>

            {/* Right: Pricing Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 bg-card border border-border rounded-lg overflow-hidden">
                {/* Price header */}
                <div className="bg-primary/10 border-b border-border px-6 py-5">
                  <p className="text-xs text-muted-foreground mb-1">Investimento por cota</p>
                  <p className="font-serif text-4xl font-bold text-primary">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      minimumFractionDigits: 0,
                    }).format(boat.price_per_share)}
                  </p>
                </div>

                <div className="p-6 space-y-5">
                  {/* Monthly fee */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Taxa mensal de manutenção</p>
                    <p className="font-semibold text-foreground text-sm">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 0,
                      }).format(boat.monthly_maintenance_fee)}
                    </p>
                  </div>

                  {/* Shares info */}
                  <div className="space-y-3 py-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total de cotas</span>
                      <span className="font-medium text-foreground">{boat.total_shares}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Cotas disponíveis</span>
                      <span className="font-semibold text-primary">{boat.available_shares}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Cotas vendidas</span>
                      <span className="font-medium text-foreground">
                        {boat.total_shares - boat.available_shares}
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="pt-1">
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${(boat.available_shares / boat.total_shares) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3 pt-1">
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
