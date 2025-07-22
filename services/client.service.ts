import { apiClient } from "@/lib/api-client"
import type { ApiResponse, Client, PaginatedResponse } from "@/types/api"

export interface CreateClientRequest {
  name: string
  email: string
  phone?: string
  document?: string
  address?: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
}

export interface UpdateClientRequest extends Partial<CreateClientRequest> {}

export interface ClientStats {
  totalClients: number
  activeClients: number
  newClientsThisMonth: number
  clientsWithPets: number
  averagePetsPerClient: number
  topCities: Array<{
    city: string
    count: number
  }>
}

export class ClientService {
  // Obter todos os clientes
  static async getAllClients(params?: {
    page?: number
    limit?: number
    search?: string
    city?: string
    state?: string
    isActive?: boolean
  }): Promise<PaginatedResponse<Client>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Client>>>("/clients", params)
    return response.data
  }

  // Obter cliente por ID
  static async getClientById(id: string): Promise<Client> {
    const response = await apiClient.get<ApiResponse<Client>>(`/clients/${id}`)
    return response.data
  }

  // Criar novo cliente
  static async createClient(data: CreateClientRequest): Promise<Client> {
    const response = await apiClient.post<ApiResponse<Client>>("/clients", data)
    return response.data
  }

  // Atualizar cliente
  static async updateClient(id: string, data: UpdateClientRequest): Promise<Client> {
    const response = await apiClient.put<ApiResponse<Client>>(`/clients/${id}`, data)
    return response.data
  }

  // Desativar cliente
  static async deactivateClient(id: string): Promise<Client> {
    const response = await apiClient.patch<ApiResponse<Client>>(`/clients/${id}/deactivate`)
    return response.data
  }

  // Ativar cliente
  static async activateClient(id: string): Promise<Client> {
    const response = await apiClient.patch<ApiResponse<Client>>(`/clients/${id}/activate`)
    return response.data
  }

  // Excluir cliente
  static async deleteClient(id: string): Promise<void> {
    await apiClient.delete(`/clients/${id}`)
  }

  // Buscar clientes por nome ou email
  static async searchClients(query: string): Promise<Client[]> {
    const response = await apiClient.get<ApiResponse<Client[]>>(`/clients/search?q=${encodeURIComponent(query)}`)
    return response.data
  }

  // Obter pets do cliente
  static async getClientPets(clientId: string): Promise<any[]> {
    const response = await apiClient.get<ApiResponse<any[]>>(`/clients/${clientId}/pets`)
    return response.data
  }

  // Obter histórico de serviços do cliente
  static async getClientServiceHistory(
    clientId: string,
    params?: {
      page?: number
      limit?: number
      startDate?: string
      endDate?: string
    },
  ): Promise<PaginatedResponse<any>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<any>>>(`/clients/${clientId}/services`, params)
    return response.data
  }

  // Obter estatísticas de clientes
  static async getClientStats(): Promise<ClientStats> {
    const response = await apiClient.get<ApiResponse<ClientStats>>("/clients/stats")
    return response.data
  }

  // Exportar clientes
  static async exportClients(
    format: "csv" | "xlsx" = "csv",
    filters?: {
      city?: string
      state?: string
      isActive?: boolean
      startDate?: string
      endDate?: string
    },
  ): Promise<Blob> {
    const params = new URLSearchParams({ format })
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value))
        }
      })
    }
    return apiClient.download(`/clients/export?${params.toString()}`)
  }

  // Importar clientes
  static async importClients(file: File): Promise<{
    success: number
    errors: Array<{ row: number; message: string }>
  }> {
    const formData = new FormData()
    formData.append("file", file)

    const response = await apiClient.upload<
      ApiResponse<{
        success: number
        errors: Array<{ row: number; message: string }>
      }>
    >("/clients/import", formData)

    return response.data
  }

  // Obter clientes por cidade
  static async getClientsByCity(
    city: string,
    params?: {
      page?: number
      limit?: number
    },
  ): Promise<PaginatedResponse<Client>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Client>>>(
      `/clients/by-city/${encodeURIComponent(city)}`,
      params,
    )
    return response.data
  }

  // Obter clientes aniversariantes
  static async getBirthdayClients(month?: number): Promise<Client[]> {
    const params = month ? { month } : {}
    const response = await apiClient.get<ApiResponse<Client[]>>("/clients/birthdays", params)
    return response.data
  }

  // Enviar notificação para cliente
  static async sendNotificationToClient(
    clientId: string,
    notification: {
      title: string
      message: string
      type: "info" | "success" | "warning" | "error"
    },
  ): Promise<void> {
    await apiClient.post(`/clients/${clientId}/notify`, notification)
  }

  // Obter notas do cliente
  static async getClientNotes(clientId: string): Promise<
    Array<{
      id: string
      content: string
      createdBy: string
      createdAt: string
    }>
  > {
    const response = await apiClient.get<ApiResponse<any[]>>(`/clients/${clientId}/notes`)
    return response.data
  }

  // Adicionar nota ao cliente
  static async addClientNote(clientId: string, content: string): Promise<void> {
    await apiClient.post(`/clients/${clientId}/notes`, { content })
  }
}
