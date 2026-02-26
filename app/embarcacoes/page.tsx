import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { getEmbarcacoesAtivas } from "@/lib/actions"
import Link from "next/link"
import Image from "next/image"
import { Anchor, MapPin, Users, ArrowRight } from "lucide-react"

export default async function BoatsPage() {
  const embarcacoes = await getEmbarcacoesAtivas()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-20 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium tracking-widest uppercase mb-6">
                <Anchor className="h-3 w-3" />
                <span>Nossa Frota</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance leading-tight">
                Embarcações Disponíveis
              </h1>
              <p className="text-muted-foreground leading-relaxed text-pretty text-base md:text-lg">
                Explore nossa seleção de lanchas de alto padrão, cada uma cuidadosamente mantida para proporcionar a melhor experiência náutica.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            {embarcacoes.length === 0 ? (
              <div className="text-center py-20">
                <Anchor className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">Nenhuma embarcação disponível no momento.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {embarcacoes.map((boat: any) => (
                  <Link
                    key={boat.id}
                    href={`/embarcacoes/${boat.id}`}
                    className="group block bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all"
                  >
                    <div className="relative h-60 bg-muted overflow-hidden">
                      <Image
                        src={boat.imagens?.[0] || "/placeholder.svg?height=400&width=600"}
                        alt={boat.nome}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                      {boat.destaque && (
                        <Badge className="absolute top-4 right-4 bg-primary/90 text-primary-foreground text-xs font-semibold border-0">
                          Destaque
                        </Badge>
                      )}
                      <div className="absolute bottom-4 left-4">
                        <p className="font-serif text-xl font-bold text-foreground">{boat.nome}</p>
                        <p className="text-xs text-foreground/70">{boat.tipo}</p>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-5">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {boat.localizacao}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" />
                          {boat.capacidade} pessoas
                        </span>
                        {boat.comprimento && (
                          <span className="flex items-center gap-1.5">
                            <Anchor className="h-3.5 w-3.5" />
                            {boat.comprimento}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Valor por cota</p>
                          <p className="font-serif text-xl font-bold text-primary">
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                              minimumFractionDigits: 0,
                            }).format(boat.preco_mensal)}
                          </p>
                        </div>
                        <div className="h-9 w-9 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
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
