import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getPaginaLegal } from "@/lib/actions"

export default async function TermosDeUsoPage() {
  const pagina = await getPaginaLegal("termos-de-uso")

  const titulo = pagina?.titulo ?? "Termos de Uso"
  const conteudo = pagina?.conteudo ?? "<p>Conteúdo em breve.</p>"
  const ultimaAtualizacao = pagina?.ultima_atualizacao ?? ""

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">{titulo}</h1>
          {ultimaAtualizacao && (
            <p className="text-foreground font-medium mb-8">Última atualização: {ultimaAtualizacao}</p>
          )}
          <div
            className="space-y-4 text-muted-foreground leading-relaxed
              [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-2
              [&_p]:leading-relaxed
              [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:list-disc
              [&_li]:leading-relaxed
              [&_strong]:text-foreground"
            dangerouslySetInnerHTML={{ __html: conteudo }}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
