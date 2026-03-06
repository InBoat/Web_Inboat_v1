# ✅ Checklist de Deploy — InBoat

**Execute ANTES do deploy ou quando aparecer erro de tabela não encontrada.**

## 1. Scripts SQL no Supabase (OBRIGATÓRIO)

Acesse **Supabase Dashboard > SQL Editor** e execute na ordem:

| Ordem | Script | O que faz |
|-------|--------|-----------|
| 1 | `scripts/001_create_tables.sql` | Tabelas principais (embarcações, leads, etc.) |
| 2 | `scripts/002_create_paginas_legais.sql` | Páginas legais |
| 3 | `scripts/003_create_configuracoes.sql` | Configurações do site |
| 4 | **`scripts/004_create_blog.sql`** | **Blog (categorias + artigos)** — resolve "table blog_categorias not found" |
| 5 | `scripts/005_hero_storage.sql` | Bucket para upload de imagens do hero |
| 6 | `scripts/006_add_hero_config_defaults.sql` | Estilos padrão do hero |

### Erro "Could not find the table blog_categorias"?

Execute `scripts/004_create_blog.sql` no SQL Editor do Supabase.

## 2. Variáveis de ambiente no Vercel

| Variável | Obrigatório |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Sim |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sim |
| `SUPABASE_SERVICE_ROLE_KEY` | Sim (para categorias, artigos, upload hero) |

Obtenha em: **Supabase > Project Settings > API**

## 3. Auth

Crie um usuário em **Supabase > Authentication > Users** para acessar `/admin`.

---

Depois de executar os scripts, faça um novo deploy ou aguarde o cache atualizar.
