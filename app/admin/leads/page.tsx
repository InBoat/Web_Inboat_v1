"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Mail, Phone, Trash2, Calendar, RefreshCw } from "lucide-react"
import { deleteLead, updateLeadStatus } from "@/lib/actions"
import { createClient } from "@/lib/supabase/client"

type Lead = {
  id: string
  nome: string
  email: string
  telefone?: string
  mensagem?: string
  embarcacao_nome?: string
  status: string
  created_at: string
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchLeads() {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
    setLeads(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este lead?")) return
    await deleteLead(id)
    setLeads(leads.filter((l) => l.id !== id))
  }

  async function handleStatusChange(id: string, status: string) {
    await updateLeadStatus(id, status)
    setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)))
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  const statusColors: Record<string, string> = {
    novo: "bg-primary/10 text-primary",
    em_contato: "bg-yellow-500/10 text-yellow-600",
    convertido: "bg-green-500/10 text-green-600",
    descartado: "bg-muted text-muted-foreground",
  }

  const statusLabels: Record<string, string> = {
    novo: "Novo",
    em_contato: "Em Contato",
    convertido: "Convertido",
    descartado: "Descartado",
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Leads Recebidos</h1>
          <p className="text-muted-foreground">Gerencie os contatos recebidos pelo formulário do site</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchLeads} className="bg-transparent">
          <RefreshCw className="h-4 w-4 mr-2" />
          Atualizar
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : leads.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">Nenhum lead recebido ainda</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <Card key={lead.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-foreground">{lead.nome}</CardTitle>
                    <div className="flex flex-wrap items-center gap-4 mt-1">
                      <a
                        href={`mailto:${lead.email}`}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        {lead.email}
                      </a>
                      {lead.telefone && (
                        <a
                          href={`tel:${lead.telefone}`}
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          {lead.telefone}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {lead.embarcacao_nome && (
                      <Badge variant="secondary">{lead.embarcacao_nome}</Badge>
                    )}
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded font-medium border-0 cursor-pointer ${statusColors[lead.status] ?? "bg-muted text-muted-foreground"}`}
                    >
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(lead.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {lead.mensagem && (
                <CardContent>
                  <p className="text-muted-foreground mb-3">{lead.mensagem}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(lead.created_at)}</span>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
