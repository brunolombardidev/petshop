import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"

// Tipos específicos para indicações
export interface Indication {
  id: string
  referrerId: string // Quem indicou
  referredEmail: string // Email do indicado
  referredName?: string // Nome do indicado (opcional)
  referredPhone?: string // Telefone do indicado (opcional)
  status: "pending" | "registered" | "activated" | "expired" | "cancelled"
  type: "client" | "petshop" | "supplier" | "partner"
  message?: string // Mensagem personalizada
  reward?: {
    type: "discount" | "cashback" | "points" | "free_service"
    value: number
    description: string
    claimed: boolean
    claimedAt?: string
  }
  registeredAt?: string // Quando o indicado se registrou
  activatedAt?: string // Quando o indicado ativou a conta
  expiresAt: string
  createdAt: string
  updatedAt: string
  referrer?: {
    id: string
    name: string
    email: string
    userType: string
  }
  referred?: {
    id: string
    name: string
    email: string
    userType: string
  }
}

export interface IndicationStats {
  total: number
  byStatus: Record<Indication["status"], number>
  byType: Record<Indication["type"], number>
  conversionRate: number
  totalRewards: number
  claimedRewards: number
  topReferrers: Array<{
    userId: string
    userName: string
    count: number
    successfulCount: number
    totalRewards: number
  }>
}

export interface IndicationReward {
  id: string
  type: "discount" | "cashback" | "points" | "free_service"
  targetType: "client" | "petshop" | "supplier" | "partner"
  value: number
  description: string
  conditions?: string
  isActive: boolean
  validUntil?: string
  createdAt: string
  updatedAt: string
}

export class IndicationService {
  // Indicações
  static async getIndications(params?: {
    page?: number
    limit?: number
    status?: string
    type?: string
    referrerId?: string
    search?: string
    startDate?: string
    endDate?: string
  }): Promise<PaginatedResponse<Indication>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Indication>>>("/indicacoes", params)
    return response.data
  }

  static async getIndication(id: string): Promise<Indication> {
    const response = await apiClient.get<ApiResponse<Indication>>(`/indicacoes/${id}`)
    return response.data
  }

  static async createIndication(indicationData: {
    referredEmail: string
    referredName?: string
    referredPhone?: string
    type: Indication["type"]
    message?: string
  }): Promise<Indication> {
    const response = await apiClient.post<ApiResponse<Indication>>("/indicacoes", indicationData)
    return response.data
  }

  static async updateIndication(id: string, indicationData: Partial<Indication>): Promise<Indication> {
    const response = await apiClient.put<ApiResponse<Indication>>(`/indicacoes/${id}`, indicationData)
    return response.data
  }

  static async deleteIndication(id: string): Promise<void> {
    await apiClient.delete(`/indicacoes/${id}`)
  }

  static async resendIndication(id: string): Promise<Indication> {
    const response = await apiClient.post<ApiResponse<Indication>>(`/indicacoes/${id}/reenviar`)
    return response.data
  }

  static async cancelIndication(id: string): Promise<Indication> {
    const response = await apiClient.post<ApiResponse<Indication>>(`/indicacoes/${id}/cancelar`)
    return response.data
  }

  // Minhas indicações
  static async getMyIndications(params?: {
    page?: number
    limit?: number
    status?: string
    type?: string
  }): Promise<PaginatedResponse<Indication>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Indication>>>("/indicacoes/minhas", params)
    return response.data
  }

  // Recompensas
  static async claimReward(indicationId: string): Promise<Indication> {
    const response = await apiClient.post<ApiResponse<Indication>>(`/indicacoes/${indicationId}/recompensa/resgatar`)
    return response.data
  }

  static async getMyRewards(params?: {
    page?: number
    limit?: number
    claimed?: boolean
  }): Promise<PaginatedResponse<Indication["reward"] & { indicationId: string }>> {
    const response = await apiClient.get<
      ApiResponse<PaginatedResponse<Indication["reward"] & { indicationId: string }>>
    >("/indicacoes/minhas-recompensas", params)
    return response.data
  }

  // Configurações de recompensas (admin)
  static async getRewardSettings(): Promise<IndicationReward[]> {
    const response = await apiClient.get<ApiResponse<IndicationReward[]>>("/indicacoes/recompensas")
    return response.data
  }

  static async createRewardSetting(
    rewardData: Omit<IndicationReward, "id" | "createdAt" | "updatedAt">,
  ): Promise<IndicationReward> {
    const response = await apiClient.post<ApiResponse<IndicationReward>>("/indicacoes/recompensas", rewardData)
    return response.data
  }

  static async updateRewardSetting(id: string, rewardData: Partial<IndicationReward>): Promise<IndicationReward> {
    const response = await apiClient.put<ApiResponse<IndicationReward>>(`/indicacoes/recompensas/${id}`, rewardData)
    return response.data
  }

  static async deleteRewardSetting(id: string): Promise<void> {
    await apiClient.delete(`/indicacoes/recompensas/${id}`)
  }

  // Estatísticas (admin)
  static async getIndicationStats(params?: {
    startDate?: string
    endDate?: string
    referrerId?: string
  }): Promise<IndicationStats> {
    const response = await apiClient.get<ApiResponse<IndicationStats>>("/indicacoes/estatisticas", params)
    return response.data
  }

  // Validar indicação (quando alguém se registra via link)
  static async validateIndication(token: string): Promise<{
    valid: boolean
    indication?: Indication
    reward?: IndicationReward
  }> {
    const response = await apiClient.get<
      ApiResponse<{
        valid: boolean
        indication?: Indication
        reward?: IndicationReward
      }>
    >(`/indicacoes/validar/${token}`)
    return response.data
  }

  // Gerar link de indicação
  static async generateIndicationLink(indicationId: string): Promise<{ link: string; token: string }> {
    const response = await apiClient.post<ApiResponse<{ link: string; token: string }>>(
      `/indicacoes/${indicationId}/link`,
    )
    return response.data
  }
}

// Exportar instância para compatibilidade
export const indicationService = IndicationService
