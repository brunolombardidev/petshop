export interface CreateCampaignRequest {
  titulo: string
  descricao: string
  categoria: string
  meta: number
  dataInicio: string
  dataFim: string
  imagem?: File
}

export interface Campaign {
  id: string
  titulo: string
  descricao: string
  categoria: string
  meta: number
  arrecadado: number
  dataInicio: string
  dataFim: string
  status: "ativa" | "pausada" | "finalizada"
  imagem?: string
  createdAt: string
  updatedAt: string
}

export class CampaignService {
  private static baseUrl = "/api/campaigns"

  static async createCampaign(data: CreateCampaignRequest): Promise<Campaign> {
    const formData = new FormData()

    formData.append("titulo", data.titulo)
    formData.append("descricao", data.descricao)
    formData.append("categoria", data.categoria)
    formData.append("meta", data.meta.toString())
    formData.append("dataInicio", data.dataInicio)
    formData.append("dataFim", data.dataFim)

    if (data.imagem) {
      formData.append("imagem", data.imagem)
    }

    const response = await fetch(this.baseUrl, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Erro ao criar campanha")
    }

    return response.json()
  }

  static async getCampaigns(): Promise<Campaign[]> {
    const response = await fetch(this.baseUrl)

    if (!response.ok) {
      throw new Error("Erro ao buscar campanhas")
    }

    return response.json()
  }

  static async getCampaignById(id: string): Promise<Campaign> {
    const response = await fetch(`${this.baseUrl}/${id}`)

    if (!response.ok) {
      throw new Error("Erro ao buscar campanha")
    }

    return response.json()
  }

  static async updateCampaign(id: string, data: Partial<CreateCampaignRequest>): Promise<Campaign> {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === "imagem" && value instanceof File) {
          formData.append(key, value)
        } else if (key !== "imagem") {
          formData.append(key, value.toString())
        }
      }
    })

    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Erro ao atualizar campanha")
    }

    return response.json()
  }

  static async deleteCampaign(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Erro ao deletar campanha")
    }
  }
}
