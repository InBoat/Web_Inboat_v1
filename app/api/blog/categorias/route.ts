import { getBlogCategorias } from "@/lib/actions"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const data = await getBlogCategorias()
    return NextResponse.json(data ?? [])
  } catch {
    return NextResponse.json([])
  }
}
