import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"

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
                  <ContactForm />
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
