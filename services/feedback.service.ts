import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"

export interface Feedback {
  id: string
  titulo: string
  descricao: string
  categoria: string
  prioridade: "baixa" | "media" | "alta"
  status: "aberto" | "em_andamento" | "resolvido" | "fechado"
  userId: string
  userName: string
  userEmail: string
  resposta?: string
  respondidoPor?: string
  dataResposta?: string
  anexos?: string[]
  createdAt: string
  updatedAt: string
}

export interface CreateFeedbackRequest {
  titulo: string
  descricao: string
  categoria: string
  prioridade: "baixa" | "media" | "alta"
  anexos?: File[]
}

export interface UpdateFeedbackRequest {
  id: string
  resposta?: string
  status?: "aberto" | "em_andamento" | "resolvido" | "fechado"
}

class FeedbackService {
  private readonly baseEndpoint = "/feedbacks"

  async getFeedbacks(params?: {
    page?: number
    limit?: number
    search?: string
    categoria?: string
    status?: string
    prioridade?: string
  }): Promise<PaginatedResponse<Feedback>> {
    return apiClient.get<PaginatedResponse<Feedback>>(this.baseEndpoint, params)
  }

  async getFeedbackById(id: string): Promise<ApiResponse<Feedback>> {
    return apiClient.get<ApiResponse<Feedback>>(`${this.baseEndpoint}/${id}`)
  }

  async createFeedback(data: CreateFeedbackRequest): Promise<ApiResponse<Feedback>> {
    if (data.anexos && data.anexos.length > 0) {
      const formData = new FormData()
      formData.append("titulo", data.titulo)
      formData.append("descricao", data.descricao)
      formData.append("categoria", data.categoria)
      formData.append("prioridade", data.prioridade)

      data.anexos.forEach((file, index) => {
        formData.append(`anexos[${index}]`, file)
      })

      const response = await fetch(`${apiClient["baseURL"]}${this.baseEndpoint}/with-attachments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: formData,
      })

      return response.json()
    }

    return apiClient.post<ApiResponse<Feedback>>(this.baseEndpoint, data)
  }

  async updateFeedback(data: UpdateFeedbackRequest): Promise<ApiResponse<Feedback>> {
    const { id, ...updateData } = data
    return apiClient.put<ApiResponse<Feedback>>(`${this.baseEndpoint}/${id}`, updateData)
  }

  async deleteFeedback(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`${this.baseEndpoint}/${id}`)
  }

  async getFeedbackStats(): Promise<
    ApiResponse<{
      total: number
      abertos: number
      emAndamento: number
      resolvidos: number
      fechados: number
      porCategoria: Record<string, number>
      porPrioridade: Record<string, number>
    }>
  > {
    return apiClient.get<ApiResponse<any>>(`${this.baseEndpoint}/stats`)
  }
}

export const feedbackService = new FeedbackService()
