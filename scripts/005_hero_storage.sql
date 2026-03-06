-- ============================================================
-- BUCKET HERO - Upload de imagens de fundo da homepage
-- ============================================================
-- Execute este script no SQL Editor do Supabase (Dashboard > SQL Editor)
-- para habilitar o botão "Escolher arquivo" nas Configurações do site.
--
-- Requisitos: SUPABASE_SERVICE_ROLE_KEY no .env.local e no Vercel
-- ============================================================

-- 1. Criar bucket 'hero' no Storage (se não existir)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'hero',
  'hero',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- 2. Políticas de acesso (remover se já existirem e recriar)
DROP POLICY IF EXISTS "hero_upload_authenticated" ON storage.objects;
DROP POLICY IF EXISTS "hero_upload_service_role" ON storage.objects;
DROP POLICY IF EXISTS "hero_public_read" ON storage.objects;

CREATE POLICY "hero_upload_authenticated"
ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'hero');

CREATE POLICY "hero_upload_service_role"
ON storage.objects FOR INSERT TO service_role WITH CHECK (bucket_id = 'hero');

CREATE POLICY "hero_public_read"
ON storage.objects FOR SELECT TO public USING (bucket_id = 'hero');

-- ============================================================
-- ALTERNATIVA: Se o SQL acima falhar, crie o bucket manualmente:
-- Dashboard > Storage > New bucket
-- - Nome: hero
-- - Public: Sim
-- - File size limit: 5 MB
-- - Allowed MIME types: image/jpeg, image/png, image/webp, image/gif
-- ============================================================
