"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MessageSquare, Search, Plus, Star, ThumbsUp, ThumbsDown } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

// Dados mockados dos feedbacks
const feedbacksMockados = [
  {
    id: "1",
    titulo: "Excelente atendimento na clínica",
    mensagem: "Fui muito bem atendido na Clínica VetCare. A equipe é muito profissional e cuidadosa com os animais.",
    categoria: "Atendimento",
    avaliacao: 5,
    data: "2024-01-15",
    status: "Publicado",
    empresa: "Clínica VetCare",
  },
  {
    id: "2",
    titulo: "Produto de qualidade",
    mensagem: "A ração Premium que comprei é excelente. Meu cão adorou e melhorou muito a pelagem.",
    categoria: "Produto",
    avaliacao: 4,
    data: "2024-01-10",
    status: "Aguardando",
    empresa: "Pet Food Premium",
  },
  {
    id: "3",
    titulo: "Demora na entrega",
    mensagem: "O produto é bom, mas a entrega demorou mais que o prometido. Poderiam melhorar a logística.",
    categoria: "Entrega",
    avaliacao: 2,
    data: "2024-01-08",
    status: "Publicado",
    empresa: "PetShop Online",
  },
]

export default function FeedbackPage() {
  const router = useRouter()
  const [feedbacks, setFeedbacks] = useState(feedbacksMockados)
  const [filtro, setFiltro] = useState("")

  const feedbacksFiltrados = feedbacks.filter(
    (feedback) =>
      feedback.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      feedback.categoria.toLowerCase().includes(filtro.toLowerCase()) ||
      feedback.empresa.toLowerCase().includes(filtro.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Publicado":
        return <Badge className="bg-green-100 text-green-800 border-0">Publicado</Badge>
      case "Aguardando":
        return <Badge className="bg-yellow-100 text-yellow-800 border-0">Aguardando</Badge>
      case "Rejeitado":
        return <Badge className="bg-red-100 text-red-800 border-0">Rejeitado</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">-</Badge>
    }
  }

  const getCategoriaBadge = (categoria: string) => {
    switch (categoria) {
      case "Atendimento":
        return <Badge className="bg-blue-100 text-blue-800 border-0">Atendimento</Badge>
      case "Produto":
        return <Badge className="bg-purple-100 text-purple-800 border-0">Produto</Badge>
      case "Entrega":
        return <Badge className="bg-orange-100 text-orange-800 border-0">Entrega</Badge>
      case "Preço":
        return <Badge className="bg-green-100 text-green-800 border-0">Preço</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">Geral</Badge>
    }
  }

  const renderStars = (avaliacao: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < avaliacao ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D6DD83]/20 via-[#FFBDB6]/20 to-[#30B2B0]/20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-blue-100 rounded-xl">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-bpet-secondary to-bpet-primary rounded-xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Feedback</h1>
                <p className="text-sm text-gray-600">Seus feedbacks e avaliações</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Botão Novo Feedback */}
      <div className="px-6 py-6">
        <div className="max-w-6xl mx-auto flex justify-center">
          <Button
            onClick={() => router.push("/feedback/novo")}
            className="h-14 px-8 py-3 rounded-xl bg-gradient-to-r from-bpet-secondary to-bpet-primary hover:from-bpet-primary hover:to-bpet-secondary text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Feedback
          </Button>
        </div>
      </div>

      {/* Campo de Busca */}
      <div className="px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar feedbacks por título, categoria ou empresa..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="pl-12 h-14 text-lg border-0 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl focus:ring-[#30B2B0]/20 focus:border-[#30B2B0]"
            />
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total de Feedbacks</p>
                    <p className="text-3xl font-bold">{feedbacks.length}</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-primary to-bpet-secondary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Publicados</p>
                    <p className="text-3xl font-bold">{feedbacks.filter((f) => f.status === "Publicado").length}</p>
                  </div>
                  <ThumbsUp className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#D6DD83] to-[#FFBDB6] text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Aguardando</p>
                    <p className="text-3xl font-bold">{feedbacks.filter((f) => f.status === "Aguardando").length}</p>
                  </div>
                  <ThumbsDown className="w-8 h-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#FFBDB6] to-bpet-secondary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Avaliação Média</p>
                    <p className="text-3xl font-bold">
                      {(feedbacks.reduce((sum, f) => sum + f.avaliacao, 0) / feedbacks.length).toFixed(1)}
                    </p>
                  </div>
                  <Star className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Feedbacks */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                Seus Feedbacks
              </CardTitle>
              <CardDescription className="text-gray-600">
                {feedbacksFiltrados.length} feedback{feedbacksFiltrados.length !== 1 ? "s" : ""} encontrado
                {feedbacksFiltrados.length !== 1 ? "s" : ""}
                {filtro && ` para "${filtro}"`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbacksFiltrados.map((feedback) => (
                  <Card
                    key={feedback.id}
                    className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-4">
                        {/* Ícone do feedback */}
                        <div className="w-16 h-16 bg-gradient-to-br from-bpet-secondary to-bpet-primary rounded-xl flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="w-8 h-8 text-white" />
                        </div>

                        {/* Informações do feedback */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3">
                            <div>
                              <h3 className="font-bold text-lg text-gray-900 mb-1">{feedback.titulo}</h3>
                              <p className="text-sm text-blue-600 font-medium mb-2">{feedback.empresa}</p>
                              <div className="flex items-center gap-2 mb-3">
                                {getCategoriaBadge(feedback.categoria)}
                                {getStatusBadge(feedback.status)}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500 mb-2">
                                {new Date(feedback.data).toLocaleDateString("pt-BR")}
                              </p>
                              <div className="flex items-center gap-1">
                                {renderStars(feedback.avaliacao)}
                                <span className="text-sm text-gray-600 ml-1">({feedback.avaliacao}/5)</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-700 text-sm leading-relaxed">{feedback.mensagem}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {feedbacksFiltrados.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum feedback encontrado</h3>
                  <p className="text-gray-600">Tente ajustar sua busca ou crie um novo feedback.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
      {/* Espaçamento para botões flutuantes */}
      <div className="pb-20"></div>
    </div>
  )
}
