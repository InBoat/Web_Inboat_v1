"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getBoatById, type Boat } from "@/lib/data"
import { notFound, useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Users, Anchor, Gauge, Fuel, MessageCircle, ArrowLeft, Phone } from "lucide-react"
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
  const whatsappMessage = encodeURIComponent(`Olá! Tenho interesse na embarcação ${boat.name}. Gostaria de saber mais informações.`)
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Back Button */}
        <section className="bg-muted/30 py-4">
          <div className="container mx-auto px-4">
            <Button variant="ghost" asChild>
              <Link href="/embarcacoes">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para Embarcações
              </Link>
            </Button>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Main Image */}
              <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden bg-muted">
                <Image
                  src={boat.images?.[selectedImage] || "/placeholder.svg?height=600&width=800&query=luxury+speedboat+ocean+sunset"}
                  alt={boat.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Thumbnails */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[0, 1, 2, 3].map((index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-[115px] lg:h-[115px] rounded-lg overflow-hidden bg-muted border-2 transition-all ${
                        selectedImage === index ? "border-primary" : "border-transparent hover:border-primary/50"
                      }`}
                    >
                      <Image
                        src={boat.images?.[index] || `/placeholder.svg?height=200&width=300&query=speedboat+fishing+${index}`}
                        alt={`${boat.name} - ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Quick Info Card */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Valor do bem</p>
                        <p className="text-3xl font-bold text-foreground">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                            minimumFractionDigits: 0,
                          }).format(boat.total_price)}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-1">Valor por cota</p>
                        <p className="text-2xl font-bold text-primary">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                            minimumFractionDigits: 0,
                          }).format(boat.price_per_share)}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                        <div>
                          <p className="text-sm text-muted-foreground">Total de cotas</p>
                          <p className="font-semibold text-foreground">{boat.total_shares}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Cotas disponíveis</p>
                          <p className="font-semibold text-primary">{boat.available_shares}</p>
                        </div>
                      </div>
                      <Button className="w-full" size="lg" asChild>
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Quero saber mais
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Boat Details */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">{boat.name}</h1>
                      <p className="text-lg text-muted-foreground">
                        {boat.manufacturer} {boat.model} - {boat.year}
                      </p>
                    </div>
                    {boat.available_shares > 0 && (
                      <Badge className="bg-primary text-primary-foreground">
                        {boat.available_shares} cotas disponíveis
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                      <span>{boat.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-5 w-5" />
                      <span>{boat.capacity} pessoas</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Anchor className="h-5 w-5" />
                      <span>{boat.length_meters}m</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold text-foreground mb-3">Descrição</h2>
                  <p className="text-muted-foreground leading-relaxed">{boat.description}</p>
                </div>

                {/* Specifications */}
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Especificações Técnicas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {boat.specifications?.engine && (
                        <div className="flex items-start gap-3">
                          <Gauge className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">Motor</p>
                            <p className="text-sm text-muted-foreground">{boat.specifications.engine}</p>
                          </div>
                        </div>
                      )}
                      {boat.specifications?.motors && (
                        <div className="flex items-start gap-3">
                          <Anchor className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">Quantidade de Motores</p>
                            <p className="text-sm text-muted-foreground">{boat.specifications.motors}</p>
                          </div>
                        </div>
                      )}
                      {boat.specifications?.fuel && (
                        <div className="flex items-start gap-3">
                          <Fuel className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">Combustível</p>
                            <p className="text-sm text-muted-foreground">{boat.specifications.fuel}</p>
                          </div>
                        </div>
                      )}
                      {boat.specifications?.cruising_speed && (
                        <div className="flex items-start gap-3">
                          <Gauge className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">Velocidade de Cruzeiro</p>
                            <p className="text-sm text-muted-foreground">{boat.specifications.cruising_speed}</p>
                          </div>
                        </div>
                      )}
                      {boat.specifications?.max_speed && (
                        <div className="flex items-start gap-3">
                          <Gauge className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">Velocidade Máxima</p>
                            <p className="text-sm text-muted-foreground">{boat.specifications.max_speed}</p>
                          </div>
                        </div>
                      )}
                      {boat.specifications?.fuel_capacity && (
                        <div className="flex items-start gap-3">
                          <Fuel className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">Capacidade de Combustível</p>
                            <p className="text-sm text-muted-foreground">{boat.specifications.fuel_capacity}</p>
                          </div>
                        </div>
                      )}
                      {boat.specifications?.water_capacity && (
                        <div className="flex items-start gap-3">
                          <Anchor className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">Capacidade de Água</p>
                            <p className="text-sm text-muted-foreground">{boat.specifications.water_capacity}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - Pricing & CTA */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Investimento por cota</p>
                      <p className="text-4xl font-bold text-primary">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          minimumFractionDigits: 0,
                        }).format(boat.price_per_share)}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-2">Taxa de manutenção mensal</p>
                      <p className="text-2xl font-semibold text-foreground">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          minimumFractionDigits: 0,
                        }).format(boat.monthly_maintenance_fee)}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total de cotas</span>
                        <span className="font-medium text-foreground">{boat.total_shares}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Cotas disponíveis</span>
                        <span className="font-medium text-primary">{boat.available_shares}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Cotas vendidas</span>
                        <span className="font-medium text-foreground">
                          {boat.total_shares - boat.available_shares}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 space-y-3">
                      <Button className="w-full" size="lg" asChild>
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Quero saber mais
                        </a>
                      </Button>
                      <Button className="w-full bg-transparent" size="lg" variant="outline" asChild>
                        <Link href="/contato">
                          <Phone className="h-4 w-4 mr-2" />
                          Entrar em contato
                        </Link>
                      </Button>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Entre em contato com nossa equipe para mais informações sobre disponibilidade e processo de aquisição.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
