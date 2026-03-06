-- ============================================================
-- CONFIGURAÇÕES PADRÃO - Estilos do Hero (título e subtítulo)
-- ============================================================
-- Execute após 003_create_configuracoes.sql
-- Adiciona fonte, tamanho e cor para título e subtítulo do hero
-- ============================================================

INSERT INTO public.configuracoes (chave, valor) VALUES
  ('hero_headline_font', 'var(--font-serif)'),
  ('hero_headline_size', 'clamp(2.5rem, 5vw, 4.5rem)'),
  ('hero_headline_color', '#0c1420'),
  ('hero_subheadline_font', 'var(--font-sans)'),
  ('hero_subheadline_size', '1.125rem'),
  ('hero_subheadline_color', '#64748b')
ON CONFLICT (chave) DO NOTHING;
