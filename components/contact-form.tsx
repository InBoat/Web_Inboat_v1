"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle } from "lucide-react"

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.get("nome"),
          email: data.get("email"),
          telefone: data.get("telefone"),
          mensagem: `${data.get("assunto") ? "[" + data.get("assunto") + "] " : ""}${data.get("mensagem")}`,
        }),
      })
      if (!res.ok) throw new Error()
      setSuccess(true)
      form.reset()
    } catch {
      setError("Erro ao enviar mensagem. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="h-16 w-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-serif text-xl font-bold text-foreground">Mensagem enviada!</h3>
        <p className="text-muted-foreground">Recebemos seu contato e retornaremos em breve.</p>
        <Button variant="outline" onClick={() => setSuccess(false)} className="mt-2 bg-transparent">
          Enviar outra mensagem
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="nome" className="text-sm text-foreground">Nome Completo</Label>
          <Input
            id="nome"
            name="nome"
            placeholder="Seu nome"
            className="bg-background border-border text-foreground placeholder:text-muted-foreground"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-foreground">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            className="bg-background border-border text-foreground placeholder:text-muted-foreground"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefone" className="text-sm text-foreground">Telefone</Label>
        <Input
          id="telefone"
          name="telefone"
          type="tel"
          placeholder="+55 11 98765-4321"
          className="bg-background border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="assunto" className="text-sm text-foreground">Assunto</Label>
        <Input
          id="assunto"
          name="assunto"
          placeholder="Como podemos ajudar?"
          className="bg-background border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mensagem" className="text-sm text-foreground">Mensagem</Label>
        <Textarea
          id="mensagem"
          name="mensagem"
          placeholder="Conte-nos mais sobre seu interesse..."
          rows={6}
          className="bg-background border-border text-foreground placeholder:text-muted-foreground resize-none"
          required
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Enviando...
          </span>
        ) : "Enviar Mensagem"}
      </Button>
    </form>
  )
}
