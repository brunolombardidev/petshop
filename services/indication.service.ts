import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"

export interface Indication {
  id: string
  nomeIndicado: string
  emailIndicado: string
  telefoneIndicado: string
  tipoIndicacao: "cliente" | "petshop" | "fornecedor" | "empresa"
  status: "pendente" | "aprovada" | "rejeitada"
  dataIndicacao: string
  dataAprovacao?: string
  comissao: number
  observacoes?: string
  empresaRamo?: string
  empresaTamanho?: string
  petshopEspecialidade?: string
  fornecedorProdutos?: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface CreateIndicationRequest {
  nomeIndicado: string
  emailIndicado: string
  telefoneIndicado: string
  tipoIndicacao: "cliente" | "petshop" | "fornecedor" | "empresa"
  observacoes?: string
  empresaRamo?: string
  empresaTamanho?: string
  petshopEspecialidade?: string
  fornecedorProdutos?: string
}

class IndicationService {
  private readonly baseEndpoint = "/indicacoes"

  async getIndications(params?: {
    page?: number
    limit?: number
    search?: string
    tipoIndicacao?: string
    status?: string
  }): Promise<PaginatedResponse<Indication>> {
    return apiClient.get<PaginatedResponse<Indication>>(this.baseEndpoint, params)
  }

  async getIndicationById(id: string): Promise<ApiResponse<Indication>> {
    return apiClient.get<ApiResponse<Indication>>(`${this.baseEndpoint}/${id}`)
  }

  async createIndication(data: CreateIndicationRequest): Promise<ApiResponse<Indication>> {
    return apiClient.post<ApiResponse<Indication>>(this.baseEndpoint, data)
  }

  async deleteIndication(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`${this.baseEndpoint}/${id}`)
  }

  async getIndicationStats(): Promise<
    ApiResponse<{
      totalIndicacoes: number
      aprovadas: number
      pendentes: number
      rejeitadas: number
      comissaoTotal: number
    }>
  > {
    return apiClient.get<ApiResponse<any>>(`${this.baseEndpoint}/stats`)
  }
}

export const indicationService = new IndicationService()
