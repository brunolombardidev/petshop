import { apiClient } from "@/lib/api-client"
import type { Pet, ApiResponse, PaginatedResponse, Vaccination } from "@/types/api"

export class PetService {
  static async getPets(params?: {
    page?: number
    limit?: number
    ownerId?: string
  }): Promise<PaginatedResponse<Pet>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Pet>>>("/pets", params)
    return response.data
  }

  static async getPetById(id: string): Promise<Pet> {
    const response = await apiClient.get<ApiResponse<Pet>>(`/pets/${id}`)
    return response.data
  }

  static async createPet(petData: Omit<Pet, "id" | "createdAt" | "updatedAt">): Promise<Pet> {
    const response = await apiClient.post<ApiResponse<Pet>>("/pets", petData)
    return response.data
  }

  static async updatePet(id: string, petData: Partial<Pet>): Promise<Pet> {
    const response = await apiClient.put<ApiResponse<Pet>>(`/pets/${id}`, petData)
    return response.data
  }

  static async deletePet(id: string): Promise<void> {
    await apiClient.delete(`/pets/${id}`)
  }

  static async uploadPetAvatar(petId: string, file: File): Promise<Pet> {
    const response = await apiClient.uploadFile<ApiResponse<Pet>>(`/pets/${petId}/avatar`, file)
    return response.data
  }

  static async addVaccination(petId: string, vaccination: Omit<Vaccination, "id">): Promise<Vaccination> {
    const response = await apiClient.post<ApiResponse<Vaccination>>(`/pets/${petId}/vaccinations`, vaccination)
    return response.data
  }

  static async getVaccinations(petId: string): Promise<Vaccination[]> {
    const response = await apiClient.get<ApiResponse<Vaccination[]>>(`/pets/${petId}/vaccinations`)
    return response.data
  }

  static async updateVaccination(
    petId: string,
    vaccinationId: string,
    data: Partial<Vaccination>,
  ): Promise<Vaccination> {
    const response = await apiClient.put<ApiResponse<Vaccination>>(`/pets/${petId}/vaccinations/${vaccinationId}`, data)
    return response.data
  }

  static async deleteVaccination(petId: string, vaccinationId: string): Promise<void> {
    await apiClient.delete(`/pets/${petId}/vaccinations/${vaccinationId}`)
  }
}
