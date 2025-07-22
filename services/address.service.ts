import { apiClient } from "@/lib/api-client"
import type { ApiResponse, Address, PaginatedResponse } from "@/types/api"

export interface CreateAddressRequest {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country?: string
  isDefault?: boolean
}

export interface UpdateAddressRequest extends Partial<CreateAddressRequest> {}

export interface AddressSearchRequest {
  zipCode: string
}

export interface AddressSearchResponse {
  street: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
}

export class AddressService {
  // Obter endereços do usuário atual
  static async getMyAddresses(): Promise<Address[]> {
    const response = await apiClient.get<ApiResponse<Address[]>>("/addresses/me")
    return response.data
  }

  // Obter endereço por ID
  static async getAddressById(id: string): Promise<Address> {
    const response = await apiClient.get<ApiResponse<Address>>(`/addresses/${id}`)
    return response.data
  }

  // Criar novo endereço
  static async createAddress(data: CreateAddressRequest): Promise<Address> {
    const response = await apiClient.post<ApiResponse<Address>>("/addresses", data)
    return response.data
  }

  // Atualizar endereço
  static async updateAddress(id: string, data: UpdateAddressRequest): Promise<Address> {
    const response = await apiClient.put<ApiResponse<Address>>(`/addresses/${id}`, data)
    return response.data
  }

  // Excluir endereço
  static async deleteAddress(id: string): Promise<void> {
    await apiClient.delete(`/addresses/${id}`)
  }

  // Definir endereço como padrão
  static async setDefaultAddress(id: string): Promise<Address> {
    const response = await apiClient.patch<ApiResponse<Address>>(`/addresses/${id}/set-default`)
    return response.data
  }

  // Buscar endereço por CEP
  static async searchByZipCode(zipCode: string): Promise<AddressSearchResponse> {
    const response = await apiClient.get<ApiResponse<AddressSearchResponse>>(`/addresses/search/${zipCode}`)
    return response.data
  }

  // Obter todos os endereços (admin)
  static async getAllAddresses(params?: {
    page?: number
    limit?: number
    userId?: string
    city?: string
    state?: string
  }): Promise<PaginatedResponse<Address>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Address>>>("/addresses", params)
    return response.data
  }

  // Validar CEP
  static async validateZipCode(zipCode: string): Promise<{ valid: boolean; formatted?: string }> {
    const response = await apiClient.post<ApiResponse<{ valid: boolean; formatted?: string }>>(
      "/addresses/validate-zipcode",
      { zipCode },
    )
    return response.data
  }

  // Calcular distância entre endereços
  static async calculateDistance(
    fromAddressId: string,
    toAddressId: string,
  ): Promise<{ distance: number; unit: string }> {
    const response = await apiClient.post<ApiResponse<{ distance: number; unit: string }>>(
      "/addresses/calculate-distance",
      {
        fromAddressId,
        toAddressId,
      },
    )
    return response.data
  }
}
