interface ApiClientConfig {
  baseURL: string
  timeout?: number
}

interface RequestConfig {
  headers?: Record<string, string>
  params?: Record<string, any>
}

class ApiClient {
  private baseURL: string
  private timeout: number

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL
    this.timeout = config.timeout || 30000
  }

  private async request<T>(method: string, url: string, data?: any, config?: RequestConfig): Promise<T> {
    const fullUrl = `${this.baseURL}${url}`
    const token = localStorage.getItem("auth_token")

    // Preparar headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...config?.headers,
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    // Preparar URL com parâmetros
    const urlWithParams = new URL(fullUrl)
    if (config?.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          urlWithParams.searchParams.append(key, String(value))
        }
      })
    }

    // Configurar AbortController para timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(urlWithParams.toString(), {
        method,
        headers,
        body: data ? (data instanceof FormData ? data : JSON.stringify(data)) : undefined,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Verificar se a resposta é ok
      if (!response.ok) {
        // Tentar extrair mensagem de erro
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          // Ignorar erro de parsing
        }

        // Se for 401, tentar refresh token
        if (response.status === 401 && token) {
          try {
            await this.refreshToken()
            // Tentar novamente com o novo token
            return this.request(method, url, data, config)
          } catch {
            // Se refresh falhar, redirecionar para login
            this.handleAuthError()
            throw new Error("Sessão expirada. Faça login novamente.")
          }
        }

        throw new Error(errorMessage)
      }

      // Verificar se há conteúdo para parsear
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        return response.json()
      }

      // Para respostas sem conteúdo JSON
      return response as unknown as T
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error("Tempo limite da requisição excedido")
        }
        throw error
      }

      throw new Error("Erro desconhecido na requisição")
    }
  }

  private async refreshToken(): Promise<void> {
    const refreshToken = localStorage.getItem("refresh_token")
    if (!refreshToken) {
      throw new Error("No refresh token available")
    }

    const response = await fetch(`${this.baseURL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      throw new Error("Failed to refresh token")
    }

    const data = await response.json()
    localStorage.setItem("auth_token", data.data.token)
    localStorage.setItem("refresh_token", data.data.refreshToken)
  }

  private handleAuthError(): void {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user")

    // Redirecionar para login se não estiver na página de login
    if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
      window.location.href = "/login"
    }
  }

  // Métodos HTTP
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>("GET", url, undefined, { params })
  }

  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>("POST", url, data, config)
  }

  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>("PUT", url, data, config)
  }

  async patch<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>("PATCH", url, data, config)
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("DELETE", url, undefined, config)
  }

  // Método para upload de arquivos
  async upload<T>(url: string, file: File, additionalData?: Record<string, any>): Promise<T> {
    const formData = new FormData()
    formData.append("file", file)

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value))
      })
    }

    return this.request<T>("POST", url, formData, {
      headers: {
        // Não definir Content-Type para FormData, o browser define automaticamente
      },
    })
  }

  // Método para download de arquivos
  async download(url: string, params?: Record<string, any>): Promise<Blob> {
    const fullUrl = `${this.baseURL}${url}`
    const token = localStorage.getItem("auth_token")

    const urlWithParams = new URL(fullUrl)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          urlWithParams.searchParams.append(key, String(value))
        }
      })
    }

    const response = await fetch(urlWithParams.toString(), {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })

    if (!response.ok) {
      throw new Error(`Download failed: ${response.statusText}`)
    }

    return response.blob()
  }
}

// Instância global do cliente API
export const apiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  timeout: 30000,
})
