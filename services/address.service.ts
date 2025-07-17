import { apiClient } from "@/lib/api-client"

export interface Address {
  id: string
  userId: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  isMain: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateAddressData {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  isMain?: boolean
}

export interface ViaCepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

class AddressService {
  async getAddresses(): Promise<Address[]> {
    const response = await apiClient.get("/addresses")
    return response.data
  }

  async getAddressById(id: string): Promise<Address> {
    const response = await apiClient.get(`/addresses/${id}`)
    return response.data
  }

  async createAddress(data: CreateAddressData): Promise<Address> {
    const response = await apiClient.post("/addresses", data)
    return response.data
  }

  async updateAddress(id: string, data: Partial<CreateAddressData>): Promise<Address> {
    const response = await apiClient.put(`/addresses/${id}`, data)
    return response.data
  }

  async deleteAddress(id: string): Promise<void> {
    await apiClient.delete(`/addresses/${id}`)
  }

  async setMainAddress(id: string): Promise<Address> {
    const response = await apiClient.patch(`/addresses/${id}/set-main`)
    return response.data
  }

  async searchByCep(cep: string): Promise<ViaCepResponse> {
    const cleanCep = cep.replace(/\D/g, "")
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)

    if (!response.ok) {
      throw new Error("CEP não encontrado")
    }

    const data = await response.json()

    if (data.erro) {
      throw new Error("CEP inválido")
    }

    return data
  }
}

export const addressService = new AddressService()
