import pg from 'pg'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const connectionString = process.env.SUPABASE_DB_URL

if (!connectionString) {
  console.error('[v0] SUPABASE_DB_URL não encontrada nas variáveis de ambiente.')
  process.exit(1)
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } })

async function migrate() {
  try {
    await client.connect()
    console.log('[v0] Conectado ao Supabase com sucesso.')

    const sql = readFileSync(join(__dirname, '001_create_tables.sql'), 'utf8')
    await client.query(sql)
    console.log('[v0] Tabelas criadas com sucesso: embarcacoes, leads, faqs')

    await client.end()
    console.log('[v0] Migração concluída!')
  } catch (err) {
    console.error('[v0] Erro na migração:', err.message)
    await client.end()
    process.exit(1)
  }
}

migrate()
