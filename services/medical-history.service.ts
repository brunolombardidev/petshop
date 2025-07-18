import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"

export interface MedicalRecord {
  id: string
  petId: string
  petName: string
  tipo: "consulta" | "exame" | "cirurgia" | "emergencia" | "checkup" | "outro"
  data: string
  veterinario: string
  clinica: string
  diagnostico?: string
  tratamento?: string
  medicamentos?: string
  observacoes?: string
  custo?: number
  anexos?: string[]
  proximaConsulta?: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface CreateMedicalRecordRequest {
  petId: string
  tipo: "consulta" | "exame" | "cirurgia" | "emergencia" | "checkup" | "outro"
  data: string
  veterinario: string
  clinica: string
  diagnostico?: string
  tratamento?: string
  medicamentos?: string
  observacoes?: string
  custo?: number
  proximaConsulta?: string
  anexos?: File[]
}

class MedicalHistoryService {
  private readonly baseEndpoint = "/historico-medico"

  async getMedicalRecords(params?: {
    page?: number
    limit?: number
    petId?: string
    tipo?: string
    dateFrom?: string
    dateTo?: string
  }): Promise<PaginatedResponse<MedicalRecord>> {
    return apiClient.get<PaginatedResponse<MedicalRecord>>(this.baseEndpoint, params)
  }

  async getMedicalRecordById(id: string): Promise<ApiResponse<MedicalRecord>> {
    return apiClient.get<ApiResponse<MedicalRecord>>(`${this.baseEndpoint}/${id}`)
  }

  async createMedicalRecord(data: CreateMedicalRecordRequest): Promise<ApiResponse<MedicalRecord>> {
    if (data.anexos && data.anexos.length > 0) {
      const formData = new FormData()
      formData.append("petId", data.petId)
      formData.append("tipo", data.tipo)
      formData.append("data", data.data)
      formData.append("veterinario", data.veterinario)
      formData.append("clinica", data.clinica)
      if (data.diagnostico) formData.append("diagnostico", data.diagnostico)
      if (data.tratamento) formData.append("tratamento", data.tratamento)
      if (data.medicamentos) formData.append("medicamentos", data.medicamentos)
      if (data.observacoes) formData.append("observacoes", data.observacoes)
      if (data.custo) formData.append("custo", data.custo.toString())
      if (data.proximaConsulta) formData.append("proximaConsulta", data.proximaConsulta)

      data.anexos.forEach((file, index) => {
        formData.append(`anexos[${index}]`, file)
      })

      const response = await fetch(`${apiClient["baseURL"]}${this.baseEndpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: formData,
      })

      return response.json()
    }

    return apiClient.post<ApiResponse<MedicalRecord>>(this.baseEndpoint, data)
  }

  async updateMedicalRecord(
    id: string,
    data: Partial<CreateMedicalRecordRequest>,
  ): Promise<ApiResponse<MedicalRecord>> {
    return apiClient.patch<ApiResponse<MedicalRecord>>(`${this.baseEndpoint}/${id}`, data)
  }

  async deleteMedicalRecord(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`${this.baseEndpoint}/${id}`)
  }

  async getMedicalStats(petId?: string): Promise<
    ApiResponse<{
      totalRecords: number
      recordsByType: Record<string, number>
      totalCost: number
      lastVisit: string
      upcomingAppointments: number
    }>
  > {
    return apiClient.get<ApiResponse<any>>(`${this.baseEndpoint}/stats`, { petId })
  }
}

export const medicalHistoryService = new MedicalHistoryService()
