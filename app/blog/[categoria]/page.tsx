import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getBlogArtigos, getBlogCategorias } from "@/lib/actions"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, User, BookOpen, ChevronRight } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

function formatDate(date: string | null) {
  if (!date) return ""
  return new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
}

export async function generateMetadata({ params }: { params: Promise<{ categoria: string }> }): Promise<Metadata> {
  const { categoria } = await params
  const categorias = await getBlogCategorias()
  const cat = categorias.find((c: any) => c.slug === categoria)
  return {
    title: cat ? `${cat.nome} | Blog InBoat` : "Categoria | Blog InBoat",
    description: cat?.descricao ?? "Artigos sobre o mercado náutico e multipropriedade de embarcações.",
  }
}

export default async function BlogCategoriaPage({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria: categoriaSlug } = await params
  const [categorias, artigos] = await Promise.all([
    getBlogCategorias(),
    getBlogArtigos({ status: "publicado", categoria_slug: categoriaSlug }),
  ])

  const categoria = categorias.find((c: any) => c.slug === categoriaSlug)
  if (!categoria) notFound()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Header da categoria */}
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground">{categoria.nome}</span>
            </div>
            <Badge className="mb-3 text-white text-xs" style={{ background: "linear-gradient(135deg, #0c5280, #1e88c8)" }}>
              Categoria
            </Badge>
            <h1 className="font-serif text-4xl font-bold text-foreground text-balance">{categoria.nome}</h1>
            {categoria.descricao && (
              <p className="mt-3 text-muted-foreground text-lg">{categoria.descricao}</p>
            )}
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Filtro de categorias */}
          <div className="flex flex-wrap gap-2 mb-10">
            <Link href="/blog">
              <Badge variant="outline" className="cursor-pointer px-4 py-1.5 text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                Todos
              </Badge>
            </Link>
            {categorias.map((cat: any) => (
              <Link key={cat.id} href={`/blog/${cat.slug}`}>
                <Badge
                  variant={cat.slug === categoriaSlug ? "default" : "outline"}
                  className="cursor-pointer px-4 py-1.5 text-sm transition-colors"
                  style={cat.slug === categoriaSlug ? { background: "linear-gradient(135deg, #0c5280, #1e88c8)", color: "white" } : {}}
                >
                  {cat.nome}
                </Badge>
              </Link>
            ))}
          </div>

          {artigos.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">Nenhum artigo publicado nesta categoria.</p>
              <p className="text-sm mt-1">Em breve traremos novos conteúdos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {artigos.map((artigo: any) => (
                <Link key={artigo.id} href={`/blog/${categoriaSlug}/${artigo.slug}`} className="group block">
                  <article className="rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                    {artigo.imagem_destaque ? (
                      <div className="relative h-48 w-full shrink-0">
                        <Image src={artigo.imagem_destaque} alt={artigo.titulo} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    ) : (
                      <div className="h-48 w-full bg-muted flex items-center justify-center shrink-0">
                        <BookOpen className="h-8 w-8 text-muted-foreground/40" />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      <h2 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors text-balance leading-snug flex-1">
                        {artigo.titulo}
                      </h2>
                      {artigo.resumo && (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{artigo.resumo}</p>
                      )}
                      <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><User className="h-3 w-3" />{artigo.autor}</span>
                        <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{formatDate(artigo.data_publicacao)}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
