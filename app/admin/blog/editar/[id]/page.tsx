"use client"

import { useEffect, useState } from "react"
import { BlogEditor } from "@/app/admin/blog/editor"
import { useParams, useRouter } from "next/navigation"

export default function EditarArtigoPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [artigo, setArtigo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/blog/artigos/${id}`)
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        setArtigo(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[200px]">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    )
  }
  if (!artigo) {
    router.replace("/admin/blog")
    return null
  }
  return <BlogEditor artigo={artigo} />
}
