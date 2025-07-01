"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  MessageSquare,
  Plus,
  AlertTriangle,
  ThumbsUp,
  MessageCircle,
  Clock,
  ChevronRight,
} from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

// Dados simulados de feedbacks
const feedbacks = [
  {
    id: "1",
    tipo: "reclamacao",
    assunto: "Problema com agendamento",
    descricao: "Não consegui agendar um horário para meu pet no sistema. O calendário não carrega corretamente.",
    status: "em_analise",
    prioridade: "alta",
    data: "2024-01-15",
    protocolo: "#1234",
    nome: "Maria Silva",
  },
  {
    id: "2",
    tipo: "elogio",
    assunto: "Excelente atendimento",
    descricao: "Gostaria de parabenizar toda a equipe pelo atendimento excepcional. Meu pet foi muito bem cuidado.",
    status: "respondido",
    prioridade: "baixa",
    data: "2024-01-12",
    protocolo: "#1235",
    nome: "João Santos",
  },
  {
    id: "3",
    tipo: "sugestao",
    assunto: "Melhorias no app",
    descricao: "Seria interessante ter notificações push para lembrar dos agendamentos e vacinas dos pets.",
    status: "em_desenvolvimento",
    prioridade: "media",
    data: "2024-01-10",
    protocolo: "#1236",
    nome: "Ana Costa",
  },
  {
    id: "4",
    tipo: "reclamacao",
    assunto: "Erro no pagamento",
    descricao:
      "Tentei efetuar o pagamento de um serviço mas o sistema apresentou erro. O valor foi debitado mas o serviço não foi confirmado.",
    status: "resolvido",
    prioridade: "alta",
    data: "2024-01-08",
    protocolo: "#1237",
    nome: "Carlos Oliveira",
  },
]

export default function FeedbackPage() {
  const router = useRouter()

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "reclamacao":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "elogio":
        return <ThumbsUp className="w-4 h-4 text-green-500" />
      case "sugestao":
        return <MessageCircle className="w-4 h-4 text-blue-500" />
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />
    }
  }

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case "reclamacao":
        return "Reclamação"
      case "elogio":
        return "Elogio"
      case "sugestao":
        return "Sugestão"
      default:
        return "Feedback"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "em_analise":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Em Análise
          </Badge>
        )
      case "respondido":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Respondido
          </Badge>
        )
      case "em_desenvolvimento":
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            Em Desenvolvimento
          </Badge>
        )
      case "resolvido":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Resolvido
          </Badge>
        )
      default:
        return <Badge variant="secondary">Pendente</Badge>
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
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Feedback</h1>
                <p className="text-sm text-gray-600">Seus feedbacks e sugestões</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Botão Novo Feedback */}
      <div className="px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => router.push("/feedback/novo")}
            className="h-14 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Feedback
          </Button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Lista de Feedbacks */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Seus Feedbacks</h2>

            {feedbacks.map((feedback) => (
              <Card
                key={feedback.id}
                className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-200 group"
                onClick={() => router.push(`/feedback/${feedback.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getTipoIcon(feedback.tipo)}
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
                          {feedback.assunto}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {getTipoLabel(feedback.tipo)} • {feedback.protocolo}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-2">{feedback.descricao}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(feedback.status)}
                      {getPrioridadeBadge(feedback.prioridade)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {new Date(feedback.data).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mensagem quando não há feedbacks */}
          {feedbacks.length === 0 && (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="text-center p-12">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum feedback ainda</h3>
                <p className="text-gray-600 mb-6">
                  Você ainda não enviou nenhum feedback. Que tal compartilhar sua experiência?
                </p>
                <Button
                  onClick={() => router.push("/feedback/novo")}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Enviar Primeiro Feedback
                </Button>
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
