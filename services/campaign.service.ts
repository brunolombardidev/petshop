import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"

export interface Campaign {
  id: string
  titulo: string
  descricao: string
  categoria: string
  meta: number
  arrecadado: number
  dataInicio: string
  dataFim: string
  status: "pendente" | "ativa" | "aprovada" | "negada" | "concluida" | "pausada"
  userId: string
  userName: string
  imagem?: string
  observacoes?: string
  motivoNegacao?: string
  aprovadoPor?: string
  dataAprovacao?: string
  createdAt: string
  updatedAt: string
}

export interface CreateCampaignRequest {
  titulo: string
  descricao: string
  categoria: string
  meta: number
  dataInicio: string
  dataFim: string
  observacoes?: string
  imagem?: File
}

class CampaignService {
  private readonly baseEndpoint = "/campanhas"

  async getCampaigns(params?: {
    page?: number
    limit?: number
    search?: string
    categoria?: string
    status?: string
  }): Promise<PaginatedResponse<Campaign>> {
    return apiClient.get<PaginatedResponse<Campaign>>(this.baseEndpoint, params)
  }

  async getCampaignById(id: string): Promise<ApiResponse<Campaign>> {
    return apiClient.get<ApiResponse<Campaign>>(`${this.baseEndpoint}/${id}`)
  }

  async createCampaign(data: CreateCampaignRequest): Promise<ApiResponse<Campaign>> {
    if (data.imagem) {
      const formData = new FormData()
      formData.append("titulo", data.titulo)
      formData.append("descricao", data.descricao)
      formData.append("categoria", data.categoria)
      formData.append("meta", data.meta.toString())
      formData.append("dataInicio", data.dataInicio)
      formData.append("dataFim", data.dataFim)
      if (data.observacoes) formData.append("observacoes", data.observacoes)
      formData.append("imagem", data.imagem)

      const response = await fetch(`${apiClient["baseURL"]}${this.baseEndpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: formData,
      })

      return response.json()
    }

    return apiClient.post<ApiResponse<Campaign>>(this.baseEndpoint, data)
  }

  async deleteCampaign(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`${this.baseEndpoint}/${id}`)
  }

  async approveCampaign(id: string): Promise<ApiResponse<Campaign>> {
    return apiClient.patch<ApiResponse<Campaign>>(`${this.baseEndpoint}/${id}/aprovar`, {})
  }

  async denyCampaign(id: string, motivo?: string): Promise<ApiResponse<Campaign>> {
    return apiClient.patch<ApiResponse<Campaign>>(`${this.baseEndpoint}/${id}/negar`, {
      motivo,
    })
  }

  async donateToCampaign(campaignId: string, amount: number): Promise<ApiResponse<any>> {
    return apiClient.post<ApiResponse<any>>(`${this.baseEndpoint}/${campaignId}/donate`, {
      amount,
    })
  }

  async getCampaignStats(): Promise<
    ApiResponse<{
      totalCampaigns: number
      activeCampaigns: number
      pendingCampaigns: number
      totalRaised: number
      totalGoal: number
    }>
  > {
    return apiClient.get<ApiResponse<any>>(`${this.baseEndpoint}/stats`)
  }
}

export const campaignService = new CampaignService()
