import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getBlogArtigos, getBlogCategorias } from "@/lib/actions"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, User, ArrowRight, BookOpen } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | InBoat — Conteúdo sobre Multipropriedade Náutica",
  description: "Artigos, guias e análises sobre multipropriedade de embarcações, mercado náutico e investimento inteligente.",
}

function formatDate(date: string | null) {
  if (!date) return ""
  return new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
}

export default async function BlogPage() {
  const [artigos, categorias] = await Promise.all([
    getBlogArtigos({ status: "publicado" }),
    getBlogCategorias(),
  ])

  const destaque = artigos.find((a: any) => a.destaque) ?? artigos[0]
  const demais = artigos.filter((a: any) => a.id !== destaque?.id).slice(0, 8)
  const populares = artigos.filter((a: any) => a.popular).slice(0, 4)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b border-border bg-muted/30 py-14">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <Badge className="mb-4 text-white text-xs" style={{ background: "linear-gradient(135deg, #0c5280, #1e88c8)" }}>
              Blog InBoat
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance leading-tight">
              Conteúdo sobre Multipropriedade Náutica
            </h1>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Artigos, guias e análises para quem quer investir no mercado náutico com inteligência.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Categorias */}
          <div className="flex flex-wrap gap-2 mb-12">
            <Link href="/blog">
              <Badge variant="outline" className="cursor-pointer px-4 py-1.5 text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                Todos
              </Badge>
            </Link>
            {categorias.map((cat: any) => (
              <Link key={cat.id} href={`/blog/${cat.slug}`}>
                <Badge variant="outline" className="cursor-pointer px-4 py-1.5 text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                  {cat.nome}
                </Badge>
              </Link>
            ))}
          </div>

          {artigos.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">Nenhum artigo publicado ainda.</p>
              <p className="text-sm mt-1">Em breve traremos conteúdo de qualidade sobre o mercado náutico.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Coluna principal */}
              <div className="lg:col-span-2 space-y-10">
                {/* Artigo destaque */}
                {destaque && (
                  <Link href={`/blog/${destaque.blog_categorias?.slug ?? "geral"}/${destaque.slug}`} className="group block">
                    <article className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                      {destaque.imagem_destaque && (
                        <div className="relative h-72 w-full">
                          <Image src={destaque.imagem_destaque} alt={destaque.titulo} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          {destaque.destaque && (
                            <Badge className="absolute top-4 left-4 text-white text-xs" style={{ background: "linear-gradient(135deg, #0c5280, #1e88c8)" }}>
                              Destaque
                            </Badge>
                          )}
                        </div>
                      )}
                      <div className="p-6">
                        {destaque.blog_categorias && (
                          <Badge variant="secondary" className="mb-3 text-xs">{destaque.blog_categorias.nome}</Badge>
                        )}
                        <h2 className="font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors text-balance leading-snug">
                          {destaque.titulo}
                        </h2>
                        {destaque.resumo && (
                          <p className="mt-3 text-muted-foreground leading-relaxed line-clamp-3">{destaque.resumo}</p>
                        )}
                        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><User className="h-3 w-3" />{destaque.autor}</span>
                          <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{formatDate(destaque.data_publicacao)}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                )}

                {/* Grid de artigos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {demais.map((artigo: any) => (
                    <Link key={artigo.id} href={`/blog/${artigo.blog_categorias?.slug ?? "geral"}/${artigo.slug}`} className="group block">
                      <article className="rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                        {artigo.imagem_destaque ? (
                          <div className="relative h-44 w-full shrink-0">
                            <Image src={artigo.imagem_destaque} alt={artigo.titulo} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        ) : (
                          <div className="h-44 w-full bg-muted flex items-center justify-center shrink-0">
                            <BookOpen className="h-8 w-8 text-muted-foreground/40" />
                          </div>
                        )}
                        <div className="p-5 flex flex-col flex-1">
                          {artigo.blog_categorias && (
                            <Badge variant="secondary" className="mb-2 text-xs w-fit">{artigo.blog_categorias.nome}</Badge>
                          )}
                          <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors text-balance leading-snug flex-1">
                            {artigo.titulo}
                          </h3>
                          {artigo.resumo && (
                            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{artigo.resumo}</p>
                          )}
                          <p className="mt-3 text-xs text-muted-foreground">{formatDate(artigo.data_publicacao)}</p>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="space-y-8">
                {/* Populares */}
                {populares.length > 0 && (
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h3 className="font-serif text-lg font-bold text-foreground mb-4">Mais Populares</h3>
                    <div className="space-y-4">
                      {populares.map((artigo: any, i: number) => (
                        <Link key={artigo.id} href={`/blog/${artigo.blog_categorias?.slug ?? "geral"}/${artigo.slug}`} className="group flex gap-3 items-start">
                          <span className="text-2xl font-bold text-primary/20 font-serif leading-none mt-0.5 w-6 shrink-0">{i + 1}</span>
                          <div>
                            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">{artigo.titulo}</p>
                            <p className="text-xs text-muted-foreground mt-1">{formatDate(artigo.data_publicacao)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categorias sidebar */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-serif text-lg font-bold text-foreground mb-4">Categorias</h3>
                  <div className="space-y-2">
                    {categorias.map((cat: any) => (
                      <Link key={cat.id} href={`/blog/${cat.slug}`} className="flex items-center justify-between group py-1.5 border-b border-border last:border-0">
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{cat.nome}</span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="rounded-xl p-6 text-white" style={{ background: "linear-gradient(135deg, #0c5280 0%, #1e88c8 100%)" }}>
                  <h3 className="font-serif text-lg font-bold mb-2">Conheça a Multipropriedade</h3>
                  <p className="text-sm text-white/80 mb-4 leading-relaxed">Acesso a lanchas premium com até 85% de economia na aquisição.</p>
                  <Button className="w-full bg-white hover:bg-white/90 font-semibold text-sm" style={{ color: "#0c5280" }} asChild>
                    <Link href="/embarcacoes">Ver Embarcações <ArrowRight className="h-4 w-4 ml-1" /></Link>
                  </Button>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
