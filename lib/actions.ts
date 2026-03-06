"use server"

import { createClient, createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { boats, faqs as faqsMock } from "@/lib/data"

// ── EMBARCACOES ──────────────────────────────────────────────

const mapBoatToEmbarcacao = (b: (typeof boats)[0]) => ({
  id: b.id,
  nome: b.name,
  tipo: b.model,
  imagens: b.images,
  localizacao: b.location,
  capacidade: b.capacity,
  comprimento: `${b.length_meters}m`,
  preco_mensal: b.price_per_share,
  destaque: false,
  motor: b.specifications?.engine,
  velocidade_max: b.specifications?.max_speed,
  descricao: b.description,
  caracteristicas: Object.entries(b.specifications || {}).map(([k, v]) => `${k}: ${v}`),
})

export async function getEmbarcacoes() {
  if (!isSupabaseConfigured()) return boats.map(mapBoatToEmbarcacao)
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("embarcacoes")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getEmbarcacoesAtivas() {
  if (!isSupabaseConfigured()) return boats.filter((b) => b.status === "active").map(mapBoatToEmbarcacao)
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("embarcacoes")
    .select("*")
    .eq("disponivel", true)
    .order("created_at", { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getEmbarcacaoById(id: string) {
  if (!isSupabaseConfigured()) {
    const b = boats.find((x) => x.id === id)
    return b ? mapBoatToEmbarcacao(b) : null
  }
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("embarcacoes")
    .select("*")
    .eq("id", id)
    .single()
  if (error) return null
  return data
}

export async function createEmbarcacao(formData: FormData) {
  const supabase = await createClient()
  const payload = {
    nome: formData.get("nome") as string,
    descricao: formData.get("descricao") as string,
    tipo: formData.get("tipo") as string,
    capacidade: Number(formData.get("capacidade")),
    comprimento: formData.get("comprimento") as string,
    motor: formData.get("motor") as string,
    velocidade_max: formData.get("velocidade_max") as string,
    localizacao: formData.get("localizacao") as string,
    preco_mensal: Number(formData.get("preco_mensal")),
    preco_anual: formData.get("preco_anual") ? Number(formData.get("preco_anual")) : null,
    disponivel: formData.get("disponivel") === "true",
    destaque: formData.get("destaque") === "true",
    imagens: (formData.get("imagens") as string)?.split("\n").map(s => s.trim()).filter(Boolean) ?? [],
    caracteristicas: (formData.get("caracteristicas") as string)?.split("\n").map(s => s.trim()).filter(Boolean) ?? [],
  }
  const { error } = await supabase.from("embarcacoes").insert(payload)
  if (error) throw new Error(error.message)
  revalidatePath("/admin/embarcacoes")
  revalidatePath("/embarcacoes")
}

export async function updateEmbarcacao(id: string, formData: FormData) {
  const supabase = await createClient()
  const payload = {
    nome: formData.get("nome") as string,
    descricao: formData.get("descricao") as string,
    tipo: formData.get("tipo") as string,
    capacidade: Number(formData.get("capacidade")),
    comprimento: formData.get("comprimento") as string,
    motor: formData.get("motor") as string,
    velocidade_max: formData.get("velocidade_max") as string,
    localizacao: formData.get("localizacao") as string,
    preco_mensal: Number(formData.get("preco_mensal")),
    preco_anual: formData.get("preco_anual") ? Number(formData.get("preco_anual")) : null,
    disponivel: formData.get("disponivel") === "true",
    destaque: formData.get("destaque") === "true",
    imagens: (formData.get("imagens") as string)?.split("\n").map(s => s.trim()).filter(Boolean) ?? [],
    caracteristicas: (formData.get("caracteristicas") as string)?.split("\n").map(s => s.trim()).filter(Boolean) ?? [],
    updated_at: new Date().toISOString(),
  }
  const { error } = await supabase.from("embarcacoes").update(payload).eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/admin/embarcacoes")
  revalidatePath("/embarcacoes")
}

export async function deleteEmbarcacao(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("embarcacoes").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/admin/embarcacoes")
  revalidatePath("/embarcacoes")
}

// ── LEADS ────────────────────────────────────────────────────

export async function getLeads() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function createLead(payload: {
  nome: string
  email: string
  telefone?: string
  mensagem?: string
  embarcacao_nome?: string
}) {
  const supabase = await createClient()
  const { error } = await supabase.from("leads").insert(payload)
  if (error) throw new Error(error.message)
}

export async function deleteLead(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("leads").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/admin/leads")
}

export async function updateLeadStatus(id: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("leads").update({ status }).eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/admin/leads")
}

// ── FAQS ─────────────────────────────────────────────────────

export async function getFaqs() {
  if (!isSupabaseConfigured()) {
    return faqsMock.map((f) => ({ id: f.id, pergunta: f.question, resposta: f.answer, ordem: f.order }))
  }
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("ativo", true)
    .order("ordem", { ascending: true })
  if (error) throw new Error(error.message)
  return data ?? []
}

// ── PÁGINAS LEGAIS ────────────────────────────────────────────

export async function getPaginaLegal(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("paginas_legais")
    .select("*")
    .eq("slug", slug)
    .single()
  if (error) return null
  return data
}

export async function upsertPaginaLegal(slug: string, formData: FormData) {
  const supabase = await createClient()
  const payload = {
    slug,
    titulo: formData.get("titulo") as string,
    conteudo: formData.get("conteudo") as string,
    ultima_atualizacao: formData.get("ultima_atualizacao") as string,
    updated_at: new Date().toISOString(),
  }
  const { error } = await supabase
    .from("paginas_legais")
    .upsert(payload, { onConflict: "slug" })
  if (error) throw new Error(error.message)
  revalidatePath(`/admin/conteudo`)
  revalidatePath(`/${slug}`)
  if (slug === "termos-de-uso") revalidatePath("/termos-de-uso")
  if (slug === "politica-de-privacidade") revalidatePath("/politica-de-privacidade")
}

// ── CONFIGURAÇÕES ─────────────────────────────────────────────

export async function getConfiguracoes(): Promise<Record<string, string>> {
  if (!isSupabaseConfigured()) return {}
  const supabase = await createClient()
  const { data } = await supabase.from("configuracoes").select("chave, valor")
  if (!data) return {}
  return Object.fromEntries(data.map((r: { chave: string; valor: string }) => [r.chave, r.valor]))
}

export async function updateConfiguracao(chave: string, valor: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from("configuracoes")
    .upsert({ chave, valor, updated_at: new Date().toISOString() }, { onConflict: "chave" })
  if (error) throw new Error(error.message)
  revalidatePath("/")
  revalidatePath("/admin/configuracoes")
}

export async function updateConfiguracoes(configs: Record<string, string>) {
  const supabase = await createClient()
  const rows = Object.entries(configs).map(([chave, valor]) => ({
    chave,
    valor,
    updated_at: new Date().toISOString(),
  }))
  const { error } = await supabase.from("configuracoes").upsert(rows, { onConflict: "chave" })
  if (error) throw new Error(error.message)
  revalidatePath("/")
  revalidatePath("/admin/configuracoes")
}

// ── BLOG CATEGORIAS ───────────────────────────────────────────

export async function getBlogCategorias() {
  if (!isSupabaseConfigured()) return []
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("blog_categorias")
      .select("*")
      .order("nome", { ascending: true })
    if (error) return []
    return data ?? []
  } catch {
    return []
  }
}

export async function createBlogCategoria(formData: FormData) {
  const supabase = createServiceClient()
  const { error } = await supabase.from("blog_categorias").insert({
    nome: formData.get("nome") as string,
    slug: formData.get("slug") as string,
    descricao: formData.get("descricao") as string,
  })
  if (error) throw new Error(error.message)
  revalidatePath("/blog")
}

export async function updateBlogCategoria(id: string, formData: FormData) {
  const supabase = createServiceClient()
  const { error } = await supabase.from("blog_categorias").update({
    nome: formData.get("nome") as string,
    slug: formData.get("slug") as string,
    descricao: formData.get("descricao") as string,
  }).eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/blog")
}

export async function deleteBlogCategoria(id: string) {
  const supabase = createServiceClient()
  const { error } = await supabase.from("blog_categorias").delete().eq("id", id)
  if (error) throw new Error(error.message)
}

// ── BLOG ARTIGOS ──────────────────────────────────────────────

export async function getBlogArtigos(opts?: { status?: string; categoria_slug?: string; destaque?: boolean; limit?: number }) {
  if (!isSupabaseConfigured()) return []
  const supabase = await createClient()
  let query = supabase
    .from("blog_artigos")
    .select("*, blog_categorias(id, nome, slug)")
    .order("data_publicacao", { ascending: false })
  if (opts?.status) query = query.eq("status", opts.status)
  if (opts?.destaque) query = query.eq("destaque", true)
  if (opts?.limit) query = query.limit(opts.limit)
  if (opts?.categoria_slug) {
    const { data: cat } = await supabase.from("blog_categorias").select("id").eq("slug", opts.categoria_slug).single()
    if (cat) query = query.eq("categoria_id", cat.id)
  }
  const { data, error } = await query
  if (error) return []
  return data ?? []
}

export async function getBlogArtigoBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_artigos")
    .select("*, blog_categorias(id, nome, slug)")
    .eq("slug", slug)
    .single()
  if (error) return null
  return data
}

export async function getBlogArtigoById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_artigos")
    .select("*, blog_categorias(id, nome, slug)")
    .eq("id", id)
    .single()
  if (error) return null
  return data
}

export async function createBlogArtigo(formData: FormData) {
  const supabase = await createClient()
  const tags = (formData.get("tags") as string)?.split(",").map(s => s.trim()).filter(Boolean) ?? []
  const { error } = await supabase.from("blog_artigos").insert({
    titulo: formData.get("titulo") as string,
    slug: formData.get("slug") as string,
    categoria_id: formData.get("categoria_id") as string || null,
    imagem_destaque: formData.get("imagem_destaque") as string || null,
    conteudo: formData.get("conteudo") as string,
    resumo: formData.get("resumo") as string || null,
    autor: formData.get("autor") as string || "Equipe InBoat",
    status: formData.get("status") as string || "rascunho",
    destaque: formData.get("destaque") === "true",
    popular: formData.get("popular") === "true",
    recomendado: formData.get("recomendado") === "true",
    tags,
    meta_titulo: formData.get("meta_titulo") as string || null,
    meta_descricao: formData.get("meta_descricao") as string || null,
    data_publicacao: formData.get("status") === "publicado" ? new Date().toISOString() : null,
  })
  if (error) throw new Error(error.message)
  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}

export async function updateBlogArtigo(id: string, formData: FormData) {
  const supabase = await createClient()
  const tags = (formData.get("tags") as string)?.split(",").map(s => s.trim()).filter(Boolean) ?? []
  const status = formData.get("status") as string
  const { data: existing } = await supabase.from("blog_artigos").select("data_publicacao, status").eq("id", id).single()
  const data_publicacao =
    status === "publicado" && existing?.status !== "publicado"
      ? new Date().toISOString()
      : existing?.data_publicacao ?? null
  const { error } = await supabase.from("blog_artigos").update({
    titulo: formData.get("titulo") as string,
    slug: formData.get("slug") as string,
    categoria_id: formData.get("categoria_id") as string || null,
    imagem_destaque: formData.get("imagem_destaque") as string || null,
    conteudo: formData.get("conteudo") as string,
    resumo: formData.get("resumo") as string || null,
    autor: formData.get("autor") as string || "Equipe InBoat",
    status,
    destaque: formData.get("destaque") === "true",
    popular: formData.get("popular") === "true",
    recomendado: formData.get("recomendado") === "true",
    tags,
    meta_titulo: formData.get("meta_titulo") as string || null,
    meta_descricao: formData.get("meta_descricao") as string || null,
    data_publicacao,
    updated_at: new Date().toISOString(),
  }).eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}

export async function deleteBlogArtigo(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("blog_artigos").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}

// ── AUTH ─────────────────────────────────────────────────────

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/admin")
}
