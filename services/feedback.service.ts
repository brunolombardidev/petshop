import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"

// Tipos específicos para feedback
export interface Feedback {
  id: string
  userId: string
  type: "suggestion" | "complaint" | "compliment" | "bug_report" | "feature_request"
  category: "app" | "service" | "support" | "billing" | "other"
  title: string
  description: string
  rating?: number // 1-5
  status: "pending" | "in_progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  attachments?: string[]
  response?: {
    message: string
    respondedBy: string
    respondedAt: string
  }
  tags?: string[]
  isAnonymous: boolean
  createdAt: string
  updatedAt: string
  user?: {
    id: string
    name: string
    email: string
    userType: string
  }
}

export interface FeedbackStats {
  total: number
  byType: Record<Feedback["type"], number>
  byCategory: Record<Feedback["category"], number>
  byStatus: Record<Feedback["status"], number>
  averageRating: number
  responseTime: {
    average: number // em horas
    median: number
  }
}

export class FeedbackService {
  // Feedbacks
  static async getFeedbacks(params?: {
    page?: number
    limit?: number
    type?: string
    category?: string
    status?: string
    priority?: string
    userId?: string
    search?: string
    startDate?: string
    endDate?: string
  }): Promise<PaginatedResponse<Feedback>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Feedback>>>("/feedbacks", params)
    return response.data
  }

  static async getFeedback(id: string): Promise<Feedback> {
    const response = await apiClient.get<ApiResponse<Feedback>>(`/feedbacks/${id}`)
    return response.data
  }

  static async createFeedback(
    feedbackData: Omit<Feedback, "id" | "createdAt" | "updatedAt" | "user">,
  ): Promise<Feedback> {
    const response = await apiClient.post<ApiResponse<Feedback>>("/feedbacks", feedbackData)
    return response.data
  }

  static async updateFeedback(id: string, feedbackData: Partial<Feedback>): Promise<Feedback> {
    const response = await apiClient.put<ApiResponse<Feedback>>(`/feedbacks/${id}`, feedbackData)
    return response.data
  }

  static async deleteFeedback(id: string): Promise<void> {
    await apiClient.delete(`/feedbacks/${id}`)
  }

  static async respondToFeedback(id: string, response: { message: string }): Promise<Feedback> {
    const responseData = await apiClient.post<ApiResponse<Feedback>>(`/feedbacks/${id}/responder`, response)
    return responseData.data
  }

  static async updateFeedbackStatus(id: string, status: Feedback["status"]): Promise<Feedback> {
    const response = await apiClient.patch<ApiResponse<Feedback>>(`/feedbacks/${id}/status`, { status })
    return response.data
  }

  static async updateFeedbackPriority(id: string, priority: Feedback["priority"]): Promise<Feedback> {
    const response = await apiClient.patch<ApiResponse<Feedback>>(`/feedbacks/${id}/prioridade`, { priority })
    return response.data
  }

  // Meus feedbacks
  static async getMyFeedbacks(params?: {
    page?: number
    limit?: number
    type?: string
    category?: string
    status?: string
  }): Promise<PaginatedResponse<Feedback>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Feedback>>>("/feedbacks/meus", params)
    return response.data
  }

  // Estatísticas (admin)
  static async getFeedbackStats(params?: {
    startDate?: string
    endDate?: string
    userId?: string
  }): Promise<FeedbackStats> {
    const response = await apiClient.get<ApiResponse<FeedbackStats>>("/feedbacks/estatisticas", params)
    return response.data
  }

  // Tags
  static async getFeedbackTags(): Promise<string[]> {
    const response = await apiClient.get<ApiResponse<string[]>>("/feedbacks/tags")
    return response.data
  }

  static async addFeedbackTag(id: string, tag: string): Promise<Feedback> {
    const response = await apiClient.post<ApiResponse<Feedback>>(`/feedbacks/${id}/tags`, { tag })
    return response.data
  }

  static async removeFeedbackTag(id: string, tag: string): Promise<Feedback> {
    const response = await apiClient.delete<ApiResponse<Feedback>>(`/feedbacks/${id}/tags/${tag}`)
    return response.data
  }

  // Upload de anexos
  static async uploadAttachment(file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData()
    formData.append("file", file)

    const response = await apiClient.post<ApiResponse<{ url: string; filename: string }>>(
      "/feedbacks/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    )
    return response.data
  }
}

// Exportar instância para compatibilidade
export const feedbackService = FeedbackService
