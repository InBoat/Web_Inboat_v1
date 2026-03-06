-- ============================================================
-- BLOG - Execute este script no Supabase SQL Editor
-- ============================================================
-- 1. Acesse: https://supabase.com/dashboard
-- 2. Selecione seu projeto
-- 3. Menu: SQL Editor > New query
-- 4. Cole TODO o conteúdo abaixo
-- 5. Clique em RUN (ou Ctrl+Enter)
-- ============================================================

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS public.blog_categorias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  descricao TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_categorias ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "blog_categorias_public_select" ON public.blog_categorias;
CREATE POLICY "blog_categorias_public_select" ON public.blog_categorias FOR SELECT USING (true);

DROP POLICY IF EXISTS "blog_categorias_admin_all" ON public.blog_categorias;
CREATE POLICY "blog_categorias_admin_all" ON public.blog_categorias FOR ALL USING (auth.role() = 'authenticated');

-- Tabela de artigos
CREATE TABLE IF NOT EXISTS public.blog_artigos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  categoria_id UUID REFERENCES public.blog_categorias(id) ON DELETE SET NULL,
  imagem_destaque TEXT,
  conteudo TEXT NOT NULL DEFAULT '',
  resumo TEXT,
  autor TEXT NOT NULL DEFAULT 'Equipe InBoat',
  status TEXT NOT NULL DEFAULT 'rascunho',
  destaque BOOLEAN NOT NULL DEFAULT false,
  popular BOOLEAN NOT NULL DEFAULT false,
  recomendado BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[] NOT NULL DEFAULT '{}',
  meta_titulo TEXT,
  meta_descricao TEXT,
  data_publicacao TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_artigos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "blog_artigos_public_select" ON public.blog_artigos;
CREATE POLICY "blog_artigos_public_select" ON public.blog_artigos FOR SELECT USING (true);

DROP POLICY IF EXISTS "blog_artigos_admin_all" ON public.blog_artigos;
CREATE POLICY "blog_artigos_admin_all" ON public.blog_artigos FOR ALL USING (auth.role() = 'authenticated');

-- Categorias iniciais
INSERT INTO public.blog_categorias (nome, slug, descricao) VALUES
  ('Multipropriedade Náutica', 'multipropriedade-nautica', 'Tudo sobre o modelo de multipropriedade de embarcações'),
  ('Custos e Investimento', 'custos-e-investimento', 'Análises financeiras e comparativos de custo'),
  ('Guia do Comprador Náutico', 'guia-do-comprador', 'Dicas e orientações para quem quer entrar no mercado náutico'),
  ('Mercado Náutico', 'mercado-nautico', 'Tendências e novidades do setor náutico brasileiro'),
  ('Franquia Náutica', 'franquia-nautica', 'Oportunidades de negócio no setor náutico'),
  ('Documentação e Legislação', 'documentacao-e-legislacao', 'Regulamentações, documentos e legislação náutica')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Pronto! Recarregue a página de categorias no admin.
-- ============================================================
