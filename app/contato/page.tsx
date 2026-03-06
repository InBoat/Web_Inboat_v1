"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, MessageCircle, CheckCircle } from "lucide-react"


const contactInfo = [
  {
    Icon: Mail,
    title: "Email",
    content: "contato@inboat.com.br",
    href: "mailto:contato@inboat.com.br",
    detail: "Resposta em até 24 horas",
  },
  {
    Icon: Phone,
    title: "Telefone",
    content: "+55 11 4000-4000",
    href: "tel:+551140004000",
    detail: "Seg–Sex: 9h às 18h",
  },
  {
    Icon: MessageCircle,
    title: "WhatsApp",
    content: "+55 11 99999-9999",
    href: "https://wa.me/5511999999999",
    detail: "Atendimento imediato",
  },
  {
    Icon: MapPin,
    title: "Escritório",
    content: "São Paulo, SP — Brasil",
    href: null,
    detail: "Av. Paulista, 1000",
  },
]

export default function ContactPage() {
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-20 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">Contato</p>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance leading-tight">
                Entre em Contato
              </h1>
              <p className="text-muted-foreground leading-relaxed text-pretty text-base md:text-lg">
                Nossa equipe está pronta para responder suas dúvidas e ajudá-lo a realizar o sonho de ter sua própria embarcação.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-lg p-8">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Envie sua Mensagem</h2>

                  {success ? (
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
                  ) : (
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
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {contactInfo.map(({ Icon, title, content, href, detail }) => (
                  <div key={title} className="bg-card border border-border rounded-lg p-5 flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{title}</p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="font-medium text-foreground hover:text-primary transition-colors text-sm"
                        >
                          {content}
                        </a>
                      ) : (
                        <p className="font-medium text-foreground text-sm">{content}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-0.5">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
