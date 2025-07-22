import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse, User } from "@/types/api"

export interface UpdateUserRequest {
  name?: string
  email?: string
  phone?: string
  document?: string
  avatar?: string
  companyName?: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface UserProfile extends User {
  address?: {
    id: string
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    isDefault: boolean
  }
  subscription?: {
    id: string
    planName: string
    status: string
    expiresAt: string
  }
  stats?: {
    totalPets: number
    totalContracts: number
    totalSpent: number
    memberSince: string
  }
}

export interface UserSettings {
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
    marketing: boolean
  }
  privacy: {
    profileVisible: boolean
    showEmail: boolean
    showPhone: boolean
  }
  preferences: {
    language: string
    timezone: string
    currency: string
  }
}

export class UserService {
  // Obter perfil do usuário atual
  static async getProfile(): Promise<UserProfile> {
    const response = await apiClient.get<ApiResponse<UserProfile>>("/users/profile")
    return response.data
  }

  // Atualizar perfil do usuário
  static async updateProfile(userData: UpdateUserRequest): Promise<UserProfile> {
    const response = await apiClient.put<ApiResponse<UserProfile>>("/users/profile", userData)
    return response.data
  }

  // Upload de avatar
  static async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData()
    formData.append("avatar", file)

    const response = await apiClient.upload<ApiResponse<{ avatarUrl: string }>>("/users/avatar", formData)
    return response.data
  }

  // Alterar senha
  static async changePassword(data: ChangePasswordRequest): Promise<void> {
    if (data.newPassword !== data.confirmPassword) {
      throw new Error("As senhas não coincidem")
    }

    await apiClient.post<ApiResponse<void>>("/users/change-password", {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    })
  }

  // Obter configurações do usuário
  static async getSettings(): Promise<UserSettings> {
    const response = await apiClient.get<ApiResponse<UserSettings>>("/users/settings")
    return response.data
  }

  // Atualizar configurações do usuário
  static async updateSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
    const response = await apiClient.put<ApiResponse<UserSettings>>("/users/settings", settings)
    return response.data
  }

  // Desativar conta
  static async deactivateAccount(password: string): Promise<void> {
    await apiClient.post<ApiResponse<void>>("/users/deactivate", { password })
  }

  // Excluir conta permanentemente
  static async deleteAccount(password: string): Promise<void> {
    await apiClient.delete<ApiResponse<void>>("/users/account", { data: { password } })
  }

  // Obter usuários (admin)
  static async getUsers(params?: {
    page?: number
    limit?: number
    search?: string
    userType?: string
    isActive?: boolean
  }): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>("/users", params)
    return response.data
  }

  // Obter usuário por ID (admin)
  static async getUserById(id: string): Promise<UserProfile> {
    const response = await apiClient.get<ApiResponse<UserProfile>>(`/users/${id}`)
    return response.data
  }

  // Atualizar usuário (admin)
  static async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, userData)
    return response.data
  }

  // Ativar/desativar usuário (admin)
  static async toggleUserStatus(id: string): Promise<User> {
    const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}/toggle-status`)
    return response.data
  }

  // Verificar usuário (admin)
  static async verifyUser(id: string): Promise<User> {
    const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}/verify`)
    return response.data
  }

  // Obter estatísticas de usuários (admin)
  static async getUserStats(): Promise<{
    totalUsers: number
    activeUsers: number
    newUsersThisMonth: number
    usersByType: Array<{
      type: string
      count: number
    }>
    usersByStatus: Array<{
      status: string
      count: number
    }>
  }> {
    const response = await apiClient.get<ApiResponse<any>>("/users/stats")
    return response.data
  }

  // Exportar dados do usuário (LGPD)
  static async exportUserData(): Promise<Blob> {
    return apiClient.download("/users/export-data")
  }

  // Solicitar verificação de conta
  static async requestVerification(documents: {
    identityDocument: File
    proofOfAddress?: File
    businessLicense?: File
  }): Promise<void> {
    const formData = new FormData()
    formData.append("identityDocument", documents.identityDocument)

    if (documents.proofOfAddress) {
      formData.append("proofOfAddress", documents.proofOfAddress)
    }

    if (documents.businessLicense) {
      formData.append("businessLicense", documents.businessLicense)
    }

    await apiClient.upload<ApiResponse<void>>("/users/request-verification", formData)
  }

  // Obter histórico de atividades
  static async getActivityHistory(params?: {
    page?: number
    limit?: number
    type?: string
    dateFrom?: string
    dateTo?: string
  }): Promise<
    PaginatedResponse<{
      id: string
      type: string
      description: string
      metadata?: any
      createdAt: string
    }>
  > {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<any>>>("/users/activity-history", params)
    return response.data
  }

  // Obter notificações do usuário
  static async getNotifications(params?: {
    page?: number
    limit?: number
    unreadOnly?: boolean
  }): Promise<
    PaginatedResponse<{
      id: string
      title: string
      message: string
      type: "info" | "success" | "warning" | "error"
      isRead: boolean
      createdAt: string
    }>
  > {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<any>>>("/users/notifications", params)
    return response.data
  }

  // Marcar notificação como lida
  static async markNotificationAsRead(id: string): Promise<void> {
    await apiClient.patch(`/users/notifications/${id}/read`)
  }

  // Marcar todas as notificações como lidas
  static async markAllNotificationsAsRead(): Promise<void> {
    await apiClient.patch("/users/notifications/mark-all-read")
  }

  // Excluir notificação
  static async deleteNotification(id: string): Promise<void> {
    await apiClient.delete(`/users/notifications/${id}`)
  }
}
