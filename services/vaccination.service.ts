import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"

export interface Vaccination {
  id: string
  petId: string
  petName: string
  vacina: string
  fabricante?: string
  lote?: string
  dataAplicacao: string
  proximaDose?: string
  veterinario: string
  clinica: string
  observacoes?: string
  reacaoAdversa?: boolean
  descricaoReacao?: string
  custo?: number
  certificado?: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface CreateVaccinationRequest {
  petId: string
  vacina: string
  fabricante?: string
  lote?: string
  dataAplicacao: string
  proximaDose?: string
  veterinario: string
  clinica: string
  observacoes?: string
  reacaoAdversa?: boolean
  descricaoReacao?: string
  custo?: number
  certificado?: File
}

class VaccinationService {
  private readonly baseEndpoint = "/vacinas"

  async getVaccinations(params?: {
    page?: number
    limit?: number
    petId?: string
    vacina?: string
    dateFrom?: string
    dateTo?: string
  }): Promise<PaginatedResponse<Vaccination>> {
    return apiClient.get<PaginatedResponse<Vaccination>>(this.baseEndpoint, params)
  }

  async getVaccinationById(id: string): Promise<ApiResponse<Vaccination>> {
    return apiClient.get<ApiResponse<Vaccination>>(`${this.baseEndpoint}/${id}`)
  }

  async createVaccination(data: CreateVaccinationRequest): Promise<ApiResponse<Vaccination>> {
    if (data.certificado) {
      const formData = new FormData()
      formData.append("petId", data.petId)
      formData.append("vacina", data.vacina)
      if (data.fabricante) formData.append("fabricante", data.fabricante)
      if (data.lote) formData.append("lote", data.lote)
      formData.append("dataAplicacao", data.dataAplicacao)
      if (data.proximaDose) formData.append("proximaDose", data.proximaDose)
      formData.append("veterinario", data.veterinario)
      formData.append("clinica", data.clinica)
      if (data.observacoes) formData.append("observacoes", data.observacoes)
      if (data.reacaoAdversa) formData.append("reacaoAdversa", data.reacaoAdversa.toString())
      if (data.descricaoReacao) formData.append("descricaoReacao", data.descricaoReacao)
      if (data.custo) formData.append("custo", data.custo.toString())
      formData.append("certificado", data.certificado)

      const response = await fetch(`${apiClient["baseURL"]}${this.baseEndpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: formData,
      })

      return response.json()
    }

    return apiClient.post<ApiResponse<Vaccination>>(this.baseEndpoint, data)
  }

  async updateVaccination(id: string, data: Partial<CreateVaccinationRequest>): Promise<ApiResponse<Vaccination>> {
    return apiClient.patch<ApiResponse<Vaccination>>(`${this.baseEndpoint}/${id}`, data)
  }

  async deleteVaccination(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`${this.baseEndpoint}/${id}`)
  }

  async getVaccinationSchedule(petId: string): Promise<ApiResponse<Vaccination[]>> {
    return apiClient.get<ApiResponse<Vaccination[]>>(`${this.baseEndpoint}/schedule/${petId}`)
  }

  async getVaccinationStats(petId?: string): Promise<
    ApiResponse<{
      totalVaccinations: number
      upToDate: boolean
      overdue: number
      upcoming: number
      byVaccine: Record<string, number>
    }>
  > {
    return apiClient.get<ApiResponse<any>>(`${this.baseEndpoint}/stats`, { petId })
  }
}

export const vaccinationService = new VaccinationService()
