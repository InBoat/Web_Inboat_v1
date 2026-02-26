import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Ship, Users, Calendar, Shield, DollarSign, Wrench, CheckCircle2 } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Como Funciona o InBoat
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Entenda como o sistema de time share náutico funciona e como você pode ter acesso a embarcações de luxo
                com investimento acessível.
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Escolha sua Embarcação</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Navegue pelo nosso catálogo de embarcações premium. Cada iate ou lancha foi cuidadosamente
                    selecionado por nossa equipe e passa por rigorosa inspeção de qualidade e segurança.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Embarcações de marcas renomadas</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Manutenção profissional garantida</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Localizações estratégicas</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Adquira suas Cotas</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Cada embarcação é dividida em 12 cotas. Você pode adquirir uma ou mais cotas, dependendo da
                    frequência de uso desejada. Quanto mais cotas, mais dias de uso você terá.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Investimento a partir de R$ 180.000</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Contrato transparente e seguro</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Possibilidade de revenda das cotas</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Reserve e Navegue</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Acesse nosso portal online e faça suas reservas com antecedência. O sistema é intuitivo e permite
                    visualizar a disponibilidade em tempo real.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Sistema de reservas 24/7</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Calendário compartilhado entre cotistas</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Suporte para planejamento de viagens</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">O Que Está Incluído</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Todos os serviços essenciais para você aproveitar sua embarcação sem preocupações
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <Wrench className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Manutenção Completa</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Manutenção preventiva e corretiva, limpeza após cada uso, e inspeções regulares.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Shield className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Seguro Total</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Cobertura completa contra danos, acidentes e responsabilidade civil.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Ship className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Atracação</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Vaga garantida em marinas de primeira linha com toda infraestrutura.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Users className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Suporte Dedicado</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Equipe disponível para auxiliar em reservas, dúvidas e emergências.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Calendar className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Gestão de Reservas</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sistema online intuitivo para agendamento e gerenciamento de suas reservas.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <DollarSign className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Custos Previsíveis</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Taxa mensal fixa que cobre todos os custos operacionais da embarcação.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Pronto para Começar sua Jornada Náutica?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Entre em contato com nossa equipe para agendar uma visita e conhecer nossas embarcações pessoalmente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/embarcacoes">Ver Embarcações</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
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
