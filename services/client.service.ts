import { apiClient } from "@/lib/api-client"

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  cpf?: string
  birthDate?: string
  address?: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  pets: Array<{
    id: string
    name: string
    species: string
    breed?: string
  }>
  totalSpent: number
  lastVisit?: string
  status: "active" | "inactive"
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CreateClientData {
  name: string
  email: string
  phone: string
  cpf?: string
  birthDate?: string
  address?: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  notes?: string
}

export interface ClientSale {
  id: string
  clientId: string
  total: number
  items: Array<{
    type: "product" | "service"
    name: string
    quantity: number
    price: number
    total: number
  }>
  paymentMethod: string
  status: "pending" | "completed" | "cancelled"
  createdAt: string
}

export interface ClientStats {
  totalClients: number
  activeClients: number
  newClientsThisMonth: number
  totalRevenue: number
  averageTicket: number
  topClients: Array<{
    id: string
    name: string
    totalSpent: number
  }>
}

class ClientService {
  async getClients(
    page = 1,
    limit = 10,
    search?: string,
  ): Promise<{
    clients: Client[]
    total: number
    page: number
    totalPages: number
  }> {
    const response = await apiClient.get("/clients", {
      params: { page, limit, search },
    })
    return response.data
  }

  async getClientById(id: string): Promise<Client> {
    const response = await apiClient.get(`/clients/${id}`)
    return response.data
  }

  async createClient(data: CreateClientData): Promise<Client> {
    const response = await apiClient.post("/clients", data)
    return response.data
  }

  async updateClient(id: string, data: Partial<CreateClientData>): Promise<Client> {
    const response = await apiClient.put(`/clients/${id}`, data)
    return response.data
  }

  async deleteClient(id: string): Promise<void> {
    await apiClient.delete(`/clients/${id}`)
  }

  async toggleClientStatus(id: string): Promise<Client> {
    const response = await apiClient.patch(`/clients/${id}/toggle-status`)
    return response.data
  }

  async getClientSales(clientId: string): Promise<ClientSale[]> {
    const response = await apiClient.get(`/clients/${clientId}/sales`)
    return response.data
  }

  async createClientSale(
    clientId: string,
    saleData: {
      items: Array<{
        type: "product" | "service"
        name: string
        quantity: number
        price: number
      }>
      paymentMethod: string
    },
  ): Promise<ClientSale> {
    const response = await apiClient.post(`/clients/${clientId}/sales`, saleData)
    return response.data
  }

  async getClientStats(): Promise<ClientStats> {
    const response = await apiClient.get("/clients/stats")
    return response.data
  }

  async exportClients(format: "csv" | "excel" = "csv"): Promise<Blob> {
    const response = await apiClient.get("/clients/export", {
      params: { format },
      responseType: "blob",
    })
    return response.data
  }

  async importClients(file: File): Promise<{
    success: number
    errors: Array<{ row: number; error: string }>
  }> {
    const formData = new FormData()
    formData.append("file", file)

    const response = await apiClient.post("/clients/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  }
}

export const clientService = new ClientService()
