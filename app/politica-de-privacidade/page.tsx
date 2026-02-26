import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-8 text-balance">Política de Privacidade</h1>
          <div className="prose prose-neutral max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-foreground font-medium">Última atualização: Fevereiro de 2026</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">1. Informações que Coletamos</h2>
            <p>Coletamos informações pessoais que você nos fornece voluntariamente ao entrar em contato, preencher formulários ou demonstrar interesse em nossos serviços. Isso pode incluir: nome completo, e-mail, telefone, CPF/CNPJ e informações relacionadas ao interesse em embarcações.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">2. Como Utilizamos suas Informações</h2>
            <p>Utilizamos as informações coletadas para: responder suas solicitações e dúvidas; enviar informações sobre embarcações disponíveis; processar e gerenciar contratos de cotas; cumprir obrigações legais e regulatórias; melhorar nossos serviços e experiência do usuário.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">3. Compartilhamento de Dados</h2>
            <p>Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing. Podemos compartilhar dados com parceiros operacionais (marinas, seguradoras, prestadores de manutenção) estritamente necessários para a prestação dos serviços contratados.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">4. Segurança dos Dados</h2>
            <p>Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">5. Cookies</h2>
            <p>Nosso site pode utilizar cookies para melhorar a experiência de navegação. Cookies são pequenos arquivos armazenados em seu dispositivo que nos ajudam a entender como você interage com nosso site.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">6. Seus Direitos (LGPD)</h2>
            <p>Em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem direito a: acessar seus dados pessoais; solicitar correção de dados incompletos ou desatualizados; solicitar a eliminação de dados desnecessários; revogar o consentimento para tratamento de dados; solicitar portabilidade dos dados.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">7. Retenção de Dados</h2>
            <p>Mantemos suas informações pessoais pelo tempo necessário para cumprir as finalidades para as quais foram coletadas, incluindo obrigações legais, contratuais e regulatórias.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">8. Alterações nesta Política</h2>
            <p>Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você revise esta página regularmente para se manter informado sobre quaisquer mudanças.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">9. Contato do Encarregado (DPO)</h2>
            <p>Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de seus dados pessoais, entre em contato pelo e-mail: privacidade@inboat.com.br</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
