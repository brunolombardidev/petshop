import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"

export interface Feedback {
  id: string
  titulo: string
  mensagem: string
  categoria: string
  avaliacao: number
  empresa: string
  recomenda?: string
  status: "pendente" | "publicado" | "rejeitado"
  userId: string
  userName: string
  userEmail: string
  resposta?: string
  respondidoPor?: string
  dataResposta?: string
  createdAt: string
  updatedAt: string
}

export interface CreateFeedbackRequest {
  titulo: string
  mensagem: string
  categoria: string
  avaliacao: number
  empresa: string
  recomenda?: string
}

class FeedbackService {
  private readonly baseEndpoint = "/feedbacks"

  async getFeedbacks(params?: {
    page?: number
    limit?: number
    search?: string
    categoria?: string
    status?: string
    empresa?: string
  }): Promise<PaginatedResponse<Feedback>> {
    return apiClient.get<PaginatedResponse<Feedback>>(this.baseEndpoint, params)
  }

  async getFeedbackById(id: string): Promise<ApiResponse<Feedback>> {
    return apiClient.get<ApiResponse<Feedback>>(`${this.baseEndpoint}/${id}`)
  }

  async createFeedback(data: CreateFeedbackRequest): Promise<ApiResponse<Feedback>> {
    return apiClient.post<ApiResponse<Feedback>>(this.baseEndpoint, data)
  }

  async deleteFeedback(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`${this.baseEndpoint}/${id}`)
  }

  async getFeedbackStats(): Promise<
    ApiResponse<{
      totalFeedbacks: number
      publishedFeedbacks: number
      pendingFeedbacks: number
      rejectedFeedbacks: number
      averageRating: number
    }>
  > {
    return apiClient.get<ApiResponse<any>>(`${this.baseEndpoint}/stats`)
  }

  async getPublicFeedbacks(params?: {
    page?: number
    limit?: number
    empresa?: string
    categoria?: string
    minRating?: number
  }): Promise<PaginatedResponse<Feedback>> {
    return apiClient.get<PaginatedResponse<Feedback>>(`${this.baseEndpoint}/public`, params)
  }
}

export const feedbackService = new FeedbackService()
