"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Ship, Plus, Edit, Trash2, Eye, X, ImagePlus, GripVertical, ChevronDown, ChevronUp } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { boats as initialBoats, type Boat } from "@/lib/data"

const emptyForm = {
  name: "",
  model: "",
  manufacturer: "",
  year: new Date().getFullYear(),
  length_meters: 0,
  capacity: 0,
  location: "",
  description: "",
  total_shares: 4,
  available_shares: 4,
  price_per_share: 0,
  total_price: 0,
  monthly_maintenance_fee: 0,
  status: "active" as "active" | "inactive",
  engine: "",
  fuel: "Gasolina",
  cruising_speed: "",
  max_speed: "",
  fuel_capacity: "",
  water_capacity: "",
  motors: "",
  images: [] as string[],
}

export default function AdminBoatsPage() {
  const [boats, setBoats] = useState<Boat[]>(initialBoats)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingBoat, setEditingBoat] = useState<Boat | null>(null)
  const [formData, setFormData] = useState({ ...emptyForm })
  const [expandedBoat, setExpandedBoat] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState("")

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 }).format(value)

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setFormData({ ...formData, images: [...formData.images, imageUrl.trim()] })
      setImageUrl("")
    }
  }

  const handleRemoveImage = (index: number) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const boatData: Boat = {
      id: editingBoat?.id || String(Date.now()),
      name: formData.name,
      model: formData.model,
      manufacturer: formData.manufacturer,
      year: formData.year,
      length_meters: formData.length_meters,
      capacity: formData.capacity,
      location: formData.location,
      description: formData.description,
      total_shares: formData.total_shares,
      available_shares: formData.available_shares,
      price_per_share: formData.price_per_share,
      total_price: formData.price_per_share * formData.total_shares,
      monthly_maintenance_fee: formData.monthly_maintenance_fee,
      status: formData.status,
      specifications: {
        engine: formData.engine,
        fuel: formData.fuel,
        cruising_speed: formData.cruising_speed,
        max_speed: formData.max_speed,
        fuel_capacity: formData.fuel_capacity,
        water_capacity: formData.water_capacity,
        motors: formData.motors,
      },
      images: formData.images.length > 0 ? formData.images : editingBoat?.images || [],
    }

    if (editingBoat) {
      setBoats(boats.map((b) => (b.id === editingBoat.id ? boatData : b)))
    } else {
      setBoats([...boats, boatData])
    }

    closeDialog()
  }

  const handleEdit = (boat: Boat) => {
    setEditingBoat(boat)
    setFormData({
      name: boat.name,
      model: boat.model,
      manufacturer: boat.manufacturer,
      year: boat.year,
      length_meters: boat.length_meters,
      capacity: boat.capacity,
      location: boat.location,
      description: boat.description,
      total_shares: boat.total_shares,
      available_shares: boat.available_shares,
      price_per_share: boat.price_per_share,
      total_price: boat.total_price,
      monthly_maintenance_fee: boat.monthly_maintenance_fee,
      status: boat.status,
      engine: boat.specifications?.engine || "",
      fuel: boat.specifications?.fuel || "Gasolina",
      cruising_speed: boat.specifications?.cruising_speed || "",
      max_speed: boat.specifications?.max_speed || "",
      fuel_capacity: boat.specifications?.fuel_capacity || "",
      water_capacity: boat.specifications?.water_capacity || "",
      motors: boat.specifications?.motors || "",
      images: [...(boat.images || [])],
    })
    setDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta embarcação? Esta ação não pode ser desfeita.")) return
    setBoats(boats.filter((b) => b.id !== id))
  }

  const handleDuplicate = (boat: Boat) => {
    const duplicated: Boat = {
      ...boat,
      id: String(Date.now()),
      name: `${boat.name} (Cópia)`,
      available_shares: boat.total_shares,
    }
    setBoats([...boats, duplicated])
  }

  const closeDialog = () => {
    setDialogOpen(false)
    setEditingBoat(null)
    setFormData({ ...emptyForm })
    setImageUrl("")
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Embarcações</h1>
          <p className="text-muted-foreground">
            {boats.length} embarcação{boats.length !== 1 ? "ões" : ""} cadastrada{boats.length !== 1 ? "s" : ""}
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) closeDialog(); else setDialogOpen(true) }}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className="h-4 w-4 mr-2" />
              Nova Embarcação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {editingBoat ? `Editar: ${editingBoat.name}` : "Cadastrar Nova Embarcação"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-8 mt-4">
              {/* Seção: Identificação */}
              <div>
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 border-b border-border pb-2">
                  Identificação
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome da Embarcação *</Label>
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ex: Triton 380 HT" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Modelo *</Label>
                    <Input id="model" value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })} placeholder="Ex: 380 HT" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manufacturer">Fabricante *</Label>
                    <Input id="manufacturer" value={formData.manufacturer} onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })} placeholder="Ex: Triton" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Ano *</Label>
                    <Input id="year" type="number" value={formData.year} onChange={(e) => setFormData({ ...formData, year: Number.parseInt(e.target.value) })} required />
                  </div>
                </div>
              </div>

              {/* Seção: Características */}
              <div>
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 border-b border-border pb-2">
                  Características
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="length">Comprimento (metros) *</Label>
                    <Input id="length" type="number" step="0.1" value={formData.length_meters || ""} onChange={(e) => setFormData({ ...formData, length_meters: Number.parseFloat(e.target.value) || 0 })} placeholder="Ex: 11.6" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacidade (pessoas) *</Label>
                    <Input id="capacity" type="number" value={formData.capacity || ""} onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) || 0 })} placeholder="Ex: 12" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Ativa</SelectItem>
                        <SelectItem value="inactive">Inativa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="location">Marina / Localização *</Label>
                  <Input id="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Ex: Marina da Glória, Rio de Janeiro" required />
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Descreva as características, diferenciais e experiência que a embarcação proporciona..." rows={4} required />
                </div>
              </div>

              {/* Seção: Motorização */}
              <div>
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 border-b border-border pb-2">
                  Motorização e Performance
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="engine">Motor(es)</Label>
                    <Input id="engine" value={formData.engine} onChange={(e) => setFormData({ ...formData, engine: e.target.value })} placeholder="Ex: 2x Mercury Verado 300HP" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motors">Quantidade de Motores</Label>
                    <Input id="motors" value={formData.motors} onChange={(e) => setFormData({ ...formData, motors: e.target.value })} placeholder="Ex: 2 motores" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuel">Combustível</Label>
                    <Select value={formData.fuel} onValueChange={(value) => setFormData({ ...formData, fuel: value })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Gasolina">Gasolina</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuel_capacity">Capacidade de Combustível</Label>
                    <Input id="fuel_capacity" value={formData.fuel_capacity} onChange={(e) => setFormData({ ...formData, fuel_capacity: e.target.value })} placeholder="Ex: 600 litros" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cruising_speed">Velocidade de Cruzeiro</Label>
                    <Input id="cruising_speed" value={formData.cruising_speed} onChange={(e) => setFormData({ ...formData, cruising_speed: e.target.value })} placeholder="Ex: 28 nós" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max_speed">Velocidade Máxima</Label>
                    <Input id="max_speed" value={formData.max_speed} onChange={(e) => setFormData({ ...formData, max_speed: e.target.value })} placeholder="Ex: 45 nós" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="water_capacity">Capacidade de Água</Label>
                    <Input id="water_capacity" value={formData.water_capacity} onChange={(e) => setFormData({ ...formData, water_capacity: e.target.value })} placeholder="Ex: 100 litros" />
                  </div>
                </div>
              </div>

              {/* Seção: Cotas e Valores */}
              <div>
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 border-b border-border pb-2">
                  Cotas e Valores
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="total_shares">Total de Cotas *</Label>
                    <Input id="total_shares" type="number" value={formData.total_shares || ""} onChange={(e) => setFormData({ ...formData, total_shares: Number.parseInt(e.target.value) || 0 })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="available_shares">Cotas Disponíveis *</Label>
                    <Input id="available_shares" type="number" value={formData.available_shares || ""} onChange={(e) => setFormData({ ...formData, available_shares: Number.parseInt(e.target.value) || 0 })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price_per_share">Valor por Cota (R$) *</Label>
                    <Input id="price_per_share" type="number" value={formData.price_per_share || ""} onChange={(e) => setFormData({ ...formData, price_per_share: Number.parseFloat(e.target.value) || 0 })} placeholder="Ex: 275000" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maintenance">Taxa Mensal de Manutenção (R$) *</Label>
                    <Input id="maintenance" type="number" value={formData.monthly_maintenance_fee || ""} onChange={(e) => setFormData({ ...formData, monthly_maintenance_fee: Number.parseFloat(e.target.value) || 0 })} placeholder="Ex: 2500" required />
                  </div>
                </div>
                {formData.price_per_share > 0 && formData.total_shares > 0 && (
                  <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Valor total da embarcação: <span className="font-bold text-foreground">{formatCurrency(formData.price_per_share * formData.total_shares)}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Seção: Imagens */}
              <div>
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 border-b border-border pb-2">
                  Imagens
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Cole a URL da imagem (ex: /boats/minha-lancha.jpg)" className="flex-1" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddImage() }}} />
                    <Button type="button" variant="outline" onClick={handleAddImage} className="bg-transparent">
                      <ImagePlus className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Adicione URLs de imagens da embarcação. A primeira imagem será usada como capa.
                  </p>
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {formData.images.map((img, index) => (
                        <div key={`${img}-${index}`} className="relative group rounded-lg overflow-hidden border border-border bg-muted aspect-video">
                          <Image src={img} alt={`Imagem ${index + 1}`} fill className="object-cover" />
                          {index === 0 && (
                            <span className="absolute top-1 left-1 text-[10px] font-medium bg-primary text-primary-foreground px-1.5 py-0.5 rounded">Capa</span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={closeDialog}>
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  {editingBoat ? "Salvar Alterações" : "Cadastrar Embarcação"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Embarcações */}
      {boats.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Ship className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-30" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma embarcação cadastrada</h3>
            <p className="text-muted-foreground mb-6">Comece adicionando sua primeira embarcação ao catálogo.</p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Primeira Embarcação
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {boats.map((boat) => {
            const isExpanded = expandedBoat === boat.id
            return (
              <Card key={boat.id} className="overflow-hidden">
                {/* Linha principal */}
                <div className="flex items-center gap-4 p-4">
                  <div className="relative h-20 w-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={boat.images?.[0] || "/placeholder.svg?height=80&width=128"}
                      alt={boat.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">{boat.name}</h3>
                      <Badge variant={boat.status === "active" ? "default" : "secondary"} className="flex-shrink-0">
                        {boat.status === "active" ? "Ativa" : "Inativa"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{boat.manufacturer} {boat.model} - {boat.year}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span>{boat.length_meters}m</span>
                      <span>{boat.capacity} pessoas</span>
                      <span>{boat.location}</span>
                    </div>
                  </div>

                  <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
                    <p className="font-semibold text-foreground">{formatCurrency(boat.price_per_share)}/cota</p>
                    <p className="text-sm text-primary font-medium">{boat.available_shares}/{boat.total_shares} cotas disponíveis</p>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/embarcacoes/${boat.id}`} target="_blank"><Eye className="h-4 w-4" /></Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(boat)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(boat.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setExpandedBoat(isExpanded ? null : boat.id)}>
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Detalhes expandidos */}
                {isExpanded && (
                  <div className="border-t border-border bg-muted/30 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Imagens */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Imagens ({boat.images?.length || 0})</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {(boat.images || []).map((img, i) => (
                            <div key={`${img}-${i}`} className="relative aspect-video rounded-md overflow-hidden bg-muted border border-border">
                              <Image src={img} alt={`${boat.name} ${i + 1}`} fill className="object-cover" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Especificações */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Especificações</h4>
                        <div className="space-y-2 text-sm">
                          {boat.specifications?.engine && <div className="flex justify-between"><span className="text-muted-foreground">Motor</span><span className="text-foreground font-medium">{boat.specifications.engine}</span></div>}
                          {boat.specifications?.motors && <div className="flex justify-between"><span className="text-muted-foreground">Motores</span><span className="text-foreground font-medium">{boat.specifications.motors}</span></div>}
                          {boat.specifications?.fuel && <div className="flex justify-between"><span className="text-muted-foreground">Combustível</span><span className="text-foreground font-medium">{boat.specifications.fuel}</span></div>}
                          {boat.specifications?.cruising_speed && <div className="flex justify-between"><span className="text-muted-foreground">Vel. Cruzeiro</span><span className="text-foreground font-medium">{boat.specifications.cruising_speed}</span></div>}
                          {boat.specifications?.max_speed && <div className="flex justify-between"><span className="text-muted-foreground">Vel. Máxima</span><span className="text-foreground font-medium">{boat.specifications.max_speed}</span></div>}
                          {boat.specifications?.fuel_capacity && <div className="flex justify-between"><span className="text-muted-foreground">Combustível</span><span className="text-foreground font-medium">{boat.specifications.fuel_capacity}</span></div>}
                          {boat.specifications?.water_capacity && <div className="flex justify-between"><span className="text-muted-foreground">Água</span><span className="text-foreground font-medium">{boat.specifications.water_capacity}</span></div>}
                        </div>
                      </div>

                      {/* Valores */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Valores e Cotas</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between"><span className="text-muted-foreground">Valor total</span><span className="text-foreground font-medium">{formatCurrency(boat.total_price)}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Valor por cota</span><span className="text-foreground font-medium">{formatCurrency(boat.price_per_share)}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Taxa mensal</span><span className="text-foreground font-medium">{formatCurrency(boat.monthly_maintenance_fee)}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Total de cotas</span><span className="text-foreground font-medium">{boat.total_shares}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Disponíveis</span><span className="text-primary font-medium">{boat.available_shares}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Vendidas</span><span className="text-foreground font-medium">{boat.total_shares - boat.available_shares}</span></div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent" onClick={() => handleEdit(boat)}>
                            <Edit className="h-3 w-3 mr-1" /> Editar
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent" onClick={() => handleDuplicate(boat)}>
                            <Plus className="h-3 w-3 mr-1" /> Duplicar
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Descrição */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-2">Descrição</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{boat.description}</p>
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
