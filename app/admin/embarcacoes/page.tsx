"use client"

import { useState, useEffect, useTransition } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Ship, Plus, Edit, Trash2, Eye, X, ImagePlus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { getEmbarcacoes, createEmbarcacao, updateEmbarcacao, deleteEmbarcacao } from "@/lib/actions"

type Embarcacao = {
  id: string
  nome: string
  descricao: string | null
  tipo: string
  capacidade: number
  comprimento: string | null
  motor: string | null
  velocidade_max: string | null
  localizacao: string
  preco_mensal: number
  preco_anual: number | null
  disponivel: boolean
  destaque: boolean
  imagens: string[]
  caracteristicas: string[]
}

export default function AdminEmbarcacoesPage() {
  const [embarcacoes, setEmbarcacoes] = useState<Embarcacao[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Embarcacao | null>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [caracteristica, setCaracteristica] = useState("")
  const [imagens, setImagens] = useState<string[]>([])
  const [caracteristicas, setCaracteristicas] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 }).format(value)

  async function loadEmbarcacoes() {
    try {
      const data = await getEmbarcacoes()
      setEmbarcacoes(data as Embarcacao[])
    } catch {
      // silencioso
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadEmbarcacoes() }, [])

  function openNew() {
    setEditingItem(null)
    setImagens([])
    setCaracteristicas([])
    setImageUrl("")
    setCaracteristica("")
    setDialogOpen(true)
  }

  function openEdit(item: Embarcacao) {
    setEditingItem(item)
    setImagens([...item.imagens])
    setCaracteristicas([...item.caracteristicas])
    setImageUrl("")
    setCaracteristica("")
    setDialogOpen(true)
  }

  function closeDialog() {
    setDialogOpen(false)
    setEditingItem(null)
    setImagens([])
    setCaracteristicas([])
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    fd.set("imagens", imagens.join("\n"))
    fd.set("caracteristicas", caracteristicas.join("\n"))

    startTransition(async () => {
      try {
        if (editingItem) {
          await updateEmbarcacao(editingItem.id, fd)
        } else {
          await createEmbarcacao(fd)
        }
        closeDialog()
        await loadEmbarcacoes()
      } catch (err) {
        alert("Erro ao salvar embarcação. Tente novamente.")
      }
    })
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta embarcação? Esta ação não pode ser desfeita.")) return
    startTransition(async () => {
      try {
        await deleteEmbarcacao(id)
        await loadEmbarcacoes()
      } catch {
        alert("Erro ao excluir embarcação.")
      }
    })
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Embarcações</h1>
          <p className="text-muted-foreground">
            {embarcacoes.length} embarcação{embarcacoes.length !== 1 ? "ões" : ""} cadastrada{embarcacoes.length !== 1 ? "s" : ""}
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) closeDialog(); else setDialogOpen(true) }}>
          <DialogTrigger asChild>
            <Button size="lg" onClick={openNew}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Embarcação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {editingItem ? `Editar: ${editingItem.nome}` : "Cadastrar Nova Embarcação"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              {/* Identificação */}
              <div>
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 border-b border-border pb-2">Identificação</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="nome">Nome *</Label>
                    <Input id="nome" name="nome" defaultValue={editingItem?.nome} placeholder="Ex: Triton 380 HT" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo *</Label>
                    <Select name="tipo" defaultValue={editingItem?.tipo ?? "lancha"}>
                      <SelectTrigger id="tipo"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lancha">Lancha</SelectItem>
                        <SelectItem value="iate">Iate</SelectItem>
                        <SelectItem value="veleiro">Veleiro</SelectItem>
                        <SelectItem value="catamaras">Catamarã</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="localizacao">Localização *</Label>
                    <Input id="localizacao" name="localizacao" defaultValue={editingItem?.localizacao} placeholder="Ex: Angra dos Reis, RJ" required />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea id="descricao" name="descricao" defaultValue={editingItem?.descricao ?? ""} placeholder="Descreva a embarcação..." rows={3} />
                  </div>
                </div>
              </div>

              {/* Especificações */}
              <div>
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 border-b border-border pb-2">Especificações</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacidade">Capacidade (pessoas) *</Label>
                    <Input id="capacidade" name="capacidade" type="number" defaultValue={editingItem?.capacidade ?? 10} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comprimento">Comprimento</Label>
                    <Input id="comprimento" name="comprimento" defaultValue={editingItem?.comprimento ?? ""} placeholder="Ex: 11,6m" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="velocidade_max">Velocidade Máxima</Label>
                    <Input id="velocidade_max" name="velocidade_max" defaultValue={editingItem?.velocidade_max ?? ""} placeholder="Ex: 45 nós" />
                  </div>
                  <div className="space-y-2 sm:col-span-3">
                    <Label htmlFor="motor">Motor(es)</Label>
                    <Input id="motor" name="motor" defaultValue={editingItem?.motor ?? ""} placeholder="Ex: 2x Mercury Verado 300HP" />
                  </div>
                </div>
              </div>

              {/* Valores */}
              <div>
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 border-b border-border pb-2">Valores</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preco_mensal">Preço Mensal (R$) *</Label>
                    <Input id="preco_mensal" name="preco_mensal" type="number" defaultValue={editingItem?.preco_mensal} placeholder="Ex: 2500" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preco_anual">Preço Anual (R$)</Label>
                    <Input id="preco_anual" name="preco_anual" type="number" defaultValue={editingItem?.preco_anual ?? ""} placeholder="Ex: 25000" />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 border-b border-border pb-2">Configurações</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="disponivel">Disponível</Label>
                    <Select name="disponivel" defaultValue={editingItem ? String(editingItem.disponivel) : "true"}>
                      <SelectTrigger id="disponivel"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Sim</SelectItem>
                        <SelectItem value="false">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destaque">Destaque na Home</Label>
                    <Select name="destaque" defaultValue={editingItem ? String(editingItem.destaque) : "false"}>
                      <SelectTrigger id="destaque"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Sim</SelectItem>
                        <SelectItem value="false">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Imagens */}
              <div>
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 border-b border-border pb-2">Imagens</h3>
                <div className="flex gap-2 mb-3">
                  <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="URL da imagem" className="flex-1" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (imageUrl.trim()) { setImagens([...imagens, imageUrl.trim()]); setImageUrl("") }}}} />
                  <Button type="button" variant="outline" className="bg-transparent" onClick={() => { if (imageUrl.trim()) { setImagens([...imagens, imageUrl.trim()]); setImageUrl("") }}}>
                    <ImagePlus className="h-4 w-4" />
                  </Button>
                </div>
                {imagens.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {imagens.map((img, i) => (
                      <div key={i} className="relative group rounded-lg overflow-hidden border border-border bg-muted aspect-video">
                        <Image src={img} alt={`Imagem ${i + 1}`} fill className="object-cover" />
                        {i === 0 && <span className="absolute top-1 left-1 text-[10px] font-medium bg-primary text-primary-foreground px-1.5 py-0.5 rounded">Capa</span>}
                        <button type="button" onClick={() => setImagens(imagens.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Características */}
              <div>
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 border-b border-border pb-2">Características</h3>
                <div className="flex gap-2 mb-3">
                  <Input value={caracteristica} onChange={(e) => setCaracteristica(e.target.value)} placeholder="Ex: Ar-condicionado, GPS..." className="flex-1" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (caracteristica.trim()) { setCaracteristicas([...caracteristicas, caracteristica.trim()]); setCaracteristica("") }}}} />
                  <Button type="button" variant="outline" className="bg-transparent" onClick={() => { if (caracteristica.trim()) { setCaracteristicas([...caracteristicas, caracteristica.trim()]); setCaracteristica("") }}}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {caracteristicas.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {caracteristicas.map((c, i) => (
                      <Badge key={i} variant="secondary" className="gap-1">
                        {c}
                        <button type="button" onClick={() => setCaracteristicas(caracteristicas.filter((_, idx) => idx !== i))} className="ml-1 hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={closeDialog}>Cancelar</Button>
                <Button type="submit" className="flex-1" disabled={isPending}>
                  {isPending ? "Salvando..." : editingItem ? "Salvar Alterações" : "Cadastrar Embarcação"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Carregando embarcações...</div>
      ) : embarcacoes.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Ship className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-30" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma embarcação cadastrada</h3>
            <p className="text-muted-foreground mb-6">Comece adicionando sua primeira embarcação ao catálogo.</p>
            <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" />Cadastrar Primeira Embarcação</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {embarcacoes.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                <div className="relative h-20 w-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={item.imagens?.[0] || "/placeholder.svg?height=80&width=128"}
                    alt={item.nome}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-foreground truncate">{item.nome}</h3>
                    <Badge variant={item.disponivel ? "default" : "secondary"} className="text-xs shrink-0">
                      {item.disponivel ? "Disponível" : "Indisponível"}
                    </Badge>
                    {item.destaque && <Badge className="text-xs shrink-0 bg-amber-500/20 text-amber-600 border-amber-500/30">Destaque</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.localizacao} · {item.capacidade} pessoas · {item.tipo}</p>
                  <p className="text-sm font-semibold text-primary mt-1">{formatCurrency(item.preco_mensal)}/mês</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/embarcacoes/${item.id}`} target="_blank" aria-label="Ver no site">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openEdit(item)} aria-label="Editar">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(item.id)} aria-label="Excluir" disabled={isPending}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
