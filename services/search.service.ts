import { apiClient } from "@/lib/api-client"
import type { ApiResponse, SearchResult, SearchFilters, PaginatedResponse } from "@/types/api"

export interface SearchRequest extends SearchFilters {
  page?: number
  limit?: number
}

export interface SearchSuggestion {
  text: string
  type: "query" | "category" | "location" | "brand"
  count?: number
}

export interface PopularSearch {
  query: string
  count: number
  category?: string
}

export interface SearchStats {
  totalSearches: number
  uniqueSearches: number
  averageResultsPerSearch: number
  topQueries: PopularSearch[]
  searchesByCategory: Record<string, number>
  searchTrends: Array<{
    date: string
    count: number
    topQuery: string
  }>
}

export class SearchService {
  // Busca geral
  static async search(params: SearchRequest): Promise<PaginatedResponse<SearchResult>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<SearchResult>>>("/search", params)
    return response.data
  }

  // Buscar produtos
  static async searchProducts(params: SearchRequest): Promise<PaginatedResponse<SearchResult>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<SearchResult>>>("/search/products", params)
    return response.data
  }

  // Buscar serviços
  static async searchServices(params: SearchRequest): Promise<PaginatedResponse<SearchResult>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<SearchResult>>>("/search/services", params)
    return response.data
  }

  // Buscar petshops
  static async searchPetshops(params: SearchRequest): Promise<PaginatedResponse<SearchResult>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<SearchResult>>>("/search/petshops", params)
    return response.data
  }

  // Buscar veterinários
  static async searchVeterinarians(params: SearchRequest): Promise<PaginatedResponse<SearchResult>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<SearchResult>>>("/search/veterinarians", params)
    return response.data
  }

  // Obter sugestões de busca
  static async getSearchSuggestions(query: string, limit = 10): Promise<SearchSuggestion[]> {
    const response = await apiClient.get<ApiResponse<SearchSuggestion[]>>(
      `/search/suggestions?q=${encodeURIComponent(query)}&limit=${limit}`,
    )
    return response.data
  }

  // Obter buscas populares
  static async getPopularSearches(limit = 10): Promise<PopularSearch[]> {
    const response = await apiClient.get<ApiResponse<PopularSearch[]>>(`/search/popular?limit=${limit}`)
    return response.data
  }

  // Obter categorias disponíveis
  static async getSearchCategories(): Promise<
    Array<{
      id: string
      name: string
      count: number
      subcategories?: Array<{
        id: string
        name: string
        count: number
      }>
    }>
  > {
    const response = await apiClient.get<ApiResponse<any[]>>("/search/categories")
    return response.data
  }

  // Obter filtros disponíveis
  static async getSearchFilters(category?: string): Promise<{
    priceRanges: Array<{ min: number; max: number; label: string }>
    brands: Array<{ name: string; count: number }>
    locations: Array<{ city: string; state: string; count: number }>
    ratings: Array<{ rating: number; count: number }>
    features: Array<{ name: string; count: number }>
  }> {
    const params = category ? { category } : {}
    const response = await apiClient.get<ApiResponse<any>>("/search/filters", params)
    return response.data
  }

  // Salvar busca (para histórico)
  static async saveSearch(query: string, filters?: SearchFilters, results?: number): Promise<void> {
    await apiClient.post("/search/save", { query, filters, results })
  }

  // Obter histórico de buscas
  static async getSearchHistory(limit = 20): Promise<
    Array<{
      id: string
      query: string
      filters?: SearchFilters
      results: number
      searchedAt: string
    }>
  > {
    const response = await apiClient.get<ApiResponse<any[]>>(`/search/history?limit=${limit}`)
    return response.data
  }

  // Limpar histórico de buscas
  static async clearSearchHistory(): Promise<void> {
    await apiClient.delete("/search/history")
  }

  // Remover item do histórico
  static async removeFromHistory(searchId: string): Promise<void> {
    await apiClient.delete(`/search/history/${searchId}`)
  }

  // Obter estatísticas de busca (admin)
  static async getSearchStats(params?: {
    startDate?: string
    endDate?: string
    category?: string
  }): Promise<SearchStats> {
    const response = await apiClient.get<ApiResponse<SearchStats>>("/search/stats", params)
    return response.data
  }

  // Indexar conteúdo para busca (admin)
  static async indexContent(data: {
    type: "product" | "service" | "petshop" | "veterinarian"
    id: string
    title: string
    description: string
    keywords: string[]
    category: string
    location?: string
    price?: number
    rating?: number
    metadata?: Record<string, any>
  }): Promise<void> {
    await apiClient.post("/search/index", data)
  }

  // Remover conteúdo do índice (admin)
  static async removeFromIndex(type: string, id: string): Promise<void> {
    await apiClient.delete(`/search/index/${type}/${id}`)
  }

  // Reindexar tudo (admin)
  static async reindexAll(): Promise<{ status: string; jobId: string }> {
    const response = await apiClient.post<ApiResponse<{ status: string; jobId: string }>>("/search/reindex")
    return response.data
  }

  // Obter status da reindexação (admin)
  static async getReindexStatus(jobId: string): Promise<{
    status: "pending" | "running" | "completed" | "failed"
    progress: number
    total: number
    processed: number
    errors: string[]
  }> {
    const response = await apiClient.get<ApiResponse<any>>(`/search/reindex/${jobId}/status`)
    return response.data
  }
}
