import { apiClient } from "@/lib/api-client"
import type { ApiResponse, Campaign, PaginatedResponse } from "@/types/api"

export interface CreateCampaignRequest {
  title: string
  description: string
  startDate: string
  endDate: string
  budget: number
  targetAudience: string
  channels?: string[]
  objectives?: string[]
}

export interface UpdateCampaignRequest extends Partial<CreateCampaignRequest> {}

export interface CampaignMetrics {
  impressions: number
  clicks: number
  conversions: number
  cost: number
  ctr: number // Click-through rate
  cpc: number // Cost per click
  cpa: number // Cost per acquisition
  roi: number // Return on investment
}

export interface CampaignStats {
  totalCampaigns: number
  activeCampaigns: number
  completedCampaigns: number
  totalBudget: number
  totalSpent: number
  averageRoi: number
  topPerformingCampaigns: Array<{
    id: string
    title: string
    roi: number
    conversions: number
  }>
}

export class CampaignService {
  // Obter todas as campanhas
  static async getAllCampaigns(params?: {
    page?: number
    limit?: number
    status?: "draft" | "active" | "paused" | "completed"
    search?: string
    startDate?: string
    endDate?: string
  }): Promise<PaginatedResponse<Campaign>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Campaign>>>("/campaigns", params)
    return response.data
  }

  // Obter campanha por ID
  static async getCampaignById(id: string): Promise<Campaign> {
    const response = await apiClient.get<ApiResponse<Campaign>>(`/campaigns/${id}`)
    return response.data
  }

  // Criar nova campanha
  static async createCampaign(data: CreateCampaignRequest): Promise<Campaign> {
    const response = await apiClient.post<ApiResponse<Campaign>>("/campaigns", data)
    return response.data
  }

  // Atualizar campanha
  static async updateCampaign(id: string, data: UpdateCampaignRequest): Promise<Campaign> {
    const response = await apiClient.put<ApiResponse<Campaign>>(`/campaigns/${id}`, data)
    return response.data
  }

  // Excluir campanha
  static async deleteCampaign(id: string): Promise<void> {
    await apiClient.delete(`/campaigns/${id}`)
  }

  // Ativar campanha
  static async activateCampaign(id: string): Promise<Campaign> {
    const response = await apiClient.patch<ApiResponse<Campaign>>(`/campaigns/${id}/activate`)
    return response.data
  }

  // Pausar campanha
  static async pauseCampaign(id: string): Promise<Campaign> {
    const response = await apiClient.patch<ApiResponse<Campaign>>(`/campaigns/${id}/pause`)
    return response.data
  }

  // Completar campanha
  static async completeCampaign(id: string): Promise<Campaign> {
    const response = await apiClient.patch<ApiResponse<Campaign>>(`/campaigns/${id}/complete`)
    return response.data
  }

  // Obter métricas da campanha
  static async getCampaignMetrics(
    id: string,
    params?: {
      startDate?: string
      endDate?: string
    },
  ): Promise<CampaignMetrics> {
    const response = await apiClient.get<ApiResponse<CampaignMetrics>>(`/campaigns/${id}/metrics`, params)
    return response.data
  }

  // Obter estatísticas gerais de campanhas
  static async getCampaignStats(params?: {
    startDate?: string
    endDate?: string
  }): Promise<CampaignStats> {
    const response = await apiClient.get<ApiResponse<CampaignStats>>("/campaigns/stats", params)
    return response.data
  }

  // Duplicar campanha
  static async duplicateCampaign(id: string, newTitle?: string): Promise<Campaign> {
    const response = await apiClient.post<ApiResponse<Campaign>>(`/campaigns/${id}/duplicate`, { newTitle })
    return response.data
  }

  // Obter relatório de performance
  static async getCampaignReport(id: string, format: "pdf" | "xlsx" = "pdf"): Promise<Blob> {
    return apiClient.download(`/campaigns/${id}/report?format=${format}`)
  }

  // Exportar campanhas
  static async exportCampaigns(params: {
    format: "csv" | "xlsx"
    status?: "draft" | "active" | "paused" | "completed"
    startDate?: string
    endDate?: string
  }): Promise<Blob> {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value))
      }
    })

    return apiClient.download(`/campaigns/export?${queryParams.toString()}`)
  }

  // Obter templates de campanha
  static async getCampaignTemplates(): Promise<
    Array<{
      id: string
      name: string
      description: string
      category: string
      template: Partial<Campaign>
    }>
  > {
    const response = await apiClient.get<ApiResponse<any[]>>("/campaigns/templates")
    return response.data
  }

  // Criar campanha a partir de template
  static async createFromTemplate(templateId: string, customData: Partial<CreateCampaignRequest>): Promise<Campaign> {
    const response = await apiClient.post<ApiResponse<Campaign>>(`/campaigns/from-template/${templateId}`, customData)
    return response.data
  }

  // Obter audiências disponíveis
  static async getTargetAudiences(): Promise<
    Array<{
      id: string
      name: string
      description: string
      size: number
      criteria: Record<string, any>
    }>
  > {
    const response = await apiClient.get<ApiResponse<any[]>>("/campaigns/audiences")
    return response.data
  }

  // Estimar alcance da campanha
  static async estimateReach(
    targetAudience: string,
    budget: number,
  ): Promise<{
    estimatedReach: number
    estimatedImpressions: number
    estimatedClicks: number
    estimatedCost: number
  }> {
    const response = await apiClient.post<ApiResponse<any>>("/campaigns/estimate-reach", {
      targetAudience,
      budget,
    })
    return response.data
  }
}
