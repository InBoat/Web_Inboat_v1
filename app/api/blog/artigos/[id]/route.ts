import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_artigos")
    .select("*, blog_categorias(id, nome, slug)")
    .eq("id", id)
    .single()
  if (error) return NextResponse.json(null, { status: 404 })
  return NextResponse.json(data)
}
