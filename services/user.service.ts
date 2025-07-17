import { apiClient } from "@/lib/api-client"
import type { User, ApiResponse, PaginatedResponse } from "@/types/api"

export class UserService {
  static async getProfile(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>("/users/profile")
    return response.data
  }

  static async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>("/users/profile", userData)
    return response.data
  }

  static async uploadAvatar(file: File): Promise<User> {
    const response = await apiClient.uploadFile<ApiResponse<User>>("/users/avatar", file)
    return response.data
  }

  static async getUsers(params?: {
    page?: number
    limit?: number
    search?: string
    userType?: string
  }): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>("/users", params)
    return response.data
  }

  static async getUserById(id: string): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`)
    return response.data
  }

  static async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`)
  }

  static async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiClient.post("/users/change-password", {
      currentPassword,
      newPassword,
    })
  }
}
