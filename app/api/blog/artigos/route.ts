import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()
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
