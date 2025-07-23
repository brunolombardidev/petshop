import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"

// Tipos específicos para notificações
export interface Notification {
  id: string
  userId: string
  type: "info" | "success" | "warning" | "error" | "reminder"
  category: "system" | "service" | "payment" | "promotion" | "update" | "security"
  title: string
  message: string
  data?: any // Dados adicionais específicos da notificação
  isRead: boolean
  readAt?: string
  priority: "low" | "medium" | "high" | "urgent"
  channels: Array<"app" | "email" | "sms" | "push">
  scheduledFor?: string // Para notificações agendadas
  expiresAt?: string
  actionUrl?: string // URL para ação relacionada
  actionLabel?: string // Label do botão de ação
  createdAt: string
  updatedAt: string
}

export interface NotificationTemplate {
  id: string
  name: string
  type: Notification["type"]
  category: Notification["category"]
  title: string
  message: string
  channels: Notification["channels"]
  isActive: boolean
  variables?: string[] // Variáveis que podem ser substituídas
  createdAt: string
  updatedAt: string
}

export interface NotificationStats {
  total: number
  unread: number
  byType: Record<Notification["type"], number>
  byCategory: Record<Notification["category"], number>
  byChannel: Record<"app" | "email" | "sms" | "push", number>
  deliveryRate: {
    app: number
    email: number
    sms: number
    push: number
  }
}

export interface NotificationPreferences {
  userId: string
  channels: {
    app: boolean
    email: boolean
    sms: boolean
    push: boolean
  }
  categories: Record<
    Notification["category"],
    {
      enabled: boolean
      channels: Array<"app" | "email" | "sms" | "push">
    }
  >
  quietHours: {
    enabled: boolean
    start: string // HH:mm
    end: string // HH:mm
    timezone: string
  }
  frequency: {
    digest: "never" | "daily" | "weekly"
    immediate: boolean
  }
}

export class NotificationService {
  // Notificações do usuário
  static async getMyNotifications(params?: {
    page?: number
    limit?: number
    type?: string
    category?: string
    isRead?: boolean
    priority?: string
  }): Promise<PaginatedResponse<Notification>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Notification>>>("/notificacoes/minhas", params)
    return response.data
  }

  static async getNotification(id: string): Promise<Notification> {
    const response = await apiClient.get<ApiResponse<Notification>>(`/notificacoes/${id}`)
    return response.data
  }

  static async markAsRead(id: string): Promise<Notification> {
    const response = await apiClient.patch<ApiResponse<Notification>>(`/notificacoes/${id}/lida`)
    return response.data
  }

  static async markAllAsRead(): Promise<{ updated: number }> {
    const response = await apiClient.patch<ApiResponse<{ updated: number }>>("/notificacoes/marcar-todas-lidas")
    return response.data
  }

  static async deleteNotification(id: string): Promise<void> {
    await apiClient.delete(`/notificacoes/${id}`)
  }

  static async deleteAllRead(): Promise<{ deleted: number }> {
    const response = await apiClient.delete<ApiResponse<{ deleted: number }>>("/notificacoes/lidas")
    return response.data
  }

  // Estatísticas
  static async getMyNotificationStats(): Promise<NotificationStats> {
    const response = await apiClient.get<ApiResponse<NotificationStats>>("/notificacoes/minhas/estatisticas")
    return response.data
  }

  // Preferências
  static async getMyPreferences(): Promise<NotificationPreferences> {
    const response = await apiClient.get<ApiResponse<NotificationPreferences>>("/notificacoes/preferencias")
    return response.data
  }

  static async updatePreferences(preferences: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
    const response = await apiClient.put<ApiResponse<NotificationPreferences>>(
      "/notificacoes/preferencias",
      preferences,
    )
    return response.data
  }

  // Admin - Gerenciar todas as notificações
  static async getAllNotifications(params?: {
    page?: number
    limit?: number
    userId?: string
    type?: string
    category?: string
    isRead?: boolean
    priority?: string
    startDate?: string
    endDate?: string
  }): Promise<PaginatedResponse<Notification>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Notification>>>("/notificacoes", params)
    return response.data
  }

  static async createNotification(notificationData: {
    userId?: string
    userIds?: string[]
    type: Notification["type"]
    category: Notification["category"]
    title: string
    message: string
    data?: any
    priority?: Notification["priority"]
    channels?: Notification["channels"]
    scheduledFor?: string
    expiresAt?: string
    actionUrl?: string
    actionLabel?: string
  }): Promise<Notification | Notification[]> {
    const response = await apiClient.post<ApiResponse<Notification | Notification[]>>("/notificacoes", notificationData)
    return response.data
  }

  static async sendBulkNotification(notificationData: {
    filters?: {
      userType?: string
      status?: string
      city?: string
      state?: string
      hasSubscription?: boolean
    }
    type: Notification["type"]
    category: Notification["category"]
    title: string
    message: string
    data?: any
    priority?: Notification["priority"]
    channels?: Notification["channels"]
    scheduledFor?: string
    expiresAt?: string
    actionUrl?: string
    actionLabel?: string
  }): Promise<{ sent: number; failed: number; scheduled: boolean }> {
    const response = await apiClient.post<ApiResponse<{ sent: number; failed: number; scheduled: boolean }>>(
      "/notificacoes/envio-em-massa",
      notificationData,
    )
    return response.data
  }

  // Templates (Admin)
  static async getTemplates(): Promise<NotificationTemplate[]> {
    const response = await apiClient.get<ApiResponse<NotificationTemplate[]>>("/notificacoes/templates")
    return response.data
  }

  static async createTemplate(
    templateData: Omit<NotificationTemplate, "id" | "createdAt" | "updatedAt">,
  ): Promise<NotificationTemplate> {
    const response = await apiClient.post<ApiResponse<NotificationTemplate>>("/notificacoes/templates", templateData)
    return response.data
  }

  static async updateTemplate(id: string, templateData: Partial<NotificationTemplate>): Promise<NotificationTemplate> {
    const response = await apiClient.put<ApiResponse<NotificationTemplate>>(
      `/notificacoes/templates/${id}`,
      templateData,
    )
    return response.data
  }

  static async deleteTemplate(id: string): Promise<void> {
    await apiClient.delete(`/notificacoes/templates/${id}`)
  }

  static async useTemplate(
    templateId: string,
    data: {
      userId?: string
      userIds?: string[]
      variables?: Record<string, string>
      scheduledFor?: string
      expiresAt?: string
    },
  ): Promise<Notification | Notification[]> {
    const response = await apiClient.post<ApiResponse<Notification | Notification[]>>(
      `/notificacoes/templates/${templateId}/usar`,
      data,
    )
    return response.data
  }

  // Estatísticas gerais (Admin)
  static async getGlobalStats(params?: {
    startDate?: string
    endDate?: string
    userId?: string
  }): Promise<
    NotificationStats & {
      totalUsers: number
      activeUsers: number
      optOutRate: number
    }
  > {
    const response = await apiClient.get<
      ApiResponse<
        NotificationStats & {
          totalUsers: number
          activeUsers: number
          optOutRate: number
        }
      >
    >("/notificacoes/estatisticas", params)
    return response.data
  }

  // Push notifications
  static async registerPushToken(token: string, platform: "web" | "ios" | "android"): Promise<{ success: boolean }> {
    const response = await apiClient.post<ApiResponse<{ success: boolean }>>("/notificacoes/push/registrar", {
      token,
      platform,
    })
    return response.data
  }

  static async unregisterPushToken(token: string): Promise<{ success: boolean }> {
    const response = await apiClient.post<ApiResponse<{ success: boolean }>>("/notificacoes/push/desregistrar", {
      token,
    })
    return response.data
  }

  // Teste de notificação
  static async testNotification(data: {
    type: Notification["type"]
    category: Notification["category"]
    title: string
    message: string
    channels: Notification["channels"]
  }): Promise<{ success: boolean; results: Record<string, boolean> }> {
    const response = await apiClient.post<ApiResponse<{ success: boolean; results: Record<string, boolean> }>>(
      "/notificacoes/teste",
      data,
    )
    return response.data
  }
}
