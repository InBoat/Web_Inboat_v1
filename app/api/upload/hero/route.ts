import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const BUCKET = "hero"

export async function POST(request: Request) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) {
      return NextResponse.json({ error: "Supabase não configurado" }, { status: 500 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File | null
    if (!file || !file.size) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 })
    }

    const supabase = createClient(url, key)
    const ext = file.name.split(".").pop() || "jpg"
    const path = `hero-${Date.now()}.${ext}`

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { upsert: true, contentType: file.type })

    if (error) {
      return NextResponse.json(
        { error: error.message + ". Crie o bucket 'hero' no Supabase Storage e configure políticas de upload." },
        { status: 500 }
      )
    }

    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path)
    return NextResponse.json({ url: urlData.publicUrl })
  } catch (e) {
    return NextResponse.json({ error: "Erro ao fazer upload" }, { status: 500 })
  }
}
