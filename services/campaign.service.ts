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
  status: "Ativa" | "Concluída" | "Pausada"
  userId: string
  imagem?: string
  observacoes?: string
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

export interface UpdateCampaignRequest extends Partial<CreateCampaignRequest> {
  id: string
}

class CampaignService {
  private readonly baseEndpoint = "/campaigns"

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
      // Se há imagem, usar upload de arquivo
      const { imagem, ...campaignData } = data
      return apiClient.uploadFile<ApiResponse<Campaign>>(`${this.baseEndpoint}/with-image`, imagem, campaignData)
    }

    return apiClient.post<ApiResponse<Campaign>>(this.baseEndpoint, data)
  }

  async updateCampaign(data: UpdateCampaignRequest): Promise<ApiResponse<Campaign>> {
    const { id, ...updateData } = data
    return apiClient.put<ApiResponse<Campaign>>(`${this.baseEndpoint}/${id}`, updateData)
  }

  async deleteCampaign(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`${this.baseEndpoint}/${id}`)
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
      totalRaised: number
      totalGoal: number
    }>
  > {
    return apiClient.get<ApiResponse<any>>(`${this.baseEndpoint}/stats`)
  }
}

export const campaignService = new CampaignService()
