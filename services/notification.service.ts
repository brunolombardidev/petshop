import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"

export interface NotificationData {
  id: string
  userId: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  isRead: boolean
  data?: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface CreateNotificationRequest {
  userId: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  data?: Record<string, any>
}

export interface NotificationFilters {
  userId?: string
  type?: string
  isRead?: boolean
  dateFrom?: string
  dateTo?: string
  page?: number
  limit?: number
}

export interface NotificationStats {
  total: number
  unread: number
  byType: Record<string, number>
  recent: number
}

class NotificationService {
  private readonly baseEndpoint = "/notificacoes"

  // POST /notificacoes - Criar nova notificação (Admin apenas)
  async createNotification(data: CreateNotificationRequest): Promise<ApiResponse<NotificationData>> {
    return apiClient.post<ApiResponse<NotificationData>>(this.baseEndpoint, data)
  }

  // GET /notificacoes - Listar notificações com filtros e paginação
  async getNotifications(filters?: NotificationFilters): Promise<ApiResponse<PaginatedResponse<NotificationData>>> {
    return apiClient.get<ApiResponse<PaginatedResponse<NotificationData>>>(this.baseEndpoint, filters)
  }

  // GET /notificacoes/usuario/{userId} - Listar notificações de um usuário específico
  async getUserNotifications(
    userId: string,
    filters?: Omit<NotificationFilters, "userId">,
  ): Promise<ApiResponse<PaginatedResponse<NotificationData>>> {
    return apiClient.get<ApiResponse<PaginatedResponse<NotificationData>>>(
      `${this.baseEndpoint}/usuario/${userId}`,
      filters,
    )
  }

  // GET /notificacoes/usuario/{userId}/nao-lidas - Obter notificações não lidas de um usuário
  async getUnreadNotifications(userId: string): Promise<ApiResponse<NotificationData[]>> {
    return apiClient.get<ApiResponse<NotificationData[]>>(`${this.baseEndpoint}/usuario/${userId}/nao-lidas`)
  }

  // GET /notificacoes/estatisticas - Obter estatísticas globais das notificações
  async getGlobalStats(): Promise<ApiResponse<NotificationStats>> {
    return apiClient.get<ApiResponse<NotificationStats>>(`${this.baseEndpoint}/estatisticas`)
  }

  // GET /notificacoes/estatisticas/usuario/{userId} - Obter estatísticas das notificações de um usuário
  async getUserStats(userId: string): Promise<ApiResponse<NotificationStats>> {
    return apiClient.get<ApiResponse<NotificationStats>>(`${this.baseEndpoint}/estatisticas/usuario/${userId}`)
  }

  // GET /notificacoes/{id} - Obter notificação por ID
  async getNotificationById(id: string): Promise<ApiResponse<NotificationData>> {
    return apiClient.get<ApiResponse<NotificationData>>(`${this.baseEndpoint}/${id}`)
  }

  // PATCH /notificacoes/{id} - Atualizar notificação (Admin apenas)
  async updateNotification(
    id: string,
    data: Partial<CreateNotificationRequest>,
  ): Promise<ApiResponse<NotificationData>> {
    return apiClient.patch<ApiResponse<NotificationData>>(`${this.baseEndpoint}/${id}`, data)
  }

  // DELETE /notificacoes/{id} - Remover notificação (Admin apenas)
  async deleteNotification(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`${this.baseEndpoint}/${id}`)
  }

  // Métodos auxiliares
  async markAsRead(id: string): Promise<ApiResponse<NotificationData>> {
    return this.updateNotification(id, { isRead: true } as any)
  }

  async markAllAsRead(userId: string): Promise<ApiResponse<void>> {
    return apiClient.patch<ApiResponse<void>>(`${this.baseEndpoint}/usuario/${userId}/marcar-lidas`, {})
  }
}

export const notificationService = new NotificationService()
