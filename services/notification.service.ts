import { apiClient } from "@/lib/api-client"
import type { ApiResponse, Notification, PaginatedResponse } from "@/types/api"

export interface CreateNotificationRequest {
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  userId?: string
  userIds?: string[]
  broadcast?: boolean
  scheduledFor?: string
  actionUrl?: string
}

export interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  smsNotifications: boolean
  marketingEmails: boolean
  systemUpdates: boolean
  appointmentReminders: boolean
  promotionalOffers: boolean
}

export class NotificationService {
  // Obter minhas notificações
  static async getMyNotifications(params?: {
    page?: number
    limit?: number
    isRead?: boolean
    type?: "info" | "success" | "warning" | "error"
  }): Promise<PaginatedResponse<Notification>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Notification>>>("/notifications/me", params)
    return response.data
  }

  // Marcar notificação como lida
  static async markAsRead(id: string): Promise<Notification> {
    const response = await apiClient.patch<ApiResponse<Notification>>(`/notifications/${id}/read`)
    return response.data
  }

  // Marcar todas as notificações como lidas
  static async markAllAsRead(): Promise<void> {
    await apiClient.patch("/notifications/me/read-all")
  }

  // Excluir notificação
  static async deleteNotification(id: string): Promise<void> {
    await apiClient.delete(`/notifications/${id}`)
  }

  // Obter contagem de notificações não lidas
  static async getUnreadCount(): Promise<{ count: number }> {
    const response = await apiClient.get<ApiResponse<{ count: number }>>("/notifications/me/unread-count")
    return response.data
  }

  // Criar notificação (admin)
  static async createNotification(data: CreateNotificationRequest): Promise<Notification> {
    const response = await apiClient.post<ApiResponse<Notification>>("/notifications", data)
    return response.data
  }

  // Obter todas as notificações (admin)
  static async getAllNotifications(params?: {
    page?: number
    limit?: number
    userId?: string
    type?: "info" | "success" | "warning" | "error"
    startDate?: string
    endDate?: string
  }): Promise<PaginatedResponse<Notification>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Notification>>>("/notifications", params)
    return response.data
  }

  // Obter configurações de notificação
  static async getNotificationSettings(): Promise<NotificationSettings> {
    const response = await apiClient.get<ApiResponse<NotificationSettings>>("/notifications/settings")
    return response.data
  }

  // Atualizar configurações de notificação
  static async updateNotificationSettings(settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
    const response = await apiClient.put<ApiResponse<NotificationSettings>>("/notifications/settings", settings)
    return response.data
  }

  // Registrar token de push notification
  static async registerPushToken(token: string, platform: "ios" | "android" | "web"): Promise<void> {
    await apiClient.post("/notifications/push-token", { token, platform })
  }

  // Remover token de push notification
  static async removePushToken(token: string): Promise<void> {
    await apiClient.delete("/notifications/push-token", { token })
  }

  // Testar notificação push
  static async testPushNotification(): Promise<void> {
    await apiClient.post("/notifications/test-push")
  }

  // Obter templates de notificação (admin)
  static async getNotificationTemplates(): Promise<
    Array<{
      id: string
      name: string
      title: string
      message: string
      type: "info" | "success" | "warning" | "error"
      variables: string[]
    }>
  > {
    const response = await apiClient.get<ApiResponse<any[]>>("/notifications/templates")
    return response.data
  }

  // Enviar notificação em lote (admin)
  static async sendBulkNotification(data: {
    templateId?: string
    title: string
    message: string
    type: "info" | "success" | "warning" | "error"
    userIds?: string[]
    userType?: string
    broadcast?: boolean
    scheduledFor?: string
  }): Promise<{ sent: number; failed: number }> {
    const response = await apiClient.post<ApiResponse<{ sent: number; failed: number }>>("/notifications/bulk", data)
    return response.data
  }
}
