import { createServiceClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from("blog_artigos")
      .select("*, blog_categorias(id, nome, slug)")
      .eq("id", id)
      .single()
    if (error) return NextResponse.json(null, { status: 404 })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(null, { status: 404 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const tags = (body.tags as string)?.split(",").map((s: string) => s.trim()).filter(Boolean) ?? []
    const payload: Record<string, unknown> = {
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
      updated_at: new Date().toISOString(),
    }
    payload.data_publicacao = body.status === "publicado" ? new Date().toISOString() : null
    const supabase = createServiceClient()
    const { data, error } = await supabase.from("blog_artigos").update(payload).eq("id", id).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (e) {
    return NextResponse.json({ error: "Erro ao atualizar artigo" }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = createServiceClient()
    const { error } = await supabase.from("blog_artigos").delete().eq("id", id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: "Erro ao excluir artigo" }, { status: 500 })
  }
}
