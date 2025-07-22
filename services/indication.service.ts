import { apiClient } from "@/lib/api-client"
import type { ApiResponse, Indication, PaginatedResponse } from "@/types/api"

export interface CreateIndicationRequest {
  referredEmail: string
  referredName?: string
  message?: string
}

export interface IndicationStats {
  totalIndications: number
  successfulIndications: number
  pendingIndications: number
  conversionRate: number
  totalRewards: number
  thisMonthIndications: number
  topReferrers: Array<{
    userId: string
    userName: string
    indicationCount: number
    successfulCount: number
    totalRewards: number
  }>
}

export interface IndicationReward {
  id: string
  indicationId: string
  referrerUserId: string
  amount: number
  type: "credit" | "discount" | "cash"
  status: "pending" | "approved" | "paid"
  description: string
  createdAt: string
  paidAt?: string
}

export class IndicationService {
  // Obter minhas indicações
  static async getMyIndications(params?: {
    page?: number
    limit?: number
    status?: "pending" | "registered" | "expired"
  }): Promise<PaginatedResponse<Indication>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Indication>>>("/indications/me", params)
    return response.data
  }

  // Criar nova indicação
  static async createIndication(data: CreateIndicationRequest): Promise<Indication> {
    const response = await apiClient.post<ApiResponse<Indication>>("/indications", data)
    return response.data
  }

  // Reenviar convite de indicação
  static async resendInvitation(indicationId: string): Promise<void> {
    await apiClient.post(`/indications/${indicationId}/resend`)
  }

  // Cancelar indicação
  static async cancelIndication(indicationId: string): Promise<void> {
    await apiClient.delete(`/indications/${indicationId}`)
  }

  // Obter todas as indicações (admin)
  static async getAllIndications(params?: {
    page?: number
    limit?: number
    status?: "pending" | "registered" | "expired"
    referrerUserId?: string
    startDate?: string
    endDate?: string
  }): Promise<PaginatedResponse<Indication>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Indication>>>("/indications", params)
    return response.data
  }

  // Obter estatísticas de indicações
  static async getIndicationStats(params?: {
    startDate?: string
    endDate?: string
    userId?: string
  }): Promise<IndicationStats> {
    const response = await apiClient.get<ApiResponse<IndicationStats>>("/indications/stats", params)
    return response.data
  }

  // Obter minhas recompensas
  static async getMyRewards(params?: {
    page?: number
    limit?: number
    status?: "pending" | "approved" | "paid"
  }): Promise<PaginatedResponse<IndicationReward>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<IndicationReward>>>(
      "/indications/rewards/me",
      params,
    )
    return response.data
  }

  // Obter todas as recompensas (admin)
  static async getAllRewards(params?: {
    page?: number
    limit?: number
    status?: "pending" | "approved" | "paid"
    userId?: string
    startDate?: string
    endDate?: string
  }): Promise<PaginatedResponse<IndicationReward>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<IndicationReward>>>(
      "/indications/rewards",
      params,
    )
    return response.data
  }

  // Aprovar recompensa (admin)
  static async approveReward(rewardId: string): Promise<IndicationReward> {
    const response = await apiClient.patch<ApiResponse<IndicationReward>>(`/indications/rewards/${rewardId}/approve`)
    return response.data
  }

  // Marcar recompensa como paga (admin)
  static async markRewardAsPaid(
    rewardId: string,
    paymentDetails?: {
      method: string
      transactionId?: string
      notes?: string
    },
  ): Promise<IndicationReward> {
    const response = await apiClient.patch<ApiResponse<IndicationReward>>(
      `/indications/rewards/${rewardId}/pay`,
      paymentDetails,
    )
    return response.data
  }

  // Obter configurações do programa de indicação
  static async getIndicationSettings(): Promise<{
    rewardAmount: number
    rewardType: "credit" | "discount" | "cash"
    minimumPurchaseAmount?: number
    expirationDays: number
    maxIndicationsPerUser?: number
    isActive: boolean
    terms: string
  }> {
    const response = await apiClient.get<ApiResponse<any>>("/indications/settings")
    return response.data
  }

  // Atualizar configurações do programa de indicação (admin)
  static async updateIndicationSettings(settings: {
    rewardAmount?: number
    rewardType?: "credit" | "discount" | "cash"
    minimumPurchaseAmount?: number
    expirationDays?: number
    maxIndicationsPerUser?: number
    isActive?: boolean
    terms?: string
  }): Promise<void> {
    await apiClient.put("/indications/settings", settings)
  }

  // Verificar se email já foi indicado
  static async checkEmailAvailability(email: string): Promise<{ available: boolean; reason?: string }> {
    const response = await apiClient.post<ApiResponse<{ available: boolean; reason?: string }>>(
      "/indications/check-email",
      { email },
    )
    return response.data
  }

  // Obter link de indicação personalizado
  static async getIndicationLink(): Promise<{ link: string; code: string }> {
    const response = await apiClient.get<ApiResponse<{ link: string; code: string }>>("/indications/link")
    return response.data
  }

  // Registrar clique no link de indicação
  static async trackIndicationClick(
    code: string,
    metadata?: {
      userAgent?: string
      referrer?: string
      ip?: string
    },
  ): Promise<void> {
    await apiClient.post("/indications/track-click", { code, metadata })
  }

  // Obter ranking de indicadores
  static async getIndicationRanking(params?: {
    period?: "month" | "quarter" | "year" | "all"
    limit?: number
  }): Promise<
    Array<{
      rank: number
      userId: string
      userName: string
      indicationCount: number
      successfulCount: number
      conversionRate: number
      totalRewards: number
    }>
  > {
    const response = await apiClient.get<ApiResponse<any[]>>("/indications/ranking", params)
    return response.data
  }

  // Exportar relatório de indicações
  static async exportIndicationReport(params: {
    format: "csv" | "xlsx"
    startDate?: string
    endDate?: string
    status?: "pending" | "registered" | "expired"
    includeRewards?: boolean
  }): Promise<Blob> {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value))
      }
    })

    return apiClient.download(`/indications/export?${queryParams.toString()}`)
  }
}
