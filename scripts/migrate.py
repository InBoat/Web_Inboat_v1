import os
import psycopg2

db_url = os.environ.get("SUPABASE_DB_URL")

if not db_url:
    print("ERRO: SUPABASE_DB_URL nao encontrada nas variaveis de ambiente.")
    exit(1)

sql = """
-- Tabela de embarcacoes
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
);

ALTER TABLE public.embarcacoes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "embarcacoes_public_select" ON public.embarcacoes;
CREATE POLICY "embarcacoes_public_select" ON public.embarcacoes
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "embarcacoes_admin_all" ON public.embarcacoes;
CREATE POLICY "embarcacoes_admin_all" ON public.embarcacoes
  FOR ALL USING (auth.role() = 'authenticated');

-- Tabela de leads
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
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "leads_insert_public" ON public.leads;
CREATE POLICY "leads_insert_public" ON public.leads
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "leads_admin_all" ON public.leads;
CREATE POLICY "leads_admin_all" ON public.leads
  FOR ALL USING (auth.role() = 'authenticated');

-- Tabela de faqs
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pergunta TEXT NOT NULL,
  resposta TEXT NOT NULL,
  ordem INTEGER NOT NULL DEFAULT 0,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "faqs_public_select" ON public.faqs;
CREATE POLICY "faqs_public_select" ON public.faqs
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "faqs_admin_all" ON public.faqs;
CREATE POLICY "faqs_admin_all" ON public.faqs
  FOR ALL USING (auth.role() = 'authenticated');
"""

try:
    conn = psycopg2.connect(db_url)
    conn.autocommit = True
    cur = conn.cursor()
    cur.execute(sql)
    cur.close()
    conn.close()
    print("Migracao concluida com sucesso! Tabelas criadas: embarcacoes, leads, faqs")
except Exception as e:
    print(f"ERRO na migracao: {e}")
    exit(1)
