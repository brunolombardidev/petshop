import { apiClient } from "@/lib/api-client"
import type { ApiResponse } from "@/types/api"

// Tipos específicos para autenticação
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  userType: "cliente" | "petshop" | "fornecedor" | "empresa" | "administrador" | "parceiro"
  user_type?: "cliente" | "petshop" | "fornecedor" | "empresa" | "administrador" | "parceiro" // Compatibilidade
  status: "active" | "inactive" | "pending" | "suspended"
  emailVerified: boolean
  phoneVerified: boolean
  profile?: {
    document?: string
    birthDate?: string
    address?: {
      street: string
      number: string
      complement?: string
      neighborhood: string
      city: string
      state: string
      zipCode: string
    }
    preferences?: {
      notifications: {
        email: boolean
        sms: boolean
        push: boolean
      }
      language: string
      timezone: string
    }
  }
  subscription?: {
    planId: string
    status: string
    expiresAt: string
  }
  createdAt: string
  updatedAt: string
}

export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  user: User
  token: string
  refreshToken: string
  expiresIn: number
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  phone?: string
  userType: User["userType"]
  document?: string
  acceptTerms: boolean
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
  confirmPassword: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface UpdateProfileRequest {
  name?: string
  phone?: string
  avatar?: string
  profile?: Partial<User["profile"]>
}

export class AuthService {
  // Autenticação
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>("/auth/login", credentials)

    // Salvar tokens no localStorage
    if (response.data.token) {
      localStorage.setItem("auth_token", response.data.token)
      localStorage.setItem("refresh_token", response.data.refreshToken)
      localStorage.setItem("user", JSON.stringify(response.data.user))
    }

    return response.data
  }

  static async register(userData: RegisterRequest): Promise<LoginResponse> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>("/auth/register", userData)

    // Salvar tokens no localStorage
    if (response.data.token) {
      localStorage.setItem("auth_token", response.data.token)
      localStorage.setItem("refresh_token", response.data.refreshToken)
      localStorage.setItem("user", JSON.stringify(response.data.user))
    }

    return response.data
  }

  static async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout")
    } catch (error) {
      // Ignorar erros de logout
    } finally {
      // Limpar dados locais
      localStorage.removeItem("auth_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("user")
    }
  }

  static async refreshToken(): Promise<{ token: string; refreshToken: string; expiresIn: number }> {
    const refreshToken = localStorage.getItem("refresh_token")
    if (!refreshToken) {
      throw new Error("No refresh token available")
    }

    const response = await apiClient.post<ApiResponse<{ token: string; refreshToken: string; expiresIn: number }>>(
      "/auth/refresh",
      { refreshToken },
    )

    // Atualizar tokens
    localStorage.setItem("auth_token", response.data.token)
    localStorage.setItem("refresh_token", response.data.refreshToken)

    return response.data
  }

  // Recuperação de senha
  static async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>("/auth/forgot-password", data)
    return response.data
  }

  static async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>("/auth/reset-password", data)
    return response.data
  }

  static async changePassword(data: ChangePasswordRequest): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>("/auth/change-password", data)
    return response.data
  }

  // Perfil
  static async getProfile(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>("/auth/profile")

    // Atualizar dados do usuário no localStorage
    localStorage.setItem("user", JSON.stringify(response.data))

    return response.data
  }

  static async updateProfile(data: UpdateProfileRequest): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>("/auth/profile", data)

    // Atualizar dados do usuário no localStorage
    localStorage.setItem("user", JSON.stringify(response.data))

    return response.data
  }

  static async uploadAvatar(file: File): Promise<{ url: string }> {
    const formData = new FormData()
    formData.append("avatar", file)

    const response = await apiClient.post<ApiResponse<{ url: string }>>("/auth/upload-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  }

  // Verificação
  static async sendEmailVerification(): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>("/auth/send-email-verification")
    return response.data
  }

  static async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>("/auth/verify-email", { token })
    return response.data
  }

  static async sendPhoneVerification(): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>("/auth/send-phone-verification")
    return response.data
  }

  static async verifyPhone(code: string): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>("/auth/verify-phone", { code })
    return response.data
  }

  // Utilitários
  static getCurrentUser(): User | null {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  }

  static getToken(): string | null {
    return localStorage.getItem("auth_token")
  }

  static isAuthenticated(): boolean {
    return !!this.getToken()
  }

  static hasRole(role: User["userType"]): boolean {
    const user = this.getCurrentUser()
    return user?.userType === role || user?.user_type === role
  }
}
