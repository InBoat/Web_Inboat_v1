"use client"

import { useState, useEffect, useTransition } from "react"
import { FileText, Save, Eye, ScrollText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { upsertPaginaLegal } from "@/lib/actions"

type PaginaLegal = {
  slug: string
  titulo: string
  conteudo: string
  ultima_atualizacao: string
}

const PAGINAS = [
  { slug: "termos-de-uso", label: "Termos de Uso", url: "/termos-de-uso" },
  { slug: "politica-de-privacidade", label: "Política de Privacidade", url: "/politica-de-privacidade" },
]

function EditorPagina({ slug, label, url }: { slug: string; label: string; url: string }) {
  const [titulo, setTitulo] = useState("")
  const [conteudo, setConteudo] = useState("")
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState("")
  const [preview, setPreview] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [sucesso, setSucesso] = useState(false)
  const [erro, setErro] = useState("")
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    setCarregando(true)
    fetch(`/api/paginas-legais/${slug}`)
      .then((r) => r.json())
      .then((data: PaginaLegal | null) => {
        if (data) {
          setTitulo(data.titulo)
          setConteudo(data.conteudo)
          setUltimaAtualizacao(data.ultima_atualizacao)
        } else {
          setTitulo(label)
          setConteudo("")
          setUltimaAtualizacao(
            new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(new Date())
          )
        }
      })
      .catch(() => {})
      .finally(() => setCarregando(false))
  }, [slug, label])

  function handleSalvar() {
    setErro("")
    setSucesso(false)
    const formData = new FormData()
    formData.set("titulo", titulo)
    formData.set("conteudo", conteudo)
    formData.set("ultima_atualizacao", ultimaAtualizacao)
    startTransition(async () => {
      try {
        await upsertPaginaLegal(slug, formData)
        setSucesso(true)
        setTimeout(() => setSucesso(false), 3000)
      } catch (e: unknown) {
        setErro(e instanceof Error ? e.message : "Erro ao salvar.")
      }
    })
  }

  if (carregando) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Carregando...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{label}</h2>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline flex items-center gap-1 mt-1"
          >
            <Eye className="h-3 w-3" />
            Ver página pública
          </a>
        </div>
        <div className="flex items-center gap-3">
          {sucesso && (
            <span className="text-sm text-green-500 font-medium">Salvo com sucesso!</span>
          )}
          {erro && (
            <span className="text-sm text-destructive font-medium">{erro}</span>
          )}
          <Button variant="outline" size="sm" onClick={() => setPreview(!preview)}>
            <Eye className="h-4 w-4 mr-2" />
            {preview ? "Editar" : "Preview"}
          </Button>
          <Button size="sm" onClick={handleSalvar} disabled={isPending}>
            <Save className="h-4 w-4 mr-2" />
            {isPending ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`titulo-${slug}`}>Título da Página</Label>
          <Input
            id={`titulo-${slug}`}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`data-${slug}`}>Data de Última Atualização</Label>
          <Input
            id={`data-${slug}`}
            value={ultimaAtualizacao}
            onChange={(e) => setUltimaAtualizacao(e.target.value)}
            placeholder="Ex: Fevereiro de 2026"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`conteudo-${slug}`}>
          Conteúdo{" "}
          <span className="text-muted-foreground font-normal text-xs ml-1">
            (suporta HTML: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, etc.)
          </span>
        </Label>

        {preview ? (
          <div
            className="min-h-96 p-6 border border-border rounded-md bg-background
              [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-6 [&_h2]:mb-2
              [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-3
              [&_ul]:text-muted-foreground [&_ul]:pl-5 [&_ul]:space-y-1
              [&_li]:leading-relaxed [&_strong]:text-foreground"
            dangerouslySetInnerHTML={{ __html: conteudo }}
          />
        ) : (
          <Textarea
            id={`conteudo-${slug}`}
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            rows={28}
            className="font-mono text-sm resize-y"
            placeholder="Digite o conteúdo em HTML. Exemplo:&#10;<h2>1. Introdução</h2>&#10;<p>Bem-vindo aos nossos termos...</p>"
          />
        )}
      </div>
    </div>
  )
}

export default function ConteudoPage() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ScrollText className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Conteúdo Legal</h1>
        </div>
        <p className="text-muted-foreground">
          Edite os Termos de Uso e Política de Privacidade exibidos no site. As alterações são publicadas imediatamente.
        </p>
      </div>

      <Tabs defaultValue="termos-de-uso">
        <TabsList className="mb-6">
          {PAGINAS.map((p) => (
            <TabsTrigger key={p.slug} value={p.slug}>
              {p.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {PAGINAS.map((p) => (
          <TabsContent key={p.slug} value={p.slug}>
            <EditorPagina slug={p.slug} label={p.label} url={p.url} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
