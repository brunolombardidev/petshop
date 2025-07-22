import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"

export interface Pet {
  id: string
  nome: string
  especie: "cao" | "gato" | "ave" | "peixe" | "roedor" | "reptil" | "outro"
  raca?: string
  idade: number
  peso: number
  cor: string
  sexo: "macho" | "femea"
  castrado: boolean
  microchip?: string
  observacoes?: string
  foto?: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface CreatePetRequest {
  nome: string
  especie: "cao" | "gato" | "ave" | "peixe" | "roedor" | "reptil" | "outro"
  raca?: string
  idade: number
  peso: number
  cor: string
  sexo: "macho" | "femea"
  castrado: boolean
  microchip?: string
  observacoes?: string
  foto?: File
}

class PetService {
  private readonly baseEndpoint = "/pets"

  async getPets(params?: {
    page?: number
    limit?: number
    search?: string
    especie?: string
  }): Promise<PaginatedResponse<Pet>> {
    return apiClient.get<PaginatedResponse<Pet>>(this.baseEndpoint, params)
  }

  async getPetById(id: string): Promise<ApiResponse<Pet>> {
    return apiClient.get<ApiResponse<Pet>>(`${this.baseEndpoint}/${id}`)
  }

  async createPet(data: CreatePetRequest): Promise<ApiResponse<Pet>> {
    if (data.foto) {
      const formData = new FormData()
      formData.append("nome", data.nome)
      formData.append("especie", data.especie)
      if (data.raca) formData.append("raca", data.raca)
      formData.append("idade", data.idade.toString())
      formData.append("peso", data.peso.toString())
      formData.append("cor", data.cor)
      formData.append("sexo", data.sexo)
      formData.append("castrado", data.castrado.toString())
      if (data.microchip) formData.append("microchip", data.microchip)
      if (data.observacoes) formData.append("observacoes", data.observacoes)
      formData.append("foto", data.foto)

      const response = await fetch(`${apiClient["baseURL"]}${this.baseEndpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: formData,
      })

      return response.json()
    }

    return apiClient.post<ApiResponse<Pet>>(this.baseEndpoint, data)
  }

  async updatePet(id: string, data: Partial<CreatePetRequest>): Promise<ApiResponse<Pet>> {
    return apiClient.patch<ApiResponse<Pet>>(`${this.baseEndpoint}/${id}`, data)
  }

  async deletePet(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`${this.baseEndpoint}/${id}`)
  }

  async getPetStats(): Promise<
    ApiResponse<{
      totalPets: number
      petsBySpecies: Record<string, number>
      averageAge: number
      castrationRate: number
    }>
  > {
    return apiClient.get<ApiResponse<any>>(`${this.baseEndpoint}/stats`)
  }
}

export const petService = new PetService()
