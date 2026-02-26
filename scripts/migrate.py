import os
import urllib.request
import urllib.error
import json

supabase_url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
supabase_key = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if not supabase_url or not supabase_key:
    print("ERRO: Variaveis NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY nao encontradas.")
    exit(1)

print(f"Conectando ao Supabase: {supabase_url}")

# Executa SQL via Supabase REST (usando service role via anon key para DDL)
# Criamos via endpoint /rest/v1/rpc se existir, caso contrario via SQL Editor API
# A forma correta e usar o endpoint de query direta

statements = [
    # Tabela embarcacoes
    """
    CREATE TABLE IF NOT EXISTS public.embarcacoes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      nome TEXT NOT NULL,
      descricao TEXT,
      tipo TEXT NOT NULL DEFAULT 'lancha',
      capacidade INTEGER NOT NULL DEFAULT 10,
      comprimento TEXT,
      motor TEXT,
      velocidade_max TEXT,
      localizacao TEXT NOT NULL DEFAULT 'Angra dos Reis, RJ',
      preco_mensal NUMERIC(10,2) NOT NULL,
      preco_anual NUMERIC(10,2),
      disponivel BOOLEAN NOT NULL DEFAULT true,
      destaque BOOLEAN NOT NULL DEFAULT false,
      imagens TEXT[] NOT NULL DEFAULT '{}',
      caracteristicas TEXT[] NOT NULL DEFAULT '{}',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
    """,
    "ALTER TABLE public.embarcacoes ENABLE ROW LEVEL SECURITY",
    "DROP POLICY IF EXISTS embarcacoes_public_select ON public.embarcacoes",
    "CREATE POLICY embarcacoes_public_select ON public.embarcacoes FOR SELECT USING (true)",
    "DROP POLICY IF EXISTS embarcacoes_admin_all ON public.embarcacoes",
    "CREATE POLICY embarcacoes_admin_all ON public.embarcacoes FOR ALL USING (auth.role() = 'authenticated')",

    # Tabela leads
    """
    CREATE TABLE IF NOT EXISTS public.leads (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      telefone TEXT,
      mensagem TEXT,
      embarcacao_id UUID REFERENCES public.embarcacoes(id) ON DELETE SET NULL,
      embarcacao_nome TEXT,
      status TEXT NOT NULL DEFAULT 'novo',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
    """,
    "ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY",
    "DROP POLICY IF EXISTS leads_insert_public ON public.leads",
    "CREATE POLICY leads_insert_public ON public.leads FOR INSERT WITH CHECK (true)",
    "DROP POLICY IF EXISTS leads_admin_all ON public.leads",
    "CREATE POLICY leads_admin_all ON public.leads FOR ALL USING (auth.role() = 'authenticated')",

    # Tabela faqs
    """
    CREATE TABLE IF NOT EXISTS public.faqs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      pergunta TEXT NOT NULL,
      resposta TEXT NOT NULL,
      ordem INTEGER NOT NULL DEFAULT 0,
      ativo BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
    """,
    "ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY",
    "DROP POLICY IF EXISTS faqs_public_select ON public.faqs",
    "CREATE POLICY faqs_public_select ON public.faqs FOR SELECT USING (true)",
    "DROP POLICY IF EXISTS faqs_admin_all ON public.faqs",
    "CREATE POLICY faqs_admin_all ON public.faqs FOR ALL USING (auth.role() = 'authenticated')",
]

def run_sql(sql):
    url = f"{supabase_url}/rest/v1/rpc/exec_sql"
    payload = json.dumps({"query": sql}).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "apikey": supabase_key,
            "Authorization": f"Bearer {supabase_key}",
        },
        method="POST"
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, resp.read().decode()
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()

# Testa conectividade basica primeiro
print("Testando conectividade com o Supabase...")
test_url = f"{supabase_url}/rest/v1/embarcacoes?select=id&limit=1"
req = urllib.request.Request(
    test_url,
    headers={
        "apikey": supabase_key,
        "Authorization": f"Bearer {supabase_key}",
    }
)
try:
    with urllib.request.urlopen(req) as resp:
        print(f"Conexao OK! Status: {resp.status}")
        print("Tabela 'embarcacoes' ja existe no Supabase.")
        print("\nAs tabelas precisam ser criadas diretamente no SQL Editor do Supabase.")
        print("Acesse: https://supabase.com/dashboard/project/izcusvwdavlivbkvzrgq/sql")
        print("\nCopie e execute o conteudo do arquivo: scripts/001_create_tables.sql")
except urllib.error.HTTPError as e:
    body = e.read().decode()
    if "relation" in body and "does not exist" in body:
        print("Tabela 'embarcacoes' nao existe ainda. Precisa ser criada via SQL Editor.")
    else:
        print(f"Erro HTTP {e.code}: {body}")
except Exception as e:
    print(f"Erro de conexao: {e}")
