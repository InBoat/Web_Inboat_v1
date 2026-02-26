"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Mail, Phone, Trash2, Calendar } from "lucide-react"
import { type Lead } from "@/lib/data"

// Mock leads for demonstration
const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Carlos Eduardo Silva",
    email: "carlos.silva@email.com",
    phone: "(11) 98765-4321",
    message: "Tenho interesse na Triton 380 HT. Gostaria de mais informações sobre financiamento.",
    boat_interest: "Triton 380 HT",
    created_at: "2026-01-28T10:30:00Z"
  },
  {
    id: "2",
    name: "Marina Rodrigues",
    email: "marina.rodrigues@email.com",
    phone: "(21) 99876-5432",
    message: "Quero saber como funciona o sistema de cotas e se posso visitar as embarcações.",
    boat_interest: undefined,
    created_at: "2026-01-27T15:45:00Z"
  },
  {
    id: "3",
    name: "Roberto Mendes",
    email: "roberto.mendes@email.com",
    phone: "(13) 98765-1234",
    message: "Interesse em pesca esportiva. A Fishing 39 Raptor ainda tem cotas disponíveis?",
    boat_interest: "Fishing 39 Raptor",
    created_at: "2026-01-26T09:15:00Z"
  }
]

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads)

  const handleDelete = (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este lead?")) return
    setLeads(leads.filter(lead => lead.id !== id))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Leads Recebidos</h1>
        <p className="text-muted-foreground">Gerencie os contatos recebidos pelo formulário do site</p>
      </div>

      {leads.length === 0 ? (
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
                    <CardTitle className="text-lg">{lead.name}</CardTitle>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="h-3.5 w-3.5" />
                        <a href={`mailto:${lead.email}`} className="hover:text-primary">
                          {lead.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3.5 w-3.5" />
                        <a href={`tel:${lead.phone}`} className="hover:text-primary">
                          {lead.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {lead.boat_interest && (
                      <Badge variant="secondary">{lead.boat_interest}</Badge>
                    )}
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
              <CardContent>
                <p className="text-muted-foreground mb-3">{lead.message}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(lead.created_at)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
