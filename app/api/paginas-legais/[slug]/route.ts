import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("paginas_legais")
    .select("*")
    .eq("slug", slug)
    .single()
  if (error || !data) return NextResponse.json(null)
  return NextResponse.json(data)
}
