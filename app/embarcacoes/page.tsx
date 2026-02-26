import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getActiveBoats } from "@/lib/data"
import Link from "next/link"
import Image from "next/image"
import { Anchor, MapPin, Users } from "lucide-react"

export default function BoatsPage() {
  const boats = getActiveBoats()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Anchor className="h-4 w-4" />
                <span>Nossa Frota</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Embarcações Disponíveis
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Explore nossa seleção de lanchas de alto padrão. Cada embarcação é cuidadosamente 
                mantida para proporcionar a melhor experiência náutica com gestão profissional completa.
              </p>
            </div>
          </div>
        </section>

        {/* Boats Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {boats.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhuma embarcação disponível no momento.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {boats.map((boat) => (
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
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Anchor className="h-4 w-4" />
                          <span>{boat.length_meters}m de comprimento</span>
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
                          <span className="text-sm text-muted-foreground">Total de cotas</span>
                          <span className="font-semibold text-foreground">{boat.total_shares}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Cotas disponíveis</span>
                          <span className="font-semibold text-primary">{boat.available_shares}</span>
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
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
