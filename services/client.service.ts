import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"

// Tipos específicos para clientes
export interface Client {
  id: string
  name: string
  email: string
  phone?: string
  document?: string
  birthDate?: string
  avatar?: string
  status: "active" | "inactive" | "suspended"
  address?: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  preferences?: {
    notifications: {
      email: boolean
      sms: boolean
      push: boolean
    }
    language: string
    timezone: string
  }
  pets?: Array<{
    id: string
    name: string
    species: string
    breed?: string
    age?: number
  }>
  subscription?: {
    planId: string
    status: string
    expiresAt: string
  }
  stats?: {
    totalPets: number
    totalServices: number
    totalSpent: number
    lastActivity: string
  }
  createdAt: string
  updatedAt: string
}

export interface ClientStats {
  total: number
  active: number
  inactive: number
  suspended: number
  newThisMonth: number
  totalPets: number
  averagePetsPerClient: number
  topClients: Array<{
    id: string
    name: string
    totalSpent: number
    totalServices: number
  }>
}

export class ClientService {
  // Clientes
  static async getClients(params?: {
    page?: number
    limit?: number
    status?: string
    search?: string
    city?: string
    state?: string
    hasPets?: boolean
    hasSubscription?: boolean
    startDate?: string
    endDate?: string
  }): Promise<PaginatedResponse<Client>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Client>>>("/clientes", params)
    return response.data
  }

  static async getClient(id: string): Promise<Client> {
    const response = await apiClient.get<ApiResponse<Client>>(`/clientes/${id}`)
    return response.data
  }

  static async createClient(clientData: Omit<Client, "id" | "createdAt" | "updatedAt" | "stats">): Promise<Client> {
    const response = await apiClient.post<ApiResponse<Client>>("/clientes", clientData)
    return response.data
  }

  static async updateClient(id: string, clientData: Partial<Client>): Promise<Client> {
    const response = await apiClient.put<ApiResponse<Client>>(`/clientes/${id}`, clientData)
    return response.data
  }

  static async deleteClient(id: string): Promise<void> {
    await apiClient.delete(`/clientes/${id}`)
  }

  static async updateClientStatus(id: string, status: Client["status"]): Promise<Client> {
    const response = await apiClient.patch<ApiResponse<Client>>(`/clientes/${id}/status`, { status })
    return response.data
  }

  // Pets do cliente
  static async getClientPets(clientId: string): Promise<Client["pets"]> {
    const response = await apiClient.get<ApiResponse<Client["pets"]>>(`/clientes/${clientId}/pets`)
    return response.data
  }

  // Histórico de serviços
  static async getClientServices(
    clientId: string,
    params?: {
      page?: number
      limit?: number
      status?: string
      startDate?: string
      endDate?: string
    },
  ): Promise<PaginatedResponse<any>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<any>>>(`/clientes/${clientId}/servicos`, params)
    return response.data
  }

  // Histórico financeiro
  static async getClientFinancialHistory(
    clientId: string,
    params?: {
      page?: number
      limit?: number
      type?: string
      startDate?: string
      endDate?: string
    },
  ): Promise<PaginatedResponse<any>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<any>>>(
      `/clientes/${clientId}/financeiro`,
      params,
    )
    return response.data
  }

  // Estatísticas
  static async getClientStats(): Promise<ClientStats> {
    const response = await apiClient.get<ApiResponse<ClientStats>>("/clientes/estatisticas")
    return response.data
  }

  static async getClientActivity(
    clientId: string,
    params?: {
      startDate?: string
      endDate?: string
    },
  ): Promise<
    Array<{
      date: string
      activity: string
      description: string
      metadata?: any
    }>
  > {
    const response = await apiClient.get<
      ApiResponse<
        Array<{
          date: string
          activity: string
          description: string
          metadata?: any
        }>
      >
    >(`/clientes/${clientId}/atividades`, params)
    return response.data
  }

  // Comunicação
  static async sendNotification(
    clientId: string,
    notification: {
      type: "email" | "sms" | "push"
      title: string
      message: string
      data?: any
    },
  ): Promise<{ success: boolean; messageId?: string }> {
    const response = await apiClient.post<ApiResponse<{ success: boolean; messageId?: string }>>(
      `/clientes/${clientId}/notificar`,
      notification,
    )
    return response.data
  }

  static async sendBulkNotification(notification: {
    type: "email" | "sms" | "push"
    title: string
    message: string
    filters?: {
      status?: string
      city?: string
      state?: string
      hasPets?: boolean
      hasSubscription?: boolean
    }
    data?: any
  }): Promise<{ success: boolean; sent: number; failed: number }> {
    const response = await apiClient.post<ApiResponse<{ success: boolean; sent: number; failed: number }>>(
      "/clientes/notificar-em-massa",
      notification,
    )
    return response.data
  }

  // Exportação
  static async exportClients(params?: {
    format?: "csv" | "xlsx"
    filters?: {
      status?: string
      city?: string
      state?: string
      hasPets?: boolean
      hasSubscription?: boolean
      startDate?: string
      endDate?: string
    }
  }): Promise<Blob> {
    const response = await fetch(`${apiClient["baseURL"]}/clientes/exportar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error("Erro ao exportar clientes")
    }

    return response.blob()
  }

  // Importação
  static async importClients(file: File): Promise<{
    success: number
    failed: number
    errors: Array<{ row: number; error: string }>
  }> {
    const formData = new FormData()
    formData.append("file", file)

    const response = await apiClient.post<
      ApiResponse<{
        success: number
        failed: number
        errors: Array<{ row: number; error: string }>
      }>
    >("/clientes/importar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  }
}
