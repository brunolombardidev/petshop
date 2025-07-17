"use client"

import { useState, useEffect } from "react"
import { feedbackService, type Feedback, type CreateFeedbackRequest } from "@/services/feedback.service"
import { toast } from "@/hooks/use-toast"

interface UseFeedbacksParams {
  search?: string
  categoria?: string
  status?: string
  prioridade?: string
  autoFetch?: boolean
}

export function useFeedbacks(params: UseFeedbacksParams = {}) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    total: 0,
    abertos: 0,
    emAndamento: 0,
    resolvidos: 0,
    fechados: 0,
    porCategoria: {} as Record<string, number>,
    porPrioridade: {} as Record<string, number>,
  })

  const fetchFeedbacks = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await feedbackService.getFeedbacks({
        search: params.search,
        categoria: params.categoria,
        status: params.status,
        prioridade: params.prioridade,
      })

      setFeedbacks(response.data)
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

  const fetchStats = async () => {
    try {
      const response = await feedbackService.getFeedbackStats()
      setStats(response.data)
    } catch (err) {
      console.error("Erro ao carregar estatísticas:", err)
    }
  }

  const createFeedback = async (data: CreateFeedbackRequest) => {
    try {
      setLoading(true)
      const response = await feedbackService.createFeedback(data)

      setFeedbacks((prev) => [response.data, ...prev])

      toast({
        title: "Sucesso",
        description: "Feedback enviado com sucesso!",
      })

      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao enviar feedback"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateFeedback = async (id: string, data: { resposta?: string; status?: string }) => {
    try {
      setLoading(true)
      const response = await feedbackService.updateFeedback({ id, ...data })

      setFeedbacks((prev) => prev.map((feedback) => (feedback.id === id ? response.data : feedback)))

      toast({
        title: "Sucesso",
        description: "Feedback atualizado com sucesso!",
      })

      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao atualizar feedback"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteFeedback = async (id: string) => {
    try {
      setLoading(true)
      await feedbackService.deleteFeedback(id)

      setFeedbacks((prev) => prev.filter((feedback) => feedback.id !== id))

      toast({
        title: "Sucesso",
        description: "Feedback excluído com sucesso!",
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao excluir feedback"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.autoFetch !== false) {
      fetchFeedbacks()
      fetchStats()
    }
  }, [params.search, params.categoria, params.status, params.prioridade])

  return {
    feedbacks,
    loading,
    error,
    stats,
    fetchFeedbacks,
    createFeedback,
    updateFeedback,
    deleteFeedback,
    refetch: fetchFeedbacks,
  }
}
