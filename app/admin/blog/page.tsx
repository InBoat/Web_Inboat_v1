"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Pencil, Trash2, Search, Eye, EyeOff, Star } from "lucide-react"
import Link from "next/link"

export default function AdminBlogPage() {
  const [artigos, setArtigos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/blog/artigos")
      .then(r => r.json())
      .then(d => { setArtigos(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = artigos.filter(a =>
    a.titulo.toLowerCase().includes(search.toLowerCase()) ||
    a.autor?.toLowerCase().includes(search.toLowerCase())
  )

  async function handleDelete(id: string) {
    if (!confirm("Excluir este artigo permanentemente?")) return
    try {
      const res = await fetch(`/api/blog/artigos/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Erro ao excluir")
      setArtigos(prev => prev.filter(a => a.id !== id))
    } catch {
      alert("Erro ao excluir artigo")
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Blog</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Gerencie artigos e conteúdo do blog</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/blog/categorias">Categorias</Link>
          </Button>
          <Button size="sm" className="text-white" style={{ background: "linear-gradient(135deg, #0c5280, #1e88c8)" }} asChild>
            <Link href="/admin/blog/novo"><Plus className="h-4 w-4 mr-1" />Novo Artigo</Link>
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar artigo..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-16 rounded-lg bg-muted animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-xl">
          <p className="font-medium">Nenhum artigo encontrado.</p>
          <p className="text-sm mt-1">Crie seu primeiro artigo para começar.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Título</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Categoria</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Autor</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {filtered.map((artigo: any) => (
                <tr key={artigo.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {artigo.destaque && <Star className="h-3 w-3 text-yellow-500 shrink-0" />}
                      <span className="font-medium text-foreground line-clamp-1">{artigo.titulo}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                    {artigo.blog_categorias?.nome ?? "—"}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{artigo.autor}</td>
                  <td className="px-4 py-3">
                    <Badge variant={artigo.status === "publicado" ? "default" : "secondary"} className="text-xs">
                      {artigo.status === "publicado" ? (
                        <><Eye className="h-3 w-3 mr-1" />Publicado</>
                      ) : (
                        <><EyeOff className="h-3 w-3 mr-1" />Rascunho</>
                      )}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/admin/blog/editar/${artigo.id}`}><Pencil className="h-3.5 w-3.5" /></Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(artigo.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
