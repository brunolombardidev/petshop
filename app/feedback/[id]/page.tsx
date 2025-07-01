"use client"

import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  MessageSquare,
  AlertTriangle,
  ThumbsUp,
  MessageCircle,
  User,
  Mail,
  Calendar,
  Hash,
  CheckCircle,
  MessageCircleReply,
} from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

// Dados simulados de feedbacks
const feedbacksData = {
  "1": {
    id: "1",
    tipo: "reclamacao",
    assunto: "Problema com agendamento",
    descricao:
      "Não consegui agendar um horário para meu pet no sistema. O calendário não carrega corretamente e sempre apresenta erro quando tento selecionar uma data. Já tentei em diferentes navegadores e o problema persiste. Preciso urgentemente agendar uma consulta para meu cachorro que está com problemas de saúde.",
    status: "em_analise",
    prioridade: "alta",
    data: "2024-01-15",
    protocolo: "#1234",
    nome: "Maria Silva",
    email: "maria.silva@email.com",
    resposta: null,
    dataResposta: null,
  },
  "2": {
    id: "2",
    tipo: "elogio",
    assunto: "Excelente atendimento",
    descricao:
      "Gostaria de parabenizar toda a equipe pelo atendimento excepcional. Meu pet foi muito bem cuidado durante o procedimento de castração. A veterinária foi muito atenciosa e explicou todo o processo. O pós-operatório também foi acompanhado de perto. Recomendo a todos!",
    status: "respondido",
    prioridade: "baixa",
    data: "2024-01-12",
    protocolo: "#1235",
    nome: "João Santos",
    email: "joao.santos@email.com",
    resposta:
      "Olá João! Ficamos muito felizes com seu feedback positivo. Nossa equipe se dedica diariamente para oferecer o melhor atendimento possível para os pets e seus tutores. Agradecemos pela confiança e por nos recomendar. Estamos sempre à disposição!",
    dataResposta: "2024-01-13",
  },
  "3": {
    id: "3",
    tipo: "sugestao",
    assunto: "Melhorias no app",
    descricao:
      "Seria interessante ter notificações push para lembrar dos agendamentos e vacinas dos pets. Também sugiro a implementação de um histórico mais detalhado dos serviços realizados, com fotos e relatórios dos veterinários. Outra sugestão é ter um chat direto com a clínica para tirar dúvidas rápidas.",
    status: "em_desenvolvimento",
    prioridade: "media",
    data: "2024-01-10",
    protocolo: "#1236",
    nome: "Ana Costa",
    email: "ana.costa@email.com",
    resposta:
      "Olá Ana! Suas sugestões são excelentes e já estão sendo avaliadas pela nossa equipe de desenvolvimento. As notificações push estão previstas para a próxima atualização do app. O histórico detalhado e o chat também estão no nosso roadmap. Obrigado pelas sugestões valiosas!",
    dataResposta: "2024-01-11",
  },
  "4": {
    id: "4",
    tipo: "reclamacao",
    assunto: "Erro no pagamento",
    descricao:
      "Tentei efetuar o pagamento de um serviço mas o sistema apresentou erro. O valor foi debitado mas o serviço não foi confirmado. Já entrei em contato com meu banco e eles confirmaram que o pagamento foi processado. Preciso de uma solução urgente pois meu pet precisa do atendimento.",
    status: "resolvido",
    prioridade: "alta",
    data: "2024-01-08",
    protocolo: "#1237",
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@email.com",
    resposta:
      "Olá Carlos! Identificamos o problema em nosso sistema de pagamentos e já foi corrigido. Seu serviço foi confirmado e o agendamento está ativo. Pedimos desculpas pelo transtorno e oferecemos um desconto de 20% no próximo serviço como forma de compensação. Problema resolvido!",
    dataResposta: "2024-01-09",
  },
}

export default function FeedbackDetalhePage() {
  const router = useRouter()
  const params = useParams()
  const feedbackId = params.id as string

  const feedback = feedbacksData[feedbackId as keyof typeof feedbacksData]

  if (!feedback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-yellow-50/50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-2xl bg-white/95 backdrop-blur-sm rounded-2xl">
          <CardContent className="text-center p-8">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Feedback não encontrado</h2>
            <p className="text-gray-600 mb-4">O feedback solicitado não existe ou foi removido.</p>
            <Button onClick={() => router.push("/feedback")} className="rounded-xl">
              Voltar para Feedbacks
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "reclamacao":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case "elogio":
        return <ThumbsUp className="w-5 h-5 text-green-500" />
      case "sugestao":
        return <MessageCircle className="w-5 h-5 text-blue-500" />
      default:
        return <MessageSquare className="w-5 h-5 text-gray-500" />
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
                {getTipoIcon(feedback.tipo)}
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">{feedback.assunto}</h1>
                <p className="text-sm text-gray-600">
                  {getTipoLabel(feedback.tipo)} • {feedback.protocolo}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Informações do Feedback */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                    {getTipoIcon(feedback.tipo)}
                    {feedback.assunto}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {getTipoLabel(feedback.tipo)} enviado em {new Date(feedback.data).toLocaleDateString("pt-BR")}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {getStatusBadge(feedback.status)}
                  {getPrioridadeBadge(feedback.prioridade)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Detalhes do Remetente */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{feedback.nome}</p>
                    <p className="text-xs text-gray-600">Remetente</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{feedback.email}</p>
                    <p className="text-xs text-gray-600">E-mail</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{feedback.protocolo}</p>
                    <p className="text-xs text-gray-600">Protocolo</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Descrição */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">Descrição</h3>
                <p className="text-gray-700 leading-relaxed">{feedback.descricao}</p>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-4">Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Feedback enviado</p>
                      <p className="text-sm text-gray-600">
                        {new Date(feedback.data).toLocaleDateString("pt-BR")} às{" "}
                        {new Date(feedback.data).toLocaleTimeString("pt-BR")}
                      </p>
                    </div>
                  </div>

                  {feedback.resposta && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <MessageCircleReply className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Resposta enviada</p>
                        <p className="text-sm text-gray-600">
                          {new Date(feedback.dataResposta!).toLocaleDateString("pt-BR")} às{" "}
                          {new Date(feedback.dataResposta!).toLocaleTimeString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  )}

                  {feedback.status === "resolvido" && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Feedback resolvido</p>
                        <p className="text-sm text-gray-600">Problema solucionado com sucesso</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resposta */}
          {feedback.resposta && (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <MessageCircleReply className="w-5 h-5 text-green-500" />
                  Resposta da Equipe
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Respondido em {new Date(feedback.dataResposta!).toLocaleDateString("pt-BR")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-green-50 rounded-xl">
                  <p className="text-gray-700 leading-relaxed">{feedback.resposta}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ações */}
          <div className="flex gap-4">
            <Button onClick={() => router.push("/feedback")} variant="outline" className="flex-1 h-12 rounded-xl">
              Voltar para Feedbacks
            </Button>
            {feedback.status !== "resolvido" && (
              <Button
                onClick={() => router.push("/feedback/novo")}
                className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl"
              >
                Enviar Novo Feedback
              </Button>
            )}
          </div>
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
    </div>
  )
}
