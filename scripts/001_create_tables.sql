-- ============================================================
-- InBoat Website — Migration 001
-- Criação das tabelas: embarcacoes, leads, faqs
-- ============================================================

-- Tabela de embarcações exibidas no site
CREATE TABLE IF NOT EXISTS public.embarcacoes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  model           TEXT NOT NULL,
  manufacturer    TEXT NOT NULL,
  year            INTEGER NOT NULL,
  length_meters   NUMERIC(5,2) NOT NULL,
  capacity        INTEGER NOT NULL,
  location        TEXT NOT NULL,
  description     TEXT NOT NULL,
  total_shares    INTEGER NOT NULL DEFAULT 4,
  available_shares INTEGER NOT NULL DEFAULT 4,
  price_per_share NUMERIC(12,2) NOT NULL,
  total_price     NUMERIC(12,2) NOT NULL,
  monthly_maintenance_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
  status          TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  specifications  JSONB DEFAULT '{}',
  images          TEXT[] DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela de leads recebidos pelo formulário de contato
CREATE TABLE IF NOT EXISTS public.leads (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT,
  subject         TEXT,
  message         TEXT NOT NULL,
  boat_interest   TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela de FAQs
CREATE TABLE IF NOT EXISTS public.faqs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question        TEXT NOT NULL,
  answer          TEXT NOT NULL,
  sort_order      INTEGER NOT NULL DEFAULT 0,
  active          BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================

ALTER TABLE public.embarcacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- embarcacoes: leitura pública, escrita apenas autenticados
CREATE POLICY "embarcacoes_select_public"
  ON public.embarcacoes FOR SELECT
  USING (true);

CREATE POLICY "embarcacoes_insert_auth"
  ON public.embarcacoes FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "embarcacoes_update_auth"
  ON public.embarcacoes FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "embarcacoes_delete_auth"
  ON public.embarcacoes FOR DELETE
  USING (auth.role() = 'authenticated');

-- leads: qualquer um pode inserir (formulário público), leitura apenas autenticados
CREATE POLICY "leads_insert_public"
  ON public.leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "leads_select_auth"
  ON public.leads FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "leads_delete_auth"
  ON public.leads FOR DELETE
  USING (auth.role() = 'authenticated');

-- faqs: leitura pública, escrita apenas autenticados
CREATE POLICY "faqs_select_public"
  ON public.faqs FOR SELECT
  USING (true);

CREATE POLICY "faqs_insert_auth"
  ON public.faqs FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "faqs_update_auth"
  ON public.faqs FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "faqs_delete_auth"
  ON public.faqs FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================================
-- Trigger: atualiza updated_at automaticamente em embarcacoes
-- ============================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_embarcacoes_updated_at ON public.embarcacoes;
CREATE TRIGGER set_embarcacoes_updated_at
  BEFORE UPDATE ON public.embarcacoes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
