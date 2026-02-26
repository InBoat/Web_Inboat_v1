import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getFaqs } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle, ArrowRight } from "lucide-react"

export default async function FAQPage() {
  const faqs = await getFaqs()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-20 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium tracking-widest uppercase mb-6">
                <HelpCircle className="h-3 w-3" />
                <span>Tire suas dúvidas</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance leading-tight">
                Perguntas Frequentes
              </h1>
              <p className="text-muted-foreground leading-relaxed text-pretty text-base md:text-lg">
                Encontre respostas para as principais dúvidas sobre o sistema de multipropriedade náutica da InBoat.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {faqs.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">Nenhuma pergunta cadastrada ainda.</p>
              ) : (
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq: any) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className="border border-border rounded-lg px-6 bg-card data-[state=open]:border-primary/40 transition-colors"
                    >
                      <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                        {faq.pergunta}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                        {faq.resposta}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}

              <div className="mt-14 text-center p-8 rounded-lg border border-border bg-card">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">Ainda tem dúvidas?</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Nossa equipe está disponível para responder qualquer pergunta sobre o modelo de multipropriedade.
                </p>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2" asChild>
                  <Link href="/contato">
                    Falar com nossa equipe
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
