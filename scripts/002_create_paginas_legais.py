import os
import requests

supabase_url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not supabase_url or not supabase_key:
    print("ERRO: Variáveis de ambiente não encontradas.")
    exit(1)

headers = {
    "apikey": supabase_key,
    "Authorization": f"Bearer {supabase_key}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal",
}

# Insere os registros iniciais com upsert baseado no slug
paginas = [
    {
        "slug": "termos-de-uso",
        "titulo": "Termos de Uso",
        "conteudo": """<h2>1. Aceitação dos Termos</h2>
<p>Ao acessar e utilizar o site InBoat (inboat.com.br), você concorda com estes Termos de Uso. Se não concordar com qualquer parte destes termos, solicitamos que não utilize nosso site.</p>

<h2>2. Descrição do Serviço</h2>
<p>A InBoat atua como administradora de sistemas de multipropriedade (cotas) de embarcações náuticas. Nossa plataforma conecta interessados em adquirir cotas de embarcações de alto padrão, oferecendo gestão profissional completa incluindo manutenção, reservas, documentação e seguros.</p>

<h2>3. Cadastro e Conta</h2>
<p>Para utilizar determinados serviços, o usuário poderá ser solicitado a fornecer informações pessoais verdadeiras, completas e atualizadas. O usuário é responsável por manter a confidencialidade de sua conta e senha.</p>

<h2>4. Propriedade Compartilhada</h2>
<p>A aquisição de cotas de embarcações está sujeita a contrato específico entre as partes. As informações disponibilizadas no site são de caráter informativo e não constituem oferta vinculante.</p>

<h2>5. Propriedade Intelectual</h2>
<p>Todo o conteúdo do site, incluindo textos, imagens, logotipos, marcas e elementos visuais, é de propriedade da InBoat ou de seus licenciantes e está protegido pelas leis de propriedade intelectual brasileiras.</p>

<h2>6. Limitação de Responsabilidade</h2>
<p>A InBoat não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso ou impossibilidade de uso do site.</p>

<h2>7. Alterações nos Termos</h2>
<p>A InBoat reserva-se o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação no site.</p>

<h2>8. Foro</h2>
<p>Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de São Paulo, Estado de São Paulo.</p>

<h2>9. Contato</h2>
<p>Para dúvidas sobre estes Termos de Uso, entre em contato pelo e-mail: contato@inboat.com.br</p>""",
        "ultima_atualizacao": "Fevereiro de 2026",
    },
    {
        "slug": "politica-de-privacidade",
        "titulo": "Política de Privacidade",
        "conteudo": """<h2>1. Informações que Coletamos</h2>
<p>Coletamos informações pessoais que você nos fornece voluntariamente ao entrar em contato, preencher formulários ou demonstrar interesse em nossos serviços. Isso pode incluir: nome completo, e-mail, telefone, CPF/CNPJ e informações relacionadas ao interesse em embarcações.</p>

<h2>2. Como Utilizamos suas Informações</h2>
<p>Utilizamos as informações coletadas para: responder suas solicitações e dúvidas; enviar informações sobre embarcações disponíveis; processar e gerenciar contratos de cotas; cumprir obrigações legais e regulatórias; melhorar nossos serviços e experiência do usuário.</p>

<h2>3. Compartilhamento de Dados</h2>
<p>Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing. Podemos compartilhar dados com parceiros operacionais estritamente necessários para a prestação dos serviços contratados.</p>

<h2>4. Segurança dos Dados</h2>
<p>Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.</p>

<h2>5. Cookies</h2>
<p>Nosso site pode utilizar cookies para melhorar a experiência de navegação. Cookies são pequenos arquivos armazenados em seu dispositivo que nos ajudam a entender como você interage com nosso site.</p>

<h2>6. Seus Direitos (LGPD)</h2>
<p>Em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem direito a: acessar seus dados pessoais; solicitar correção de dados incompletos ou desatualizados; solicitar a eliminação de dados desnecessários; revogar o consentimento para tratamento de dados.</p>

<h2>7. Retenção de Dados</h2>
<p>Mantemos suas informações pessoais pelo tempo necessário para cumprir as finalidades para as quais foram coletadas, incluindo obrigações legais, contratuais e regulatórias.</p>

<h2>8. Alterações nesta Política</h2>
<p>Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você revise esta página regularmente para se manter informado sobre quaisquer mudanças.</p>

<h2>9. Contato do Encarregado (DPO)</h2>
<p>Para exercer seus direitos ou esclarecer dúvidas, entre em contato pelo e-mail: privacidade@inboat.com.br</p>""",
        "ultima_atualizacao": "Fevereiro de 2026",
    },
]

print("Inserindo páginas legais no Supabase...")

for pagina in paginas:
    res = requests.post(
        f"{supabase_url}/rest/v1/paginas_legais",
        json=pagina,
        headers={**headers, "Prefer": "resolution=merge-duplicates,return=minimal"},
    )
    if res.status_code in (200, 201, 204):
        print(f"  OK: {pagina['slug']}")
    else:
        print(f"  ERRO [{pagina['slug']}]: {res.status_code} - {res.text}")

print("Concluído.")
