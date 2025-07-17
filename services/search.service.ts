import { apiClient } from "@/lib/api-client"
import type { ApiResponse } from "@/types/api"

export interface SearchResult {
  id: string
  tipo: "usuario" | "pet" | "produto" | "servico" | "empresa"
  titulo: string
  subtitulo?: string
  descricao?: string
  imagem?: string
  categoria?: string
  localizacao?: string
  avaliacao?: number
  preco?: number
  disponivel?: boolean
  destaque?: boolean
  tags?: string[]
  url?: string
  createdAt: string
}

export interface SearchFilters {
  tipo?: string[]
  categoria?: string[]
  localizacao?: string
  precoMin?: number
  precoMax?: number
  avaliacaoMin?: number
  disponivel?: boolean
  destaque?: boolean
  raio?: number // em km
  ordenacao?: "relevancia" | "preco_asc" | "preco_desc" | "avaliacao" | "distancia" | "recente"
}

export interface SearchParams extends SearchFilters {
  query: string
  page?: number
  limit?: number
  latitude?: number
  longitude?: number
}

export interface SearchResponse {
  resultados: SearchResult[]
  total: number
  page: number
  limit: number
  totalPages: number
  filtros: {
    tipos: Array<{ tipo: string; count: number }>
    categorias: Array<{ categoria: string; count: number }>
    localizacoes: Array<{ localizacao: string; count: number }>
    faixaPreco: { min: number; max: number }
  }
  sugestoes?: string[]
}

class SearchService {
  private readonly baseEndpoint = "/search"

  async search(params: SearchParams): Promise<ApiResponse<SearchResponse>> {
    return apiClient.get<ApiResponse<SearchResponse>>(this.baseEndpoint, params)
  }

  async getPopularSearches(): Promise<ApiResponse<string[]>> {
    return apiClient.get<ApiResponse<string[]>>(`${this.baseEndpoint}/popular`)
  }

  async getRecentSearches(): Promise<ApiResponse<string[]>> {
    return apiClient.get<ApiResponse<string[]>>(`${this.baseEndpoint}/recent`)
  }

  async saveSearch(query: string): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>(`${this.baseEndpoint}/save`, { query })
  }

  async clearSearchHistory(): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`${this.baseEndpoint}/history`)
  }

  async getSuggestions(query: string): Promise<ApiResponse<string[]>> {
    return apiClient.get<ApiResponse<string[]>>(`${this.baseEndpoint}/suggestions`, { query })
  }

  async getFilterOptions(): Promise<
    ApiResponse<{
      tipos: string[]
      categorias: Record<string, string[]>
      localizacoes: string[]
      faixaPreco: { min: number; max: number }
    }>
  > {
    return apiClient.get<ApiResponse<any>>(`${this.baseEndpoint}/filters`)
  }

  async searchNearby(params: {
    latitude: number
    longitude: number
    raio: number
    tipo?: string
    categoria?: string
    limit?: number
  }): Promise<ApiResponse<SearchResult[]>> {
    return apiClient.get<ApiResponse<SearchResult[]>>(`${this.baseEndpoint}/nearby`, params)
  }

  async reportResult(resultId: string, motivo: string): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>(`${this.baseEndpoint}/report`, {
      resultId,
      motivo,
    })
  }
}

export const searchService = new SearchService()
