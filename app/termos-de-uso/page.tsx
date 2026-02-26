import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermosDeUsoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-8 text-balance">Termos de Uso</h1>
          <div className="prose prose-neutral max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-foreground font-medium">Última atualização: Fevereiro de 2026</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">1. Aceitação dos Termos</h2>
            <p>Ao acessar e utilizar o site InBoat (inboat.com.br), você concorda com estes Termos de Uso. Se não concordar com qualquer parte destes termos, solicitamos que não utilize nosso site.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">2. Descrição do Serviço</h2>
            <p>A InBoat atua como administradora de sistemas de multipropriedade (cotas) de embarcações náuticas. Nossa plataforma conecta interessados em adquirir cotas de embarcações de alto padrão, oferecendo gestão profissional completa incluindo manutenção, reservas, documentação e seguros.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">3. Cadastro e Conta</h2>
            <p>Para utilizar determinados serviços, o usuário poderá ser solicitado a fornecer informações pessoais verdadeiras, completas e atualizadas. O usuário é responsável por manter a confidencialidade de sua conta e senha.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">4. Propriedade Compartilhada</h2>
            <p>A aquisição de cotas de embarcações está sujeita a contrato específico entre as partes. As informações disponibilizadas no site são de caráter informativo e não constituem oferta vinculante. Os valores, condições e disponibilidade estão sujeitos a alterações sem aviso prévio.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">5. Propriedade Intelectual</h2>
            <p>Todo o conteúdo do site, incluindo textos, imagens, logotipos, marcas e elementos visuais, é de propriedade da InBoat ou de seus licenciantes e está protegido pelas leis de propriedade intelectual brasileiras.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">6. Limitação de Responsabilidade</h2>
            <p>A InBoat não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso ou impossibilidade de uso do site. As informações são fornecidas "como estão" sem garantias de qualquer tipo.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">7. Alterações nos Termos</h2>
            <p>A InBoat reserva-se o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação no site.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">8. Foro</h2>
            <p>Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de São Paulo, Estado de São Paulo, para dirimir quaisquer questões decorrentes destes termos.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">9. Contato</h2>
            <p>Para dúvidas sobre estes Termos de Uso, entre em contato pelo e-mail: contato@inboat.com.br</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
