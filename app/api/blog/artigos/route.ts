import { createServiceClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from("blog_artigos")
      .select("*, blog_categorias(id, nome, slug)")
      .order("created_at", { ascending: false })
    if (error) return NextResponse.json([])
    return NextResponse.json(data ?? [])
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const tags = (body.tags as string)?.split(",").map((s: string) => s.trim()).filter(Boolean) ?? []
    const payload = {
      titulo: body.titulo || "",
      slug: body.slug || "",
      categoria_id: body.categoria_id || null,
      imagem_destaque: body.imagem_destaque || null,
      conteudo: body.conteudo || "",
      resumo: body.resumo || null,
      autor: body.autor || "Equipe InBoat",
      status: body.status || "rascunho",
      destaque: Boolean(body.destaque),
      popular: Boolean(body.popular),
      recomendado: Boolean(body.recomendado),
      tags,
      meta_titulo: body.meta_titulo || null,
      meta_descricao: body.meta_descricao || null,
      data_publicacao: body.status === "publicado" ? new Date().toISOString() : null,
    }
    const supabase = createServiceClient()
    const { data, error } = await supabase.from("blog_artigos").insert(payload).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (e) {
    return NextResponse.json({ error: "Erro ao criar artigo" }, { status: 500 })
  }
}
