"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Pencil, Trash2, X, Check, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { createBlogCategoria, updateBlogCategoria, deleteBlogCategoria } from "@/lib/actions"

function slugify(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim()
}

export default function AdminBlogCategoriasPage() {
  const [categorias, setCategorias] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ nome: "", slug: "", descricao: "" })

  useEffect(() => {
    fetch("/api/blog/categorias").then(r => r.json()).then(d => { setCategorias(d); setLoading(false) })
  }, [])

  const resetForm = () => { setForm({ nome: "", slug: "", descricao: "" }); setEditingId(null); setShowForm(false) }

  async function handleSave() {
    setSaving(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (editingId) {
        await updateBlogCategoria(editingId, fd)
        setCategorias(prev => prev.map(c => c.id === editingId ? { ...c, ...form } : c))
      } else {
        await createBlogCategoria(fd)
        const res = await fetch("/api/blog/categorias")
        setCategorias(await res.json())
      }
      resetForm()
    } catch (e: any) {
      alert("Erro: " + e.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir esta categoria? Os artigos vinculados ficarão sem categoria.")) return
    await deleteBlogCategoria(id)
    setCategorias(prev => prev.filter(c => c.id !== id))
  }

  function startEdit(cat: any) {
    setForm({ nome: cat.nome, slug: cat.slug, descricao: cat.descricao ?? "" })
    setEditingId(cat.id)
    setShowForm(true)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/blog"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Categorias do Blog</h1>
          <p className="text-sm text-muted-foreground">Organize o conteúdo por categorias</p>
        </div>
        <Button size="sm" className="ml-auto text-white" style={{ background: "linear-gradient(135deg, #0c5280, #1e88c8)" }}
          onClick={() => { resetForm(); setShowForm(true) }}>
          <Plus className="h-4 w-4 mr-1" />Nova Categoria
        </Button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <h3 className="font-semibold text-sm text-foreground">{editingId ? "Editar Categoria" : "Nova Categoria"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input value={form.nome} onChange={e => setForm(p => ({ ...p, nome: e.target.value, slug: slugify(e.target.value) }))} placeholder="Multipropriedade Náutica" />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} placeholder="multipropriedade-nautica" className="font-mono text-sm" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea value={form.descricao} onChange={e => setForm(p => ({ ...p, descricao: e.target.value }))} placeholder="Breve descrição desta categoria" rows={2} />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={resetForm}><X className="h-4 w-4 mr-1" />Cancelar</Button>
            <Button size="sm" onClick={handleSave} disabled={saving || !form.nome || !form.slug}
              className="text-white" style={{ background: "linear-gradient(135deg, #0c5280, #1e88c8)" }}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Check className="h-4 w-4 mr-1" />}
              Salvar
            </Button>
          </div>
        </div>
      )}

      {/* Lista */}
      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-14 rounded-lg bg-muted animate-pulse" />)}</div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          {categorias.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground text-sm">Nenhuma categoria cadastrada.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Nome</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Slug</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {categorias.map((cat: any) => (
                  <tr key={cat.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{cat.nome}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground font-mono text-xs">{cat.slug}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(cat)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(cat.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}
