import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"
import type {
  Service,
  ServiceContract,
  ContractServiceRequest,
  ServiceCategory,
  ServiceProvider,
  ServiceSearch,
  ServiceStats,
} from "@/types/service"

export class ServiceService {
  // ==================== SERVIÇOS ====================

  // Buscar serviços
  static async searchServices(filters: ServiceSearch): Promise<PaginatedResponse<Service>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Service>>>("/servicos/buscar", filters)
    return response.data
  }

  // Obter serviços por provedor (petshop ou fornecedor)
  static async getServicesByProvider(
    providerId: string,
    tipo: "petshop" | "fornecedor",
  ): Promise<PaginatedResponse<Service>> {
    const endpoint = tipo === "petshop" ? `/petshops/${providerId}/servicos` : `/fornecedores/${providerId}/servicos`
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Service>>>(endpoint)
    return response.data
  }

  // Obter detalhes de um serviço
  static async getServiceById(id: string): Promise<Service> {
    const response = await apiClient.get<ApiResponse<Service>>(`/servicos/${id}`)
    return response.data
  }

  // Criar novo serviço (para petshops/fornecedores)
  static async createService(serviceData: {
    nome: string
    descricao: string
    preco: number
    categoria: string
    duracao?: number
    requisitos?: string[]
    imagens?: string[]
  }): Promise<Service> {
    const response = await apiClient.post<ApiResponse<Service>>("/servicos", serviceData)
    return response.data
  }

  // Atualizar serviço
  static async updateService(id: string, serviceData: Partial<Service>): Promise<Service> {
    const response = await apiClient.put<ApiResponse<Service>>(`/servicos/${id}`, serviceData)
    return response.data
  }

  // Desativar/ativar serviço
  static async toggleServiceStatus(id: string): Promise<Service> {
    const response = await apiClient.patch<ApiResponse<Service>>(`/servicos/${id}/toggle-status`)
    return response.data
  }

  // Excluir serviço
  static async deleteService(id: string): Promise<void> {
    await apiClient.delete(`/servicos/${id}`)
  }

  // ==================== CATEGORIAS ====================

  // Obter todas as categorias
  static async getCategories(): Promise<ServiceCategory[]> {
    const response = await apiClient.get<ApiResponse<ServiceCategory[]>>("/servicos/categorias")
    return response.data
  }

  // Criar categoria (admin)
  static async createCategory(categoryData: {
    nome: string
    descricao?: string
    icone?: string
    cor?: string
  }): Promise<ServiceCategory> {
    const response = await apiClient.post<ApiResponse<ServiceCategory>>("/servicos/categorias", categoryData)
    return response.data
  }

  // ==================== PROVEDORES ====================

  // Buscar provedores de serviço
  static async searchProviders(filters: {
    query?: string
    tipo?: "petshop" | "fornecedor"
    cidade?: string
    estado?: string
    categoria?: string
    avaliacao?: number
    verificado?: boolean
    page?: number
    limit?: number
  }): Promise<PaginatedResponse<ServiceProvider>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<ServiceProvider>>>(
      "/servicos/provedores/buscar",
      filters,
    )
    return response.data
  }

  // Obter detalhes do provedor
  static async getProviderById(id: string, tipo: "petshop" | "fornecedor"): Promise<ServiceProvider> {
    const endpoint = tipo === "petshop" ? `/petshops/${id}` : `/fornecedores/${id}`
    const response = await apiClient.get<ApiResponse<ServiceProvider>>(endpoint)
    return response.data
  }

  // Validar cartão pet do provedor
  static async validateProviderCard(qrCode: string): Promise<ServiceProvider> {
    const response = await apiClient.post<ApiResponse<ServiceProvider>>("/servicos/validar-cartao", { qrCode })
    return response.data
  }

  // ==================== CONTRATAÇÕES ====================

  // Contratar serviço
  static async contractService(contractData: ContractServiceRequest): Promise<ServiceContract> {
    const response = await apiClient.post<ApiResponse<ServiceContract>>("/servicos/contratar", contractData)
    return response.data
  }

  // Obter meus contratos (como cliente)
  static async getMyContracts(filters?: {
    status?: string
    petId?: string
    dataInicio?: string
    dataFim?: string
    page?: number
    limit?: number
  }): Promise<PaginatedResponse<ServiceContract>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<ServiceContract>>>(
      "/servicos/meus-contratos",
      filters,
    )
    return response.data
  }

  // Obter contratos recebidos (como petshop/fornecedor)
  static async getReceivedContracts(filters?: {
    status?: string
    clienteId?: string
    dataInicio?: string
    dataFim?: string
    page?: number
    limit?: number
  }): Promise<PaginatedResponse<ServiceContract>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<ServiceContract>>>(
      "/servicos/contratos-recebidos",
      filters,
    )
    return response.data
  }

  // Obter detalhes do contrato
  static async getContractById(id: string): Promise<ServiceContract> {
    const response = await apiClient.get<ApiResponse<ServiceContract>>(`/servicos/contratos/${id}`)
    return response.data
  }

  // Atualizar status do contrato
  static async updateContractStatus(
    id: string,
    status: "ativo" | "concluido" | "cancelado",
    observacoes?: string,
  ): Promise<ServiceContract> {
    const response = await apiClient.patch<ApiResponse<ServiceContract>>(`/servicos/contratos/${id}/status`, {
      status,
      observacoes,
    })
    return response.data
  }

  // Avaliar serviço contratado
  static async rateContract(id: string, avaliacao: number, comentario?: string): Promise<ServiceContract> {
    const response = await apiClient.post<ApiResponse<ServiceContract>>(`/servicos/contratos/${id}/avaliar`, {
      avaliacao,
      comentario,
    })
    return response.data
  }

  // Cancelar contrato
  static async cancelContract(id: string, motivo?: string): Promise<ServiceContract> {
    const response = await apiClient.patch<ApiResponse<ServiceContract>>(`/servicos/contratos/${id}/cancelar`, {
      motivo,
    })
    return response.data
  }

  // ==================== ESTATÍSTICAS ====================

  // Obter estatísticas de serviços
  static async getServiceStats(): Promise<ServiceStats> {
    const response = await apiClient.get<ApiResponse<ServiceStats>>("/servicos/estatisticas")
    return response.data
  }

  // Obter relatório de contratos
  static async getContractsReport(filters: {
    dataInicio: string
    dataFim: string
    status?: string
    categoria?: string
    formato?: "json" | "csv" | "pdf"
  }): Promise<any> {
    if (filters.formato === "json") {
      const response = await apiClient.get<ApiResponse<any>>("/servicos/relatorio-contratos", filters)
      return response.data
    } else {
      return apiClient.download(`/servicos/relatorio-contratos?${new URLSearchParams(filters).toString()}`)
    }
  }

  // ==================== AVALIAÇÕES ====================

  // Obter avaliações de um provedor
  static async getProviderReviews(
    providerId: string,
    tipo: "petshop" | "fornecedor",
    page = 1,
    limit = 10,
  ): Promise<
    PaginatedResponse<{
      id: string
      avaliacao: number
      comentario?: string
      cliente: { nome: string; avatar?: string }
      servico: { nome: string }
      createdAt: string
    }>
  > {
    const endpoint =
      tipo === "petshop" ? `/petshops/${providerId}/avaliacoes` : `/fornecedores/${providerId}/avaliacoes`
    const response = await apiClient.get<ApiResponse<PaginatedResponse<any>>>(endpoint, { page, limit })
    return response.data
  }

  // Obter avaliações de um serviço específico
  static async getServiceReviews(
    serviceId: string,
    page = 1,
    limit = 10,
  ): Promise<
    PaginatedResponse<{
      id: string
      avaliacao: number
      comentario?: string
      cliente: { nome: string; avatar?: string }
      pet?: { nome: string; especie: string }
      createdAt: string
    }>
  > {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<any>>>(`/servicos/${serviceId}/avaliacoes`, {
      page,
      limit,
    })
    return response.data
  }

  // ==================== FAVORITOS ====================

  // Adicionar provedor aos favoritos
  static async addProviderToFavorites(providerId: string, tipo: "petshop" | "fornecedor"): Promise<void> {
    await apiClient.post("/servicos/favoritos", { providerId, tipo })
  }

  // Remover provedor dos favoritos
  static async removeProviderFromFavorites(providerId: string, tipo: "petshop" | "fornecedor"): Promise<void> {
    await apiClient.delete("/servicos/favoritos", { data: { providerId, tipo } })
  }

  // Obter meus provedores favoritos
  static async getFavoriteProviders(): Promise<ServiceProvider[]> {
    const response = await apiClient.get<ApiResponse<ServiceProvider[]>>("/servicos/favoritos")
    return response.data
  }

  // Verificar se provedor está nos favoritos
  static async isProviderFavorite(providerId: string, tipo: "petshop" | "fornecedor"): Promise<boolean> {
    const response = await apiClient.get<ApiResponse<{ isFavorite: boolean }>>(
      `/servicos/favoritos/check?providerId=${providerId}&tipo=${tipo}`,
    )
    return response.data.isFavorite
  }
}
