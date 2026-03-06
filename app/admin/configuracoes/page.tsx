"use client"

import { useState, useEffect, useTransition, useRef } from "react"
import { Settings, Save, Image as ImageIcon, Share2, Phone, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateConfiguracoes } from "@/lib/actions"

const FONTES = [
  { value: "var(--font-serif)", label: "Playfair Display (serif)" },
  { value: "var(--font-sans)", label: "Outfit (sans)" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Arial, sans-serif", label: "Arial" },
]

const TAMANHOS = [
  { value: "2.5rem", label: "Pequeno (2.5rem)" },
  { value: "3rem", label: "Médio (3rem)" },
  { value: "4rem", label: "Grande (4rem)" },
  { value: "4.5rem", label: "Muito grande (4.5rem)" },
  { value: "5rem", label: "Extra grande (5rem)" },
  { value: "6rem", label: "Enorme (6rem)" },
  { value: "7rem", label: "Máximo (7rem)" },
]

export default function ConfiguracoesPage() {
  const [configs, setConfigs] = useState<Record<string, string>>({})
  const [carregando, setCarregando] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [sucesso, setSucesso] = useState(false)
  const [erro, setErro] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch("/api/configuracoes")
      .then((r) => r.json())
      .then((data) => setConfigs(data))
      .finally(() => setCarregando(false))
  }, [])

  function set(chave: string, valor: string) {
    setConfigs((prev) => ({ ...prev, [chave]: valor }))
  }

  function handleSalvar(subset: Record<string, string>) {
    setErro("")
    setSucesso(false)
    startTransition(async () => {
      try {
        await updateConfiguracoes(subset)
        setSucesso(true)
        setTimeout(() => setSucesso(false), 3000)
      } catch (e: unknown) {
        setErro(e instanceof Error ? e.message : "Erro ao salvar.")
      }
    })
  }

  async function handleUploadHero(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setErro("")
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload/hero", { method: "POST", body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Erro no upload")
      set("hero_imagem", data.url)
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro ao enviar imagem.")
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  if (carregando) {
    return <div className="p-8 text-muted-foreground">Carregando...</div>
  }

  const feedback = (
    <div className="flex items-center gap-3">
      {sucesso && <span className="text-sm text-green-500 font-medium">Salvo com sucesso!</span>}
      {erro && <span className="text-sm text-destructive font-medium">{erro}</span>}
    </div>
  )

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Settings className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Configurações do Site</h1>
        </div>
        <p className="text-muted-foreground">
          Edite o hero da homepage, redes sociais, contato e outras configurações gerais do site.
        </p>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="mb-6">
          <TabsTrigger value="hero" className="gap-2">
            <ImageIcon className="h-4 w-4" />
            Hero / Capa
          </TabsTrigger>
          <TabsTrigger value="contato" className="gap-2">
            <Phone className="h-4 w-4" />
            Contato
          </TabsTrigger>
          <TabsTrigger value="redes" className="gap-2">
            <Share2 className="h-4 w-4" />
            Redes Sociais
          </TabsTrigger>
        </TabsList>

        {/* ABA HERO */}
        <TabsContent value="hero">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Seção Hero (Capa)</h2>
              <div className="flex items-center gap-3">
                {feedback}
                <Button
                  size="sm"
                  disabled={isPending}
                  style={{ background: "linear-gradient(135deg, #0c5280 0%, #0f6ea8 50%, #1e88c8 100%)" }}
                  onClick={() =>
                    handleSalvar({
                      hero_headline: configs.hero_headline ?? "",
                      hero_subheadline: configs.hero_subheadline ?? "",
                      hero_imagem: configs.hero_imagem ?? "",
                      hero_headline_font: configs.hero_headline_font ?? "",
                      hero_headline_size: configs.hero_headline_size ?? "",
                      hero_headline_color: configs.hero_headline_color ?? "",
                      hero_subheadline_font: configs.hero_subheadline_font ?? "",
                      hero_subheadline_size: configs.hero_subheadline_size ?? "",
                      hero_subheadline_color: configs.hero_subheadline_color ?? "",
                    })
                  }
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isPending ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hero_headline">Título principal</Label>
              <Input
                id="hero_headline"
                value={configs.hero_headline ?? ""}
                onChange={(e) => set("hero_headline", e.target.value)}
                placeholder="Ex: Propriedade compartilhada de embarcações de alto padrão"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="space-y-1.5">
                  <Label className="text-xs">Fonte</Label>
                  <Select
                    value={configs.hero_headline_font ?? "var(--font-serif)"}
                    onValueChange={(v) => set("hero_headline_font", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FONTES.map((f) => (
                        <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Tamanho</Label>
                  <Select
                    value={configs.hero_headline_size ?? "5rem"}
                    onValueChange={(v) => set("hero_headline_size", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TAMANHOS.map((t) => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Cor</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={configs.hero_headline_color || "#0c1420"}
                      onChange={(e) => set("hero_headline_color", e.target.value)}
                      className="w-12 h-9 p-1 cursor-pointer"
                    />
                    <Input
                      value={configs.hero_headline_color ?? ""}
                      onChange={(e) => set("hero_headline_color", e.target.value)}
                      placeholder="#0c1420"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hero_subheadline">Subtítulo</Label>
              <Textarea
                id="hero_subheadline"
                value={configs.hero_subheadline ?? ""}
                onChange={(e) => set("hero_subheadline", e.target.value)}
                rows={3}
                placeholder="Ex: Tenha acesso a lanchas premium com gestão profissional completa..."
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="space-y-1.5">
                  <Label className="text-xs">Fonte</Label>
                  <Select
                    value={configs.hero_subheadline_font ?? "var(--font-sans)"}
                    onValueChange={(v) => set("hero_subheadline_font", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FONTES.map((f) => (
                        <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Tamanho</Label>
                  <Select
                    value={configs.hero_subheadline_size ?? "1.125rem"}
                    onValueChange={(v) => set("hero_subheadline_size", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.875rem">Pequeno (0.875rem)</SelectItem>
                      <SelectItem value="1rem">Normal (1rem)</SelectItem>
                      <SelectItem value="1.125rem">Médio (1.125rem)</SelectItem>
                      <SelectItem value="1.25rem">Grande (1.25rem)</SelectItem>
                      <SelectItem value="1.5rem">Extra grande (1.5rem)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Cor</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={configs.hero_subheadline_color || "#64748b"}
                      onChange={(e) => set("hero_subheadline_color", e.target.value)}
                      className="w-12 h-9 p-1 cursor-pointer"
                    />
                    <Input
                      value={configs.hero_subheadline_color ?? ""}
                      onChange={(e) => set("hero_subheadline_color", e.target.value)}
                      placeholder="#64748b"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Imagem de fundo</Label>
              <div className="flex gap-2">
                <Input
                  id="hero_imagem"
                  value={configs.hero_imagem ?? ""}
                  onChange={(e) => set("hero_imagem", e.target.value)}
                  placeholder="URL ou /caminho/imagem.jpg"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={handleUploadHero}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? "Enviando..." : "Escolher arquivo"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Cole uma URL ou clique em &quot;Escolher arquivo&quot; para enviar uma imagem (requer bucket &quot;hero&quot; no Supabase Storage).
              </p>
              {configs.hero_imagem && (
                <div className="relative h-40 rounded-md overflow-hidden border border-border mt-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={configs.hero_imagem}
                    alt="Preview hero"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none"
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* ABA CONTATO */}
        <TabsContent value="contato">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Informações de Contato</h2>
              <div className="flex items-center gap-3">
                {feedback}
                <Button
                  size="sm"
                  disabled={isPending}
                  style={{ background: "linear-gradient(135deg, #0c5280 0%, #0f6ea8 50%, #1e88c8 100%)" }}
                  onClick={() =>
                    handleSalvar({
                      contato_email: configs.contato_email ?? "",
                      contato_telefone: configs.contato_telefone ?? "",
                      contato_whatsapp: configs.contato_whatsapp ?? "",
                      contato_endereco: configs.contato_endereco ?? "",
                    })
                  }
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isPending ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contato_email">E-mail</Label>
                <Input
                  id="contato_email"
                  type="email"
                  value={configs.contato_email ?? ""}
                  onChange={(e) => set("contato_email", e.target.value)}
                  placeholder="contato@inboat.com.br"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contato_telefone">Telefone</Label>
                <Input
                  id="contato_telefone"
                  value={configs.contato_telefone ?? ""}
                  onChange={(e) => set("contato_telefone", e.target.value)}
                  placeholder="+55 11 4000-4000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contato_whatsapp">WhatsApp (somente números)</Label>
                <Input
                  id="contato_whatsapp"
                  value={configs.contato_whatsapp ?? ""}
                  onChange={(e) => set("contato_whatsapp", e.target.value)}
                  placeholder="5511999999999"
                />
                <p className="text-xs text-muted-foreground">Somente dígitos, com DDI. Ex: 5511999999999</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contato_endereco">Endereço</Label>
                <Input
                  id="contato_endereco"
                  value={configs.contato_endereco ?? ""}
                  onChange={(e) => set("contato_endereco", e.target.value)}
                  placeholder="São Paulo, SP — Brasil"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ABA REDES SOCIAIS */}
        <TabsContent value="redes">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Redes Sociais</h2>
              <div className="flex items-center gap-3">
                {feedback}
                <Button
                  size="sm"
                  disabled={isPending}
                  style={{ background: "linear-gradient(135deg, #0c5280 0%, #0f6ea8 50%, #1e88c8 100%)" }}
                  onClick={() =>
                    handleSalvar({
                      social_instagram: configs.social_instagram ?? "",
                      social_facebook: configs.social_facebook ?? "",
                      social_youtube: configs.social_youtube ?? "",
                      social_tiktok: configs.social_tiktok ?? "",
                    })
                  }
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isPending ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { chave: "social_instagram", label: "Instagram", placeholder: "https://instagram.com/inboat" },
                { chave: "social_facebook", label: "Facebook", placeholder: "https://facebook.com/inboat" },
                { chave: "social_youtube", label: "YouTube", placeholder: "https://youtube.com/@inboat" },
                { chave: "social_tiktok", label: "TikTok", placeholder: "https://tiktok.com/@inboat" },
              ].map(({ chave, label, placeholder }) => (
                <div key={chave} className="space-y-2">
                  <Label htmlFor={chave}>{label}</Label>
                  <Input
                    id={chave}
                    type="url"
                    value={configs[chave] ?? ""}
                    onChange={(e) => set(chave, e.target.value)}
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
