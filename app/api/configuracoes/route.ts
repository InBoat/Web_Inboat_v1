import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const { data } = await supabase.from("configuracoes").select("chave, valor")
  if (!data) return NextResponse.json({})
  const configs = Object.fromEntries(data.map((r: { chave: string; valor: string }) => [r.chave, r.valor]))
  return NextResponse.json(configs)
}
