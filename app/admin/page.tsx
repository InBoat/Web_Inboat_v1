"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Ship, Users, FileText, Plus } from "lucide-react"
import Link from "next/link"
import { boats } from "@/lib/data"

export default function AdminDashboard() {
  const totalBoats = boats.length
  const totalAvailableShares = boats.reduce((sum, boat) => sum + boat.available_shares, 0)
  const totalShares = boats.reduce((sum, boat) => sum + boat.total_shares, 0)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Painel Administrativo</h1>
        <p className="text-muted-foreground">Gerencie o conteúdo da landing page InBoat</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Embarcações</CardTitle>
            <Ship className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalBoats}</div>
            <p className="text-xs text-muted-foreground mt-1">Cadastradas no sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cotas Disponíveis</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalAvailableShares}</div>
            <p className="text-xs text-muted-foreground mt-1">De {totalShares} cotas totais</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leads Recebidos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">0</div>
            <p className="text-xs text-muted-foreground mt-1">Contatos via formulário</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Embarcações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {boats.slice(0, 3).map((boat) => (
                <div key={boat.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{boat.name}</p>
                    <p className="text-sm text-muted-foreground">{boat.available_shares} cotas disponíveis</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                    {boat.status === "active" ? "Ativo" : "Inativo"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
