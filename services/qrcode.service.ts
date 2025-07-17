import { apiClient } from "@/lib/api-client"

export interface QRCode {
  id: string
  userId: string
  petId?: string
  type: "pet" | "profile" | "contact" | "custom"
  data: string
  title: string
  description?: string
  isActive: boolean
  scanCount: number
  createdAt: string
  updatedAt: string
}

export interface QRCodeScan {
  id: string
  qrCodeId: string
  scannedAt: string
  location?: string
  device?: string
  ipAddress?: string
}

export interface CreateQRCodeData {
  petId?: string
  type: "pet" | "profile" | "contact" | "custom"
  data: string
  title: string
  description?: string
}

export interface QRCodeStats {
  totalScans: number
  uniqueScans: number
  lastScan?: string
  topLocations: Array<{ location: string; count: number }>
}

class QRCodeService {
  async getQRCodes(): Promise<QRCode[]> {
    const response = await apiClient.get("/qrcodes")
    return response.data
  }

  async getQRCodeById(id: string): Promise<QRCode> {
    const response = await apiClient.get(`/qrcodes/${id}`)
    return response.data
  }

  async createQRCode(data: CreateQRCodeData): Promise<QRCode> {
    const response = await apiClient.post("/qrcodes", data)
    return response.data
  }

  async updateQRCode(id: string, data: Partial<CreateQRCodeData>): Promise<QRCode> {
    const response = await apiClient.put(`/qrcodes/${id}`, data)
    return response.data
  }

  async deleteQRCode(id: string): Promise<void> {
    await apiClient.delete(`/qrcodes/${id}`)
  }

  async toggleQRCode(id: string): Promise<QRCode> {
    const response = await apiClient.patch(`/qrcodes/${id}/toggle`)
    return response.data
  }

  async generateQRCodeImage(id: string, format: "png" | "svg" | "pdf" = "png"): Promise<Blob> {
    const response = await apiClient.get(`/qrcodes/${id}/image`, {
      params: { format },
      responseType: "blob",
    })
    return response.data
  }

  async scanQRCode(qrCodeId: string, location?: string): Promise<QRCodeScan> {
    const response = await apiClient.post(`/qrcodes/${qrCodeId}/scan`, {
      location,
      timestamp: new Date().toISOString(),
    })
    return response.data
  }

  async getQRCodeStats(id: string): Promise<QRCodeStats> {
    const response = await apiClient.get(`/qrcodes/${id}/stats`)
    return response.data
  }

  async getQRCodeScans(id: string): Promise<QRCodeScan[]> {
    const response = await apiClient.get(`/qrcodes/${id}/scans`)
    return response.data
  }

  async downloadQRCode(id: string, format: "png" | "svg" | "pdf" = "png"): Promise<void> {
    const blob = await this.generateQRCodeImage(id, format)
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `qrcode-${id}.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}

export const qrCodeService = new QRCodeService()
