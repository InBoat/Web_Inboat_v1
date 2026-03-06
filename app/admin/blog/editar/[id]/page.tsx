import { getBlogArtigoById } from "@/lib/actions"
import { BlogEditor } from "@/app/admin/blog/editor"
import { notFound } from "next/navigation"

export default async function EditarArtigoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const artigo = await getBlogArtigoById(id)
  if (!artigo) notFound()
  return <BlogEditor artigo={artigo} />
}
