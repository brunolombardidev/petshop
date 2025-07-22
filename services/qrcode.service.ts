import { apiClient } from "@/lib/api-client"
import type { ApiResponse, QRCodeData, PaginatedResponse } from "@/types/api"

export interface CreateQRCodeRequest {
  petId: string
  customData?: Record<string, any>
}

export interface QRCodeScanResult {
  pet: {
    id: string
    name: string
    species: string
    breed?: string
    age?: number
    avatar?: string
    owner: {
      id: string
      name: string
      phone?: string
      email: string
    }
  }
  emergencyContacts?: Array<{
    name: string
    phone: string
    relationship: string
  }>
  medicalInfo?: {
    allergies?: string[]
    medications?: string[]
    conditions?: string[]
    veterinarian?: {
      name: string
      phone: string
      clinic: string
    }
  }
  lastScanned: string
}

export interface QRCodeStats {
  totalCodes: number
  activeCodes: number
  totalScans: number
  scansThisMonth: number
  mostScannedPet: {
    petName: string
    scanCount: number
  }
}

export class QRCodeService {
  // Obter QR codes do usuário atual
  static async getMyQRCodes(): Promise<QRCodeData[]> {
    const response = await apiClient.get<ApiResponse<QRCodeData[]>>("/qrcodes/me")
    return response.data
  }

  // Obter QR code por pet ID
  static async getQRCodeByPetId(petId: string): Promise<QRCodeData> {
    const response = await apiClient.get<ApiResponse<QRCodeData>>(`/qrcodes/pet/${petId}`)
    return response.data
  }

  // Criar QR code para pet
  static async createQRCode(data: CreateQRCodeRequest): Promise<QRCodeData> {
    const response = await apiClient.post<ApiResponse<QRCodeData>>("/qrcodes", data)
    return response.data
  }

  // Escanear QR code
  static async scanQRCode(code: string): Promise<QRCodeScanResult> {
    const response = await apiClient.post<ApiResponse<QRCodeScanResult>>("/qrcodes/scan", { code })
    return response.data
  }

  // Ativar/Desativar QR code
  static async toggleQRCodeStatus(id: string): Promise<QRCodeData> {
    const response = await apiClient.patch<ApiResponse<QRCodeData>>(`/qrcodes/${id}/toggle`)
    return response.data
  }

  // Regenerar código QR
  static async regenerateQRCode(id: string): Promise<QRCodeData> {
    const response = await apiClient.patch<ApiResponse<QRCodeData>>(`/qrcodes/${id}/regenerate`)
    return response.data
  }

  // Obter histórico de escaneamentos
  static async getScanHistory(
    qrCodeId: string,
    params?: {
      page?: number
      limit?: number
    },
  ): Promise<
    PaginatedResponse<{
      id: string
      scannedAt: string
      location?: {
        latitude: number
        longitude: number
        address?: string
      }
      scannerInfo?: {
        userAgent: string
        ip: string
      }
    }>
  > {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<any>>>(`/qrcodes/${qrCodeId}/scans`, params)
    return response.data
  }

  // Download do QR code como imagem
  static async downloadQRCodeImage(id: string, format: "png" | "svg" = "png"): Promise<Blob> {
    return apiClient.download(`/qrcodes/${id}/download?format=${format}`)
  }

  // Obter todos os QR codes (admin)
  static async getAllQRCodes(params?: {
    page?: number
    limit?: number
    isActive?: boolean
    userId?: string
  }): Promise<PaginatedResponse<QRCodeData>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<QRCodeData>>>("/qrcodes", params)
    return response.data
  }

  // Obter estatísticas de QR codes (admin)
  static async getQRCodeStats(): Promise<QRCodeStats> {
    const response = await apiClient.get<ApiResponse<QRCodeStats>>("/qrcodes/stats")
    return response.data
  }

  // Excluir QR code
  static async deleteQRCode(id: string): Promise<void> {
    await apiClient.delete(`/qrcodes/${id}`)
  }

  // Atualizar dados customizados do QR code
  static async updateQRCodeData(id: string, customData: Record<string, any>): Promise<QRCodeData> {
    const response = await apiClient.put<ApiResponse<QRCodeData>>(`/qrcodes/${id}/data`, { customData })
    return response.data
  }

  // Reportar QR code perdido/encontrado
  static async reportLostPet(qrCodeId: string, message?: string): Promise<void> {
    await apiClient.post(`/qrcodes/${qrCodeId}/report-lost`, { message })
  }

  static async reportFoundPet(
    qrCodeId: string,
    finderContact: {
      name: string
      phone: string
      email?: string
      location?: string
      message?: string
    },
  ): Promise<void> {
    await apiClient.post(`/qrcodes/${qrCodeId}/report-found`, finderContact)
  }
}
