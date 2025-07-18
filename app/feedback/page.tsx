"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, MessageSquare, Search, Plus, Star, ThumbsUp, ThumbsDown, Trash2 } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"
import { feedbackService, type Feedback } from "@/services/feedback.service"
import { useAuthState } from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast"

export default function FeedbackPage() {
  const router = useRouter()
  const { isAdmin } = useAuthState()
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    loadFeedbacks()
  }, [])

  const loadFeedbacks = async () => {
    try {
      setLoading(true)
      const response = await feedbackService.getFeedbacks({
        page: 1,
        limit: 100,
      })
      setFeedbacks(response.data)
    } catch (error) {
      console.error("Erro ao carregar feedbacks:", error)
      toast({
        title: "Erro",
        description: "Erro ao carregar feedbacks. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await feedbackService.deleteFeedback(id)
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id))
      toast({
        title: "Sucesso!",
        description: "Feedback excluído com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao excluir feedback:", error)
      toast({
        title: "Erro",
        description: "Erro ao excluir feedback. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setDeletingId(null)
    }
  }

  const feedbacksFiltrados = feedbacks.filter(
    (feedback) =>
      feedback.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      feedback.categoria.toLowerCase().includes(filtro.toLowerCase()) ||
      feedback.empresa.toLowerCase().includes(filtro.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "publicado":
        return <Badge className="bg-green-100 text-green-800 border-0">Publicado</Badge>
      case "pendente":
        return <Badge className="bg-yellow-100 text-yellow-800 border-0">Pendente</Badge>
      case "rejeitado":
        return <Badge className="bg-red-100 text-red-800 border-0">Rejeitado</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">-</Badge>
    }
  }

  const getCategoriaBadge = (categoria: string) => {
    switch (categoria) {
      case "atendimento":
        return <Badge className="bg-blue-100 text-blue-800 border-0">Atendimento</Badge>
      case "produto":
        return <Badge className="bg-purple-100 text-purple-800 border-0">Produto</Badge>
      case "entrega":
        return <Badge className="bg-orange-100 text-orange-800 border-0">Entrega</Badge>
      case "preco":
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#D6DD83]/20 via-[#FFBDB6]/20 to-[#30B2B0]/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bpet-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando feedbacks...</p>
        </div>
      </div>
    )
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
                    <p className="text-3xl font-bold">{feedbacks.filter((f) => f.status === "publicado").length}</p>
                  </div>
                  <ThumbsUp className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#D6DD83] to-[#FFBDB6] text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Pendentes</p>
                    <p className="text-3xl font-bold">{feedbacks.filter((f) => f.status === "pendente").length}</p>
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
                      {feedbacks.length > 0
                        ? (feedbacks.reduce((sum, f) => sum + f.avaliacao, 0) / feedbacks.length).toFixed(1)
                        : "0.0"}
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
                            <div className="text-right flex flex-col items-end gap-2">
                              <p className="text-sm text-gray-500 mb-2">
                                {new Date(feedback.createdAt).toLocaleDateString("pt-BR")}
                              </p>
                              <div className="flex items-center gap-1 mb-2">
                                {renderStars(feedback.avaliacao)}
                                <span className="text-sm text-gray-600 ml-1">({feedback.avaliacao}/5)</span>
                              </div>
                              {/* Botão Delete - Apenas para Admin */}
                              {isAdmin && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm" disabled={deletingId === feedback.id}>
                                      <Trash2 className="w-4 h-4 mr-1" />
                                      {deletingId === feedback.id ? "Excluindo..." : "Excluir"}
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Tem certeza que deseja excluir o feedback "{feedback.titulo}"? Esta ação não
                                        pode ser desfeita.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDelete(feedback.id)}
                                        className="bg-red-600 hover:bg-red-700"
                                      >
                                        Excluir
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                            </div>
                          </div>

                          <p className="text-gray-700 text-sm leading-relaxed mb-3">{feedback.mensagem}</p>

                          {feedback.recomenda && (
                            <div className="bg-gray-50 p-3 rounded-xl">
                              <p className="text-sm text-gray-700">
                                <strong>Recomendaria:</strong>{" "}
                                {feedback.recomenda === "sim"
                                  ? "Sim, recomendaria"
                                  : feedback.recomenda === "talvez"
                                    ? "Talvez recomendaria"
                                    : "Não recomendaria"}
                              </p>
                            </div>
                          )}
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
