CREATE TABLE IF NOT EXISTS public.configuracoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chave TEXT NOT NULL UNIQUE,
  valor TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.configuracoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "configuracoes_public_select" ON public.configuracoes
  FOR SELECT USING (true);

CREATE POLICY "configuracoes_admin_all" ON public.configuracoes
  FOR ALL USING (auth.role() = 'authenticated');

-- Valores padrão
INSERT INTO public.configuracoes (chave, valor) VALUES
  ('hero_headline', 'Propriedade compartilhada de embarcações de alto padrão'),
  ('hero_subheadline', 'Tenha acesso a lanchas premium com gestão profissional completa. Investimento inteligente com até 85% de economia na aquisição.'),
  ('hero_imagem', '/hero-speedboat.jpg'),
  ('contato_email', 'contato@inboat.com.br'),
  ('contato_telefone', '+55 11 4000-4000'),
  ('contato_whatsapp', '5511999999999'),
  ('contato_endereco', 'São Paulo, SP — Brasil'),
  ('social_instagram', 'https://instagram.com/inboat'),
  ('social_facebook', 'https://facebook.com/inboat'),
  ('social_youtube', 'https://youtube.com/@inboat'),
  ('social_tiktok', 'https://tiktok.com/@inboat')
ON CONFLICT (chave) DO NOTHING;
