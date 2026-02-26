import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Ship, Users, Calendar, Shield, DollarSign, Wrench, CheckCircle2, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Escolha sua Embarcação",
    description:
      "Navegue pelo nosso catálogo de embarcações premium. Cada lancha foi cuidadosamente selecionada por nossa equipe e passa por rigorosa inspeção de qualidade e segurança.",
    items: [
      "Embarcações de marcas renomadas",
      "Manutenção profissional garantida",
      "Localizações estratégicas",
    ],
  },
  {
    number: "02",
    title: "Adquira suas Cotas",
    description:
      "Cada embarcação é dividida em 4 cotas. Você adquire 25% da propriedade, com direito real sobre sua fração. Isso reduz em até 85% o custo de aquisição.",
    items: [
      "Investimento a partir de R$ 245.000",
      "Contrato transparente e seguro",
      "Possibilidade de revenda das cotas",
    ],
  },
  {
    number: "03",
    title: "Reserve e Navegue",
    description:
      "Acesse nosso portal online e faça suas reservas com antecedência. O sistema é intuitivo e permite visualizar a disponibilidade em tempo real.",
    items: [
      "Sistema de reservas 24/7",
      "Calendário compartilhado entre cotistas",
      "Suporte para planejamento de viagens",
    ],
  },
]

const included = [
  { Icon: Wrench, title: "Manutenção Completa", description: "Manutenção preventiva e corretiva, limpeza após cada uso e inspeções regulares." },
  { Icon: Shield, title: "Seguro Total", description: "Cobertura completa contra danos, acidentes e responsabilidade civil." },
  { Icon: Ship, title: "Atracação em Marina", description: "Vaga garantida em marinas de primeira linha com toda infraestrutura." },
  { Icon: Users, title: "Suporte Dedicado", description: "Equipe disponível para auxiliar em reservas, dúvidas e emergências." },
  { Icon: Calendar, title: "Gestão de Reservas", description: "Sistema online intuitivo para agendamento e gerenciamento das reservas." },
  { Icon: DollarSign, title: "Custos Previsíveis", description: "Taxa mensal fixa que cobre todos os custos operacionais da embarcação." },
]

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">Como funciona</p>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance leading-tight">
                Como Funciona o InBoat
              </h1>
              <p className="text-muted-foreground leading-relaxed text-pretty text-base md:text-lg">
                Entenda como o sistema de multipropriedade náutica funciona e como você pode ter acesso a embarcações de luxo com investimento acessível.
              </p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-0">
              {steps.map((step, index) => (
                <div key={step.number} className="relative flex gap-8">
                  {/* Vertical line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-16 bottom-0 w-px bg-border" />
                  )}

                  {/* Number circle */}
                  <div className="shrink-0 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif font-bold text-lg z-10">
                    {step.number}
                  </div>

                  <div className="pb-16 flex-1">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-5">{step.description}</p>
                    <ul className="space-y-2">
                      {step.items.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Included features */}
        <section className="py-24 bg-card border-t border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Incluso em todas as cotas</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
                O Que Está Incluído
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden max-w-5xl mx-auto">
              {included.map(({ Icon, title, description }) => (
                <div key={title} className="bg-background p-8 hover:bg-accent/30 transition-colors group">
                  <div className="h-10 w-10 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center mb-5 group-hover:border-primary group-hover:bg-primary/20 transition-all">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-background border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Pronto para Começar?
            </h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-pretty leading-relaxed">
              Entre em contato com nossa equipe para agendar uma visita e conhecer nossas embarcações pessoalmente.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2"
                asChild
              >
                <Link href="/embarcacoes">
                  Ver Embarcações
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-accent"
                asChild
              >
                <Link href="/contato">Falar com Especialista</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
