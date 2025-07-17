import { apiClient } from "@/lib/api-client"
import type { LoginRequest, LoginResponse, RegisterRequest, ApiResponse, User } from "@/types/api"

export class AuthService {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>("/auth/login", credentials)
    return response.data
  }

  static async register(userData: RegisterRequest): Promise<User> {
    const response = await apiClient.post<ApiResponse<User>>("/auth/register", userData)
    return response.data
  }

  static async logout(): Promise<void> {
    await apiClient.post("/auth/logout")
  }

  static async refreshToken(): Promise<LoginResponse> {
    const refreshToken = localStorage.getItem("refresh_token")
    const response = await apiClient.post<ApiResponse<LoginResponse>>("/auth/refresh", {
      refreshToken,
    })
    return response.data
  }

  static async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>("/auth/me")
    return response.data
  }

  static async forgotPassword(email: string): Promise<void> {
    await apiClient.post("/auth/forgot-password", { email })
  }

  static async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiClient.post("/auth/reset-password", { token, password: newPassword })
  }
}
