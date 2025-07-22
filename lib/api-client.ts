import type { ApiResponse } from "@/types/api"

interface RequestConfig {
  headers?: Record<string, string>
  params?: Record<string, any>
}

export class ApiClient {
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api"

  private static async request<T>(
    endpoint: string,
    options: RequestInit = {},
    config: RequestConfig = {},
  ): Promise<ApiResponse<T>> {
    const url = new URL(endpoint, this.BASE_URL)

    // Adicionar parâmetros de query se fornecidos
    if (config.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...config.headers,
    }

    try {
      const response = await fetch(url.toString(), {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  static async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" }, config)
  }

  static async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: "POST",
        body: data ? JSON.stringify(data) : undefined,
      },
      config,
    )
  }

  static async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: "PUT",
        body: data ? JSON.stringify(data) : undefined,
      },
      config,
    )
  }

  static async patch<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: "PATCH",
        body: data ? JSON.stringify(data) : undefined,
      },
      config,
    )
  }

  static async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" }, config)
  }
}
