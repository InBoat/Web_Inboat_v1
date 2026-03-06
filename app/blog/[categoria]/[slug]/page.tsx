import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getBlogArtigoBySlug, getBlogArtigos } from "@/lib/actions"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, User, ArrowRight, ChevronRight, Tag } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

function formatDate(date: string | null) {
  if (!date) return ""
  return new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
}

export async function generateMetadata({ params }: { params: Promise<{ categoria: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const artigo = await getBlogArtigoBySlug(slug)
  if (!artigo) return { title: "Artigo | Blog InBoat" }
  return {
    title: artigo.meta_titulo ?? `${artigo.titulo} | Blog InBoat`,
    description: artigo.meta_descricao ?? artigo.resumo ?? "",
    openGraph: {
      title: artigo.meta_titulo ?? artigo.titulo,
      description: artigo.meta_descricao ?? artigo.resumo ?? "",
      images: artigo.imagem_destaque ? [artigo.imagem_destaque] : [],
      type: "article",
      publishedTime: artigo.data_publicacao ?? undefined,
      authors: [artigo.autor],
    },
  }
}

export default async function BlogArtigoPage({ params }: { params: Promise<{ categoria: string; slug: string }> }) {
  const { slug } = await params
  const [artigo, relacionados] = await Promise.all([
    getBlogArtigoBySlug(slug),
    getBlogArtigos({ status: "publicado", limit: 3 }),
  ])

  if (!artigo || artigo.status !== "publicado") notFound()

  const artigosRelacionados = relacionados.filter((a: any) => a.id !== artigo.id).slice(0, 3)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-10 max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            {artigo.blog_categorias && (
              <>
                <ChevronRight className="h-3 w-3" />
                <Link href={`/blog/${artigo.blog_categorias.slug}`} className="hover:text-foreground transition-colors">
                  {artigo.blog_categorias.nome}
                </Link>
              </>
            )}
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground truncate max-w-48">{artigo.titulo}</span>
          </div>

          {/* Header do artigo */}
          <article>
            {artigo.blog_categorias && (
              <Badge variant="secondary" className="mb-4 text-xs">{artigo.blog_categorias.nome}</Badge>
            )}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance mb-6">
              {artigo.titulo}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{artigo.autor}</span>
              <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />{formatDate(artigo.data_publicacao)}</span>
              {artigo.tags?.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Tag className="h-4 w-4" />
                  {artigo.tags.map((tag: string) => (
                    <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Imagem destaque */}
            {artigo.imagem_destaque && (
              <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden mb-10">
                <Image src={artigo.imagem_destaque} alt={artigo.titulo} fill className="object-cover" priority />
              </div>
            )}

            {/* Conteúdo */}
            <div
              className="prose prose-lg max-w-none text-foreground
                prose-headings:font-serif prose-headings:text-foreground
                prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                prose-li:marker:text-primary
                prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
                prose-hr:border-border"
              dangerouslySetInnerHTML={{ __html: artigo.conteudo }}
            />

            {/* CTA estratégico */}
            <div className="mt-14 rounded-2xl p-8 text-white text-center" style={{ background: "linear-gradient(135deg, #0c5280 0%, #1e88c8 100%)" }}>
              <h3 className="font-serif text-2xl font-bold mb-2">Pronto para investir de forma inteligente?</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                Acesse lanchas premium com gestão profissional completa e economize até 85% na aquisição.
              </p>
              <Button className="bg-white hover:bg-white/90 font-semibold px-8" style={{ color: "#0c5280" }} asChild>
                <Link href="/embarcacoes">Conhecer Embarcações <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
            </div>
          </article>

          {/* Artigos relacionados */}
          {artigosRelacionados.length > 0 && (
            <section className="mt-16">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Artigos Relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {artigosRelacionados.map((rel: any) => (
                  <Link key={rel.id} href={`/blog/${rel.blog_categorias?.slug ?? "geral"}/${rel.slug}`} className="group block">
                    <article className="rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                      {rel.imagem_destaque ? (
                        <div className="relative h-36 w-full shrink-0">
                          <Image src={rel.imagem_destaque} alt={rel.titulo} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      ) : (
                        <div className="h-36 bg-muted shrink-0" />
                      )}
                      <div className="p-4 flex-1">
                        <p className="text-sm font-semibold font-serif text-foreground group-hover:text-primary transition-colors leading-snug">
                          {rel.titulo}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">{formatDate(rel.data_publicacao)}</p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
