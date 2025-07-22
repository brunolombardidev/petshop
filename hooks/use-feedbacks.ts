"use client"

import { useState, useEffect } from "react"
import { toast } from "@/hooks/use-toast"

export interface Feedback {
  id: string
  title: string
  description: string
  rating: number
  category: string
  status: "pending" | "reviewed" | "resolved"
  userId: string
  userName?: string
  userEmail?: string
  response?: string
  respondedBy?: string
  respondedAt?: string
  createdAt: string
  updatedAt: string
}

export interface CreateFeedbackRequest {
  title: string
  description: string
  rating: number
  category: string
}

export interface RespondFeedbackRequest {
  response: string
}

export function useFeedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFeedbacks = async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulação de dados - substituir pela chamada real da API
      const mockFeedbacks: Feedback[] = [
        {
          id: "1",
          title: "Excelente atendimento",
          description:
            "Fui muito bem atendido na clínica. Os profissionais são muito competentes e cuidadosos com os animais.",
          rating: 5,
          category: "Atendimento",
          status: "reviewed",
          userId: "user1",
          userName: "Maria Silva",
          userEmail: "maria@email.com",
          response: "Muito obrigado pelo feedback! Ficamos felizes em saber que você teve uma boa experiência.",
          respondedBy: "admin",
          respondedAt: "2024-01-16T10:30:00Z",
          createdAt: "2024-01-15T14:20:00Z",
          updatedAt: "2024-01-16T10:30:00Z",
        },
        {
          id: "2",
          title: "Problema com agendamento",
          description:
            "Tive dificuldades para agendar uma consulta pelo aplicativo. O sistema apresentou erro várias vezes.",
          rating: 2,
          category: "Sistema",
          status: "pending",
          userId: "user2",
          userName: "João Santos",
          userEmail: "joao@email.com",
          createdAt: "2024-01-20T09:15:00Z",
          updatedAt: "2024-01-20T09:15:00Z",
        },
        {
          id: "3",
          title: "Sugestão de melhoria",
          description: "Seria interessante ter um sistema de lembretes para vacinação dos pets.",
          rating: 4,
          category: "Sugestão",
          status: "resolved",
          userId: "user3",
          userName: "Ana Costa",
          userEmail: "ana@email.com",
          response: "Obrigado pela sugestão! Já estamos trabalhando nessa funcionalidade.",
          respondedBy: "admin",
          respondedAt: "2024-01-18T16:45:00Z",
          createdAt: "2024-01-17T11:30:00Z",
          updatedAt: "2024-01-18T16:45:00Z",
        },
      ]

      setFeedbacks(mockFeedbacks)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao carregar feedbacks"
      setError(errorMessage)
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createFeedback = async (data: CreateFeedbackRequest) => {
    try {
      // Simulação - substituir pela chamada real da API
      const newFeedback: Feedback = {
        id: Date.now().toString(),
        ...data,
        status: "pending",
        userId: "current-user",
        userName: "Usuário Atual",
        userEmail: "usuario@email.com",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setFeedbacks((prev) => [newFeedback, ...prev])

      toast({
        title: "Sucesso",
        description: "Feedback enviado com sucesso!",
      })

      return newFeedback
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao enviar feedback"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw error
    }
  }

  const respondFeedback = async (id: string, data: RespondFeedbackRequest) => {
    try {
      setFeedbacks((prev) =>
        prev.map((feedback) =>
          feedback.id === id
            ? {
                ...feedback,
                ...data,
                status: "reviewed" as const,
                respondedBy: "admin",
                respondedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }
            : feedback,
        ),
      )

      toast({
        title: "Sucesso",
        description: "Resposta enviada com sucesso!",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao responder feedback"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw error
    }
  }

  const updateFeedbackStatus = async (id: string, status: Feedback["status"]) => {
    try {
      setFeedbacks((prev) =>
        prev.map((feedback) =>
          feedback.id === id ? { ...feedback, status, updatedAt: new Date().toISOString() } : feedback,
        ),
      )

      toast({
        title: "Sucesso",
        description: "Status atualizado com sucesso!",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar status"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw error
    }
  }

  const deleteFeedback = async (id: string) => {
    try {
      setFeedbacks((prev) => prev.filter((feedback) => feedback.id !== id))

      toast({
        title: "Sucesso",
        description: "Feedback excluído com sucesso!",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao excluir feedback"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw error
    }
  }

  const getFeedbacksByStatus = (status: Feedback["status"]) => {
    return feedbacks.filter((feedback) => feedback.status === status)
  }

  const getFeedbacksByCategory = (category: string) => {
    return feedbacks.filter((feedback) => feedback.category === category)
  }

  const getAverageRating = () => {
    if (feedbacks.length === 0) return 0
    const sum = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0)
    return sum / feedbacks.length
  }

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  return {
    feedbacks,
    loading,
    error,
    refetch: fetchFeedbacks,
    createFeedback,
    respondFeedback,
    updateFeedbackStatus,
    deleteFeedback,
    getFeedbacksByStatus,
    getFeedbacksByCategory,
    getAverageRating,
  }
}
