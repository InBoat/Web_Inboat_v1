# Web InBoat v1

Site institucional da InBoat com painel administrativo, blog, embarcações e integração Supabase + Vercel.

## 🚀 Tecnologias

- **Next.js 16** (App Router)
- **Supabase** (Auth, banco de dados, storage)
- **Vercel** (Deploy e Analytics)
- **Tailwind CSS** + **shadcn/ui**

## 📋 Pré-requisitos

- Node.js 18+
- pnpm (ou npm/yarn)
- Conta no [Supabase](https://supabase.com)
- Conta no [Vercel](https://vercel.com)

## ⚙️ Configuração local

1. **Clone e instale dependências:**
   ```bash
   git clone https://github.com/InBoat/Web_Inboat_v1.git
   cd Web_Inboat_v1
   pnpm install
   ```

2. **Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env
   ```
   Edite o `.env` com suas credenciais do Supabase:
   - `NEXT_PUBLIC_SUPABASE_URL` – URL do projeto (Settings > API)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` – Chave anônima pública

3. **Execute as migrações no Supabase:**
   - Acesse o [SQL Editor](https://supabase.com/dashboard) do seu projeto
   - Execute os scripts em ordem: `scripts/001_create_tables.sql`, `002_create_paginas_legais.sql`, `003_create_configuracoes.sql`, `004_create_blog.sql`
   - Opcional: execute `scripts/02-seed-data.sql` para dados iniciais

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm dev
   ```

## 🗄️ Supabase

### Variáveis necessárias

| Variável | Onde obter |
|----------|------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Dashboard > Settings > API > Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Dashboard > Settings > API > anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Dashboard > Settings > API > service_role (apenas scripts) |

### Tabelas

O projeto usa: `embarcacoes`, `leads`, `faqs`, `paginas_legais`, `configuracoes`, `blog_categorias`, `blog_artigos`.

### Auth

O painel admin (`/admin`) usa autenticação por email/senha. Crie usuários em **Authentication > Users** no Supabase.

## ▲ Vercel

### Deploy

1. Conecte o repositório em [vercel.com/new](https://vercel.com/new)
2. Selecione o projeto **Web_Inboat_v1**
3. Adicione as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy automático a cada push na branch `main`

### Domínio

O site de preview está em `v0-in-boat-web-inboat-v1.vercel.app`. Configure domínio customizado em **Project > Settings > Domains**.

## 📁 Estrutura principal

```
app/
├── admin/           # Painel administrativo
├── api/             # API Routes (leads, blog, configurações)
├── blog/            # Blog público
├── embarcacoes/     # Listagem e detalhes de embarcações
├── contato/         # Formulário de contato
└── ...
lib/
├── supabase/        # Cliente Supabase (client, server, middleware)
├── actions.ts       # Server Actions
└── data.ts          # Funções de dados
scripts/             # Migrações SQL e seeds
```

## 📜 Scripts

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm start` | Servidor de produção |
| `pnpm lint` | Verificação de lint |

## 🔗 Links

- [Repositório GitHub](https://github.com/InBoat/Web_Inboat_v1)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Vercel Dashboard](https://vercel.com/dashboard)
