"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createBlogArtigo, updateBlogArtigo } from "@/lib/actions"
import { Save, Eye, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

interface EditorProps {
  artigo?: any
}

export function BlogEditor({ artigo }: EditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categorias, setCategorias] = useState<any[]>([])
  const [form, setForm] = useState({
    titulo: artigo?.titulo ?? "",
    slug: artigo?.slug ?? "",
    categoria_id: artigo?.categoria_id ?? "",
    imagem_destaque: artigo?.imagem_destaque ?? "",
    conteudo: artigo?.conteudo ?? "",
    resumo: artigo?.resumo ?? "",
    autor: artigo?.autor ?? "Equipe InBoat",
    status: artigo?.status ?? "rascunho",
    destaque: artigo?.destaque ?? false,
    popular: artigo?.popular ?? false,
    recomendado: artigo?.recomendado ?? false,
    tags: artigo?.tags?.join(", ") ?? "",
    meta_titulo: artigo?.meta_titulo ?? "",
    meta_descricao: artigo?.meta_descricao ?? "",
  })

  useEffect(() => {
    fetch("/api/blog/categorias")
      .then(r => r.json())
      .then(setCategorias)
      .catch(() => setCategorias([]))
  }, [])

  const handleChange = (key: string, value: any) => {
    setForm(prev => {
      const updated = { ...prev, [key]: value }
      if (key === "titulo" && !artigo) updated.slug = slugify(value)
      return updated
    })
  }

  async function handleSubmit(status: string) {
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries({ ...form, status }).forEach(([k, v]) => fd.append(k, String(v)))
      if (artigo) {
        await updateBlogArtigo(artigo.id, fd)
      } else {
        await createBlogArtigo(fd)
      }
      router.push("/admin/blog")
      router.refresh()
    } catch (e: any) {
      alert("Erro ao salvar: " + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/blog"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">{artigo ? "Editar Artigo" : "Novo Artigo"}</h1>
            <p className="text-sm text-muted-foreground">
              {form.status === "publicado" ? "Publicado" : "Rascunho"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleSubmit("rascunho")} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}
            Salvar Rascunho
          </Button>
          <Button size="sm" onClick={() => handleSubmit("publicado")} disabled={loading}
            className="text-white" style={{ background: "linear-gradient(135deg, #0c5280, #1e88c8)" }}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4 mr-1" />}
            Publicar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título</Label>
              <Input id="titulo" value={form.titulo} onChange={e => handleChange("titulo", e.target.value)} placeholder="Título do artigo" className="text-lg font-medium" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug da URL</Label>
              <div className="flex gap-2 items-center">
                <span className="text-xs text-muted-foreground shrink-0">/blog/.../</span>
                <Input id="slug" value={form.slug} onChange={e => handleChange("slug", e.target.value)} placeholder="meu-artigo" className="font-mono text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="resumo">Resumo</Label>
              <Textarea id="resumo" value={form.resumo} onChange={e => handleChange("resumo", e.target.value)} placeholder="Breve descrição do artigo (aparece nas listagens)" rows={2} />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 space-y-2">
            <Label htmlFor="conteudo">Conteúdo (HTML)</Label>
            <Textarea
              id="conteudo"
              value={form.conteudo}
              onChange={e => handleChange("conteudo", e.target.value)}
              placeholder="<h2>Introdução</h2><p>Conteúdo do artigo em HTML...</p>"
              rows={20}
              className="font-mono text-sm resize-y"
            />
            <p className="text-xs text-muted-foreground">Suporta HTML completo com H1, H2, H3, listas, negrito, links, etc.</p>
          </div>

          {/* SEO */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <h3 className="font-semibold text-sm text-foreground">SEO</h3>
            <div className="space-y-2">
              <Label htmlFor="meta_titulo">Meta Título</Label>
              <Input id="meta_titulo" value={form.meta_titulo} onChange={e => handleChange("meta_titulo", e.target.value)} placeholder="Título para SEO (deixe vazio para usar o título)" />
              <p className="text-xs text-muted-foreground">{form.meta_titulo.length}/60 caracteres recomendados</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta_descricao">Meta Descrição</Label>
              <Textarea id="meta_descricao" value={form.meta_descricao} onChange={e => handleChange("meta_descricao", e.target.value)} placeholder="Descrição para motores de busca" rows={2} />
              <p className="text-xs text-muted-foreground">{form.meta_descricao.length}/160 caracteres recomendados</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select value={form.categoria_id || "none"} onValueChange={v => handleChange("categoria_id", v === "none" ? "" : v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem categoria</SelectItem>
                  {categorias.map((c: any) => (
                    <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="autor">Autor</Label>
              <Input id="autor" value={form.autor} onChange={e => handleChange("autor", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imagem_destaque">URL da Imagem Destaque</Label>
              <Input id="imagem_destaque" value={form.imagem_destaque} onChange={e => handleChange("imagem_destaque", e.target.value)} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" value={form.tags} onChange={e => handleChange("tags", e.target.value)} placeholder="lancha, multipropriedade, investimento" />
              <p className="text-xs text-muted-foreground">Separe por vírgulas</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <h3 className="font-semibold text-sm text-foreground">Destaques</h3>
            {[
              { key: "destaque", label: "Artigo Destaque", desc: "Aparece em destaque na home do blog" },
              { key: "popular", label: "Popular", desc: "Aparece na seção de populares" },
              { key: "recomendado", label: "Recomendado", desc: "Marcado como recomendado" },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch
                  checked={form[item.key as keyof typeof form] as boolean}
                  onCheckedChange={v => handleChange(item.key, v)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
