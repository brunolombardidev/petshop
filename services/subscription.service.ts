import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"

// Tipos específicos para assinaturas
export interface Plan {
  id: string
  name: string
  description: string
  price: number
  duration: number // em dias
  features: string[]
  isActive: boolean
  isPopular?: boolean
  maxUsers?: number
  maxPets?: number
  maxServices?: number
  createdAt: string
  updatedAt: string
}

export interface Subscription {
  id: string
  userId: string
  planId: string
  status: "active" | "cancelled" | "expired" | "pending"
  startDate: string
  endDate: string
  autoRenew: boolean
  price: number
  lastPaymentDate?: string
  nextPaymentDate?: string
  createdAt: string
  updatedAt: string
  plan?: Plan
  user?: {
    id: string
    name: string
    email: string
  }
}

export interface Invoice {
  id: string
  subscriptionId: string
  userId: string
  amount: number
  status: "paid" | "pending" | "failed" | "cancelled"
  dueDate: string
  paidDate?: string
  description: string
  invoiceUrl?: string
  createdAt: string
  updatedAt: string
}

export interface UserPlan {
  id: string
  userId: string
  planId: string
  customPrice?: number
  customFeatures?: string[]
  validUntil?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  user?: {
    id: string
    name: string
    email: string
  }
  plan?: Plan
}

export interface SubscriptionStats {
  totalSubscriptions: number
  activeSubscriptions: number
  cancelledSubscriptions: number
  totalRevenue: number
  monthlyRevenue: number
  planDistribution: Array<{
    planName: string
    count: number
    percentage: number
  }>
}

export class SubscriptionService {
  // Planos
  static async getPlans(): Promise<Plan[]> {
    const response = await apiClient.get<ApiResponse<Plan[]>>("/planos")
    return response.data
  }

  static async createPlan(planData: Omit<Plan, "id" | "createdAt" | "updatedAt">): Promise<Plan> {
    const response = await apiClient.post<ApiResponse<Plan>>("/planos", planData)
    return response.data
  }

  static async updatePlan(id: string, planData: Partial<Plan>): Promise<Plan> {
    const response = await apiClient.put<ApiResponse<Plan>>(`/planos/${id}`, planData)
    return response.data
  }

  static async deletePlan(id: string): Promise<void> {
    await apiClient.delete(`/planos/${id}`)
  }

  static async togglePlanStatus(id: string): Promise<Plan> {
    const response = await apiClient.patch<ApiResponse<Plan>>(`/planos/${id}/toggle-status`)
    return response.data
  }

  // Assinaturas
  static async getMySubscription(): Promise<Subscription | null> {
    try {
      const response = await apiClient.get<ApiResponse<Subscription>>("/assinaturas/me")
      return response.data
    } catch (error) {
      return null
    }
  }

  static async getAllSubscriptions(params?: {
    page?: number
    limit?: number
    status?: string
    search?: string
  }): Promise<PaginatedResponse<Subscription>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Subscription>>>("/assinaturas", params)
    return response.data
  }

  static async createSubscription(planId: string): Promise<Subscription> {
    const response = await apiClient.post<ApiResponse<Subscription>>("/assinaturas", { planId })
    return response.data
  }

  static async changePlan(subscriptionId: string, newPlanId: string): Promise<Subscription> {
    const response = await apiClient.put<ApiResponse<Subscription>>(`/assinaturas/${subscriptionId}`, {
      planId: newPlanId,
    })
    return response.data
  }

  static async cancelSubscription(subscriptionId: string): Promise<Subscription> {
    const response = await apiClient.delete<ApiResponse<Subscription>>(`/assinaturas/${subscriptionId}`)
    return response.data
  }

  static async reactivateSubscription(subscriptionId: string): Promise<Subscription> {
    const response = await apiClient.patch<ApiResponse<Subscription>>(`/assinaturas/${subscriptionId}/reactivate`)
    return response.data
  }

  // Faturas
  static async getMyInvoices(params?: {
    page?: number
    limit?: number
    status?: string
  }): Promise<PaginatedResponse<Invoice>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Invoice>>>("/assinaturas/me/faturas", params)
    return response.data
  }

  static async getAllInvoices(params?: {
    page?: number
    limit?: number
    status?: string
    userId?: string
  }): Promise<PaginatedResponse<Invoice>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Invoice>>>("/assinaturas/faturas", params)
    return response.data
  }

  static async downloadInvoice(invoiceId: string): Promise<Blob> {
    const response = await fetch(`${apiClient["baseURL"]}/assinaturas/faturas/${invoiceId}/download`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })

    if (!response.ok) {
      throw new Error("Erro ao baixar fatura")
    }

    return response.blob()
  }

  // Planos de usuários (personalizados)
  static async getUserPlans(): Promise<UserPlan[]> {
    const response = await apiClient.get<ApiResponse<UserPlan[]>>("/planos-de-usuarios")
    return response.data
  }

  static async createUserPlan(userPlanData: {
    userId: string
    planId: string
    customPrice?: number
    customFeatures?: string[]
    validUntil?: string
  }): Promise<UserPlan> {
    const response = await apiClient.post<ApiResponse<UserPlan>>("/planos-de-usuarios", userPlanData)
    return response.data
  }

  static async deleteUserPlan(id: string): Promise<void> {
    await apiClient.delete(`/planos-de-usuarios/${id}`)
  }

  // Estatísticas (apenas para admins)
  static async getSubscriptionStats(): Promise<SubscriptionStats> {
    const response = await apiClient.get<ApiResponse<SubscriptionStats>>("/assinaturas/stats")
    return response.data
  }

  // Verificar se pode alterar plano
  static async canChangePlan(): Promise<{ canChange: boolean; reason?: string; nextChangeDate?: string }> {
    const response = await apiClient.get<ApiResponse<{ canChange: boolean; reason?: string; nextChangeDate?: string }>>(
      "/assinaturas/me/can-change-plan",
    )
    return response.data
  }
}
