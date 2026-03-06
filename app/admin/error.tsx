"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[Admin Error]", error)
  }, [error])

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-8">
      <div className="text-center max-w-md space-y-4">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
        <h2 className="text-lg font-semibold text-foreground">Algo deu errado</h2>
        <p className="text-sm text-muted-foreground">
          Ocorreu um erro ao carregar esta página. Tente novamente ou volte ao painel.
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={reset}>
            Tentar novamente
          </Button>
          <Button asChild>
            <Link href="/admin">Voltar ao painel</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
