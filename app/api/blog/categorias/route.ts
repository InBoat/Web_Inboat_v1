import { createServiceClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from("blog_categorias")
      .select("*")
      .order("nome", { ascending: true })
    if (error) return NextResponse.json([])
    return NextResponse.json(data ?? [])
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nome, slug, descricao } = body
    if (!nome || !slug) {
      return NextResponse.json({ error: "Nome e slug são obrigatórios" }, { status: 400 })
    }
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from("blog_categorias")
      .insert({ nome, slug, descricao: descricao || "" })
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (e) {
    return NextResponse.json({ error: "Erro ao criar categoria" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, nome, slug, descricao } = body
    if (!id || !nome || !slug) {
      return NextResponse.json({ error: "ID, nome e slug são obrigatórios" }, { status: 400 })
    }
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from("blog_categorias")
      .update({ nome, slug, descricao: descricao || "" })
      .eq("id", id)
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (e) {
    return NextResponse.json({ error: "Erro ao atualizar categoria" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 })
    const supabase = createServiceClient()
    const { error } = await supabase.from("blog_categorias").delete().eq("id", id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: "Erro ao excluir categoria" }, { status: 500 })
  }
}
