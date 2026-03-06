import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Ship, FileText, ScrollText } from "lucide-react"
import Link from "next/link"
import { getEmbarcacoes, getLeads } from "@/lib/actions"

export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
  const [embarcacoes, leads] = await Promise.all([getEmbarcacoes(), getLeads()])

  const totalEmbarcacoes = embarcacoes.length
  const totalLeads = leads.length
  const leadsNovos = leads.filter((l: any) => l.status === "novo").length

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Painel Administrativo</h1>
        <p className="text-muted-foreground">Gerencie o conteúdo da plataforma InBoat</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Embarcações</CardTitle>
            <Ship className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalEmbarcacoes}</div>
            <p className="text-xs text-muted-foreground mt-1">Cadastradas no sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leads Totais</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">Contatos recebidos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leads Novos</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{leadsNovos}</div>
            <p className="text-xs text-muted-foreground mt-1">Aguardando resposta</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions + Recent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link href="/admin/embarcacoes">
                <Ship className="h-4 w-4 mr-2" />
                Gerenciar Embarcações
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full justify-start bg-transparent">
              <Link href="/admin/leads">
                <FileText className="h-4 w-4 mr-2" />
                Ver Leads
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full justify-start bg-transparent">
              <Link href="/admin/conteudo">
                <ScrollText className="h-4 w-4 mr-2" />
                Editar Conteúdo Legal
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Embarcações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {embarcacoes.slice(0, 3).map((e: any) => (
                <div key={e.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{e.nome}</p>
                    <p className="text-sm text-muted-foreground">{e.localizacao}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${e.disponivel ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {e.disponivel ? "Ativo" : "Inativo"}
                  </span>
                </div>
              ))}
              {embarcacoes.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">Nenhuma embarcação cadastrada</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
