import { getConfiguracoes } from "@/lib/actions"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const configs = await getConfiguracoes()
    return NextResponse.json(configs)
  } catch {
    return NextResponse.json({})
  }
}
