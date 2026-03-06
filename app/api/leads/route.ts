import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = await createClient()
    const { error } = await supabase.from("leads").insert({
      nome: body.nome,
      email: body.email,
      telefone: body.telefone ?? null,
      mensagem: body.mensagem ?? null,
      embarcacao_id: body.embarcacao_id ?? null,
      embarcacao_nome: body.embarcacao_nome ?? null,
      status: "novo",
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
