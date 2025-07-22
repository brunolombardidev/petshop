import { apiClient } from "@/lib/api-client"
import type { ApiResponse, Feedback, PaginatedResponse } from "@/types/api"

export interface CreateFeedbackRequest {
  title: string
  description: string
  rating: number
  category: string
  attachments?: string[]
}

export interface UpdateFeedbackRequest extends Partial<CreateFeedbackRequest> {}

export interface RespondFeedbackRequest {
  response: string
}

export interface FeedbackStats {
  totalFeedbacks: number
  averageRating: number
  feedbacksByStatus: Record<string, number>
  feedbacksByCategory: Record<string, number>
  ratingDistribution: Record<number, number>
  responseTime: {
    average: number
    median: number
  }
  satisfactionTrend: Array<{
    month: string
    averageRating: number
    count: number
  }>
}

export class FeedbackService {
  // Obter meus feedbacks
  static async getMyFeedbacks(params?: {
    page?: number
    limit?: number
    status?: "pending" | "reviewed" | "resolved"
    category?: string
  }): Promise<PaginatedResponse<Feedback>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Feedback>>>("/feedbacks/me", params)
    return response.data
  }

  // Obter todos os feedbacks (admin)
  static async getAllFeedbacks(params?: {
    page?: number
    limit?: number
    status?: "pending" | "reviewed" | "resolved"
    category?: string
    rating?: number
    search?: string
    startDate?: string
    endDate?: string
  }): Promise<PaginatedResponse<Feedback>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Feedback>>>("/feedbacks", params)
    return response.data
  }

  // Obter feedback por ID
  static async getFeedbackById(id: string): Promise<Feedback> {
    const response = await apiClient.get<ApiResponse<Feedback>>(`/feedbacks/${id}`)
    return response.data
  }

  // Criar novo feedback
  static async createFeedback(data: CreateFeedbackRequest): Promise<Feedback> {
    const response = await apiClient.post<ApiResponse<Feedback>>("/feedbacks", data)
    return response.data
  }

  // Atualizar feedback
  static async updateFeedback(id: string, data: UpdateFeedbackRequest): Promise<Feedback> {
    const response = await apiClient.put<ApiResponse<Feedback>>(`/feedbacks/${id}`, data)
    return response.data
  }

  // Excluir feedback
  static async deleteFeedback(id: string): Promise<void> {
    await apiClient.delete(`/feedbacks/${id}`)
  }

  // Responder feedback (admin)
  static async respondFeedback(id: string, data: RespondFeedbackRequest): Promise<Feedback> {
    const response = await apiClient.post<ApiResponse<Feedback>>(`/feedbacks/${id}/respond`, data)
    return response.data
  }

  // Atualizar status do feedback
  static async updateFeedbackStatus(id: string, status: "pending" | "reviewed" | "resolved"): Promise<Feedback> {
    const response = await apiClient.patch<ApiResponse<Feedback>>(`/feedbacks/${id}/status`, { status })
    return response.data
  }

  // Obter categorias de feedback
  static async getFeedbackCategories(): Promise<string[]> {
    const response = await apiClient.get<ApiResponse<string[]>>("/feedbacks/categories")
    return response.data
  }

  // Criar categoria de feedback
  static async createFeedbackCategory(name: string): Promise<void> {
    await apiClient.post("/feedbacks/categories", { name })
  }

  // Obter estatísticas de feedback
  static async getFeedbackStats(params?: {
    startDate?: string
    endDate?: string
    category?: string
  }): Promise<FeedbackStats> {
    const response = await apiClient.get<ApiResponse<FeedbackStats>>("/feedbacks/stats", params)
    return response.data
  }

  // Upload de anexo para feedback
  static async uploadFeedbackAttachment(feedbackId: string, file: File): Promise<{ url: string }> {
    const formData = new FormData()
    formData.append("attachment", file)

    const response = await apiClient.upload<ApiResponse<{ url: string }>>(
      `/feedbacks/${feedbackId}/attachments`,
      formData,
    )
    return response.data
  }

  // Remover anexo do feedback
  static async removeFeedbackAttachment(feedbackId: string, attachmentUrl: string): Promise<void> {
    await apiClient.delete(`/feedbacks/${feedbackId}/attachments`, { attachmentUrl })
  }

  // Exportar feedbacks
  static async exportFeedbacks(params: {
    format: "csv" | "xlsx"
    status?: "pending" | "reviewed" | "resolved"
    category?: string
    rating?: number
    startDate?: string
    endDate?: string
  }): Promise<Blob> {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value))
      }
    })

    return apiClient.download(`/feedbacks/export?${queryParams.toString()}`)
  }

  // Obter feedbacks por rating
  static async getFeedbacksByRating(
    rating: number,
    params?: {
      page?: number
      limit?: number
      category?: string
    },
  ): Promise<PaginatedResponse<Feedback>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Feedback>>>(
      `/feedbacks/rating/${rating}`,
      params,
    )
    return response.data
  }

  // Marcar feedback como útil
  static async markFeedbackAsHelpful(id: string): Promise<void> {
    await apiClient.post(`/feedbacks/${id}/helpful`)
  }

  // Obter feedbacks similares
  static async getSimilarFeedbacks(id: string, limit = 5): Promise<Feedback[]> {
    const response = await apiClient.get<ApiResponse<Feedback[]>>(`/feedbacks/${id}/similar?limit=${limit}`)
    return response.data
  }

  // Obter tendências de feedback
  static async getFeedbackTrends(params?: {
    period?: "week" | "month" | "quarter" | "year"
    category?: string
  }): Promise<
    Array<{
      date: string
      averageRating: number
      count: number
      positiveCount: number
      negativeCount: number
    }>
  > {
    const response = await apiClient.get<ApiResponse<any[]>>("/feedbacks/trends", params)
    return response.data
  }

  // Obter palavras-chave mais mencionadas
  static async getFeedbackKeywords(params?: {
    category?: string
    rating?: number
    limit?: number
  }): Promise<
    Array<{
      keyword: string
      count: number
      sentiment: "positive" | "negative" | "neutral"
    }>
  > {
    const response = await apiClient.get<ApiResponse<any[]>>("/feedbacks/keywords", params)
    return response.data
  }
}
