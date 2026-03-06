-- Tabela para gerenciar conteúdo de páginas legais (Termos de Uso e Política de Privacidade)
CREATE TABLE IF NOT EXISTS public.paginas_legais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  titulo TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  ultima_atualizacao TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.paginas_legais ENABLE ROW LEVEL SECURITY;

CREATE POLICY "paginas_legais_public_select" ON public.paginas_legais
  FOR SELECT USING (true);

CREATE POLICY "paginas_legais_admin_all" ON public.paginas_legais
  FOR ALL USING (auth.role() = 'authenticated');
