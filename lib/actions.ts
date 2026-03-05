"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// ── EMBARCACOES ──────────────────────────────────────────────

export async function getEmbarcacoes() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("embarcacoes")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getEmbarcacoesAtivas() {
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

// ── AUTH ─────────────────────────────────────────────────────

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/admin")
}
