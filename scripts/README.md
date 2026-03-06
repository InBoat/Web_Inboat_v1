# Scripts SQL - InBoat

Execute no **SQL Editor** do Supabase (Dashboard > SQL Editor) na ordem indicada.

## Ordem de execução

1. `001_create_tables.sql` ou `01-create-tables.sql` – tabelas principais
2. `002_create_paginas_legais.sql` – páginas legais
3. `003_create_configuracoes.sql` – configurações do site
4. `004_create_blog.sql` – blog
5. **`005_hero_storage.sql`** – bucket para upload de imagens do hero (habilita "Escolher arquivo")
6. **`006_add_hero_config_defaults.sql`** – estilos padrão do título e subtítulo (fonte, tamanho, cor)

## Upload de imagens do Hero

Para o botão **"Escolher arquivo"** funcionar nas Configurações:

1. Execute `005_hero_storage.sql` no Supabase
2. Adicione `SUPABASE_SERVICE_ROLE_KEY` no `.env.local` e nas variáveis do Vercel

Obtenha a Service Role Key em: Supabase Dashboard > Project Settings > API > service_role (secret)

## Editor de texto do Hero

O painel de Configurações permite editar:

- **Título principal** – texto, fonte, tamanho e cor
- **Subtítulo** – texto, fonte, tamanho e cor
- **Imagem de fundo** – URL ou upload de arquivo

Execute `006_add_hero_config_defaults.sql` para ter os valores padrão de estilo no banco.
