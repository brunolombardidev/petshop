import { apiClient } from "@/lib/api-client"
import type { ApiResponse } from "@/types/api"

export interface Product {
  id: string
  nome: string
  descricao: string
  preco: number
  categoria: string
  imagem?: string
  ativo: boolean
  fornecedorId: string
  createdAt: string
  updatedAt: string
}

export interface CreateProductData {
  nome: string
  descricao: string
  preco: number
  categoria: string
  imagem?: string
}

export interface ContractedService {
  id: string
  servicoId: string
  clienteId: string
  status: "ativo" | "concluido" | "cancelado"
  dataContratacao: string
  dataVencimento?: string
  valor: number
  servico: {
    nome: string
    descricao: string
    categoria: string
  }
  cliente: {
    nome: string
    email: string
  }
}

export const productService = {
  async getProducts(params?: {
    page?: number
    limit?: number
    search?: string
    categoria?: string
  }): Promise<ApiResponse<Product[]>> {
    const searchParams = new URLSearchParams()

    if (params?.page) searchParams.append("page", params.page.toString())
    if (params?.limit) searchParams.append("limit", params.limit.toString())
    if (params?.search) searchParams.append("search", params.search)
    if (params?.categoria) searchParams.append("categoria", params.categoria)

    return apiClient.get(`/servicos?${searchParams.toString()}`)
  },

  async createProduct(data: CreateProductData): Promise<ApiResponse<Product>> {
    return apiClient.post("/servicos", data)
  },

  async updateProduct(id: string, data: Partial<CreateProductData>): Promise<ApiResponse<Product>> {
    return apiClient.put(`/servicos/${id}`, data)
  },

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/servicos/${id}`)
  },

  async getContractedServices(params?: {
    page?: number
    limit?: number
    status?: string
  }): Promise<ApiResponse<ContractedService[]>> {
    const searchParams = new URLSearchParams()

    if (params?.page) searchParams.append("page", params.page.toString())
    if (params?.limit) searchParams.append("limit", params.limit.toString())
    if (params?.status) searchParams.append("status", params.status)

    return apiClient.get(`/servico-contratado?${searchParams.toString()}`)
  },
}
