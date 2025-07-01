"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bell, AlertTriangle, Info, CheckCircle, Clock, ChevronRight } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

// Dados simulados de notificações
const notificacoes = [
  {
    id: "1",
    titulo: "Nova indicação aprovada",
    texto: "Sua indicação de Maria Silva foi aprovada e você ganhou R$ 50 de comissão.",
    prioridade: "alta",
    tempo: "5 minutos",
    protocolo: "#NOT001",
  },
  {
    id: "2",
    titulo: "Lembrete de pagamento",
    texto: "Sua assinatura vence em 3 dias. Renove para continuar aproveitando todos os benefícios.",
    prioridade: "media",
    tempo: "2 horas",
    protocolo: "#NOT002",
  },
  {
    id: "3",
    titulo: "Feedback respondido",
    texto: "Recebemos uma resposta para seu feedback sobre melhorias no aplicativo.",
    prioridade: "baixa",
    tempo: "1 dia",
    protocolo: "#NOT003",
  },
  {
    id: "4",
    titulo: "Sistema em manutenção",
    texto: "O sistema ficará indisponível das 02:00 às 04:00 para manutenção programada.",
    prioridade: "alta",
    tempo: "3 dias",
    protocolo: "#NOT004",
  },
  {
    id: "5",
    titulo: "Nova funcionalidade disponível",
    texto: "Agora você pode agendar consultas diretamente pelo aplicativo. Confira as novidades!",
    prioridade: "baixa",
    tempo: "1 semana",
    protocolo: "#NOT005",
  },
]

export default function NotificacoesPage() {
  const router = useRouter()

  const getPrioridadeIcon = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "media":
        return <Info className="w-4 h-4 text-yellow-500" />
      case "baixa":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const getPrioridadeLabel = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "Alta"
      case "media":
        return "Média"
      case "baixa":
        return "Baixa"
      default:
        return "Normal"
    }
  }

  const getPrioridadeBadge = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            Alta
          </Badge>
        )
      case "media":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Média
          </Badge>
        )
      case "baixa":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Baixa
          </Badge>
        )
      default:
        return <Badge variant="secondary">Normal</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-yellow-50/50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-orange-100 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Notificações</h1>
                <p className="text-sm text-gray-600">Suas notificações e alertas</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Botão Marcar Todas como Lidas */}
      <div className="px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <Button className="h-14 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200">
            <CheckCircle className="w-5 h-5 mr-2" />
            Marcar Todas como Lidas
          </Button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Lista de Notificações */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Suas Notificações</h2>

            {notificacoes.map((notificacao) => (
              <Card
                key={notificacao.id}
                className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-200 group"
                onClick={() => router.push(`/notificacoes/${notificacao.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getPrioridadeIcon(notificacao.prioridade)}
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                          {notificacao.titulo}
                        </h3>
                        <p className="text-sm text-gray-600">{notificacao.protocolo}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-2">{notificacao.texto}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">{getPrioridadeBadge(notificacao.prioridade)}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {notificacao.tempo} atrás
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mensagem quando não há notificações */}
          {notificacoes.length === 0 && (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="text-center p-12">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhuma notificação</h3>
                <p className="text-gray-600 mb-6">Você está em dia! Não há notificações pendentes no momento.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
      {/* Espaçamento para botões flutuantes */}
      <div className="pb-20"></div>
    </div>
  )
}
