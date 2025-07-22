import { ApiClient } from "@/lib/api-client"
import type { User, LoginRequest, LoginResponse, RegisterRequest } from "@/types/api"

interface TokenData {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
}

interface ResetPasswordRequest {
  token: string
  password: string
  confirmPassword: string
}

interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export class AuthService {
  private static readonly ACCESS_TOKEN_KEY = "bpet_access_token"
  private static readonly REFRESH_TOKEN_KEY = "bpet_refresh_token"
  private static readonly USER_KEY = "bpet_user"

  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await ApiClient.post<LoginResponse>("/auth/login", credentials)

      if (response.success && response.data) {
        // Armazenar tokens
        this.setTokens(response.data.access_token, response.data.refresh_token)

        // Armazenar dados do usuário
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.data.user))

        return response.data
      }

      throw new Error(response.message || "Erro no login")
    } catch (error) {
      console.error("Erro no login:", error)
      throw error
    }
  }

  static async register(userData: RegisterRequest): Promise<void> {
    try {
      const response = await ApiClient.post("/auth/register", userData)

      if (!response.success) {
        throw new Error(response.message || "Erro no cadastro")
      }
    } catch (error) {
      console.error("Erro no cadastro:", error)
      throw error
    }
  }

  static async logout(): Promise<void> {
    try {
      const token = this.getAccessToken()
      if (token) {
        await ApiClient.post(
          "/auth/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
      }
    } catch (error) {
      console.error("Erro no logout:", error)
    } finally {
      this.clearTokens()
      localStorage.removeItem(this.USER_KEY)
    }
  }

  static async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = this.getRefreshToken()
      if (!refreshToken) {
        throw new Error("Refresh token não encontrado")
      }

      const response = await ApiClient.post<TokenData>("/auth/refresh", {
        refresh_token: refreshToken,
      })

      if (response.success && response.data) {
        this.setTokens(response.data.access_token, response.data.refresh_token)
        return response.data.access_token
      }

      throw new Error("Erro ao renovar token")
    } catch (error) {
      console.error("Erro ao renovar token:", error)
      this.clearTokens()
      return null
    }
  }

  static async getCurrentUser(): Promise<User> {
    try {
      const token = await this.ensureValidToken()
      if (!token) {
        throw new Error("Token não encontrado")
      }

      const response = await ApiClient.get<User>("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.success && response.data) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.data))
        return response.data
      }

      throw new Error("Erro ao buscar dados do usuário")
    } catch (error) {
      console.error("Erro ao buscar usuário:", error)
      throw error
    }
  }

  static async forgotPassword(email: string): Promise<void> {
    try {
      const response = await ApiClient.post("/auth/forgot-password", { email })

      if (!response.success) {
        throw new Error(response.message || "Erro ao enviar e-mail")
      }
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error)
      throw error
    }
  }

  static async resetPassword(data: ResetPasswordRequest): Promise<void> {
    try {
      const response = await ApiClient.post("/auth/reset-password", data)

      if (!response.success) {
        throw new Error(response.message || "Erro ao redefinir senha")
      }
    } catch (error) {
      console.error("Erro ao redefinir senha:", error)
      throw error
    }
  }

  static async changePassword(data: ChangePasswordRequest): Promise<void> {
    try {
      const token = await this.ensureValidToken()
      if (!token) {
        throw new Error("Token não encontrado")
      }

      const response = await ApiClient.post("/auth/change-password", data, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.success) {
        throw new Error(response.message || "Erro ao alterar senha")
      }
    } catch (error) {
      console.error("Erro ao alterar senha:", error)
      throw error
    }
  }

  static async ensureValidToken(): Promise<string | null> {
    const token = this.getAccessToken()

    if (!token) {
      return null
    }

    // Verificar se o token está próximo do vencimento
    if (this.isTokenExpiringSoon(token)) {
      return await this.refreshToken()
    }

    return token
  }

  static getAccessToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(this.ACCESS_TOKEN_KEY)
  }

  static getRefreshToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(this.REFRESH_TOKEN_KEY)
  }

  static getCachedUser(): User | null {
    if (typeof window === "undefined") return null
    const userData = localStorage.getItem(this.USER_KEY)
    return userData ? JSON.parse(userData) : null
  }

  static isAuthenticated(): boolean {
    return !!this.getAccessToken()
  }

  private static setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken)
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken)
  }

  private static clearTokens(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.ACCESS_TOKEN_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
  }

  private static isTokenExpiringSoon(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      const exp = payload.exp * 1000 // Converter para milliseconds
      const now = Date.now()
      const timeUntilExpiry = exp - now

      // Renovar se expira em menos de 5 minutos
      return timeUntilExpiry < 5 * 60 * 1000
    } catch (error) {
      console.error("Erro ao verificar expiração do token:", error)
      return true // Se não conseguir verificar, assume que precisa renovar
    }
  }
}
