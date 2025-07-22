import { apiClient } from "@/lib/api-client"
import type { ApiResponse, FinancialRecord, PaginatedResponse } from "@/types/api"

export interface CreateFinancialRecordRequest {
  type: "income" | "expense"
  category: string
  description: string
  amount: number
  date: string
  paymentMethod?: string
  tags?: string[]
  attachments?: string[]
}

export interface UpdateFinancialRecordRequest extends Partial<CreateFinancialRecordRequest> {}

export interface FinancialSummary {
  totalIncome: number
  totalExpenses: number
  netProfit: number
  profitMargin: number
  period: {
    startDate: string
    endDate: string
  }
}

export interface FinancialStats {
  summary: FinancialSummary
  incomeByCategory: Array<{
    category: string
    amount: number
    percentage: number
  }>
  expensesByCategory: Array<{
    category: string
    amount: number
    percentage: number
  }>
  monthlyTrend: Array<{
    month: string
    income: number
    expenses: number
    profit: number
  }>
  topExpenseCategories: Array<{
    category: string
    amount: number
    count: number
  }>
}

export interface BudgetPlan {
  id: string
  name: string
  category: string
  budgetAmount: number
  spentAmount: number
  remainingAmount: number
  period: "monthly" | "quarterly" | "yearly"
  startDate: string
  endDate: string
  status: "active" | "exceeded" | "completed"
  createdAt: string
  updatedAt: string
}

export class FinanceService {
  // Obter registros financeiros
  static async getFinancialRecords(params?: {
    page?: number
    limit?: number
    type?: "income" | "expense"
    category?: string
    startDate?: string
    endDate?: string
    paymentMethod?: string
    search?: string
  }): Promise<PaginatedResponse<FinancialRecord>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<FinancialRecord>>>("/finance/records", params)
    return response.data
  }

  // Obter registro financeiro por ID
  static async getFinancialRecordById(id: string): Promise<FinancialRecord> {
    const response = await apiClient.get<ApiResponse<FinancialRecord>>(`/finance/records/${id}`)
    return response.data
  }

  // Criar registro financeiro
  static async createFinancialRecord(data: CreateFinancialRecordRequest): Promise<FinancialRecord> {
    const response = await apiClient.post<ApiResponse<FinancialRecord>>("/finance/records", data)
    return response.data
  }

  // Atualizar registro financeiro
  static async updateFinancialRecord(id: string, data: UpdateFinancialRecordRequest): Promise<FinancialRecord> {
    const response = await apiClient.put<ApiResponse<FinancialRecord>>(`/finance/records/${id}`, data)
    return response.data
  }

  // Excluir registro financeiro
  static async deleteFinancialRecord(id: string): Promise<void> {
    await apiClient.delete(`/finance/records/${id}`)
  }

  // Obter resumo financeiro
  static async getFinancialSummary(params?: {
    startDate?: string
    endDate?: string
    category?: string
  }): Promise<FinancialSummary> {
    const response = await apiClient.get<ApiResponse<FinancialSummary>>("/finance/summary", params)
    return response.data
  }

  // Obter estatísticas financeiras
  static async getFinancialStats(params?: {
    startDate?: string
    endDate?: string
    period?: "monthly" | "quarterly" | "yearly"
  }): Promise<FinancialStats> {
    const response = await apiClient.get<ApiResponse<FinancialStats>>("/finance/stats", params)
    return response.data
  }

  // Obter categorias de receita
  static async getIncomeCategories(): Promise<string[]> {
    const response = await apiClient.get<ApiResponse<string[]>>("/finance/categories/income")
    return response.data
  }

  // Obter categorias de despesa
  static async getExpenseCategories(): Promise<string[]> {
    const response = await apiClient.get<ApiResponse<string[]>>("/finance/categories/expenses")
    return response.data
  }

  // Criar categoria personalizada
  static async createCategory(name: string, type: "income" | "expense"): Promise<void> {
    await apiClient.post("/finance/categories", { name, type })
  }

  // Obter métodos de pagamento
  static async getPaymentMethods(): Promise<string[]> {
    const response = await apiClient.get<ApiResponse<string[]>>("/finance/payment-methods")
    return response.data
  }

  // Upload de comprovante
  static async uploadReceipt(recordId: string, file: File): Promise<{ url: string }> {
    const formData = new FormData()
    formData.append("receipt", file)

    const response = await apiClient.upload<ApiResponse<{ url: string }>>(
      `/finance/records/${recordId}/receipt`,
      formData,
    )
    return response.data
  }

  // Exportar relatório financeiro
  static async exportFinancialReport(params: {
    format: "pdf" | "xlsx" | "csv"
    startDate: string
    endDate: string
    type?: "income" | "expense" | "both"
    categories?: string[]
  }): Promise<Blob> {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, v))
      } else if (value) {
        queryParams.append(key, String(value))
      }
    })

    return apiClient.download(`/finance/export?${queryParams.toString()}`)
  }

  // Obter planos de orçamento
  static async getBudgetPlans(): Promise<BudgetPlan[]> {
    const response = await apiClient.get<ApiResponse<BudgetPlan[]>>("/finance/budgets")
    return response.data
  }

  // Criar plano de orçamento
  static async createBudgetPlan(data: {
    name: string
    category: string
    budgetAmount: number
    period: "monthly" | "quarterly" | "yearly"
    startDate: string
  }): Promise<BudgetPlan> {
    const response = await apiClient.post<ApiResponse<BudgetPlan>>("/finance/budgets", data)
    return response.data
  }

  // Atualizar plano de orçamento
  static async updateBudgetPlan(id: string, data: Partial<BudgetPlan>): Promise<BudgetPlan> {
    const response = await apiClient.put<ApiResponse<BudgetPlan>>(`/finance/budgets/${id}`, data)
    return response.data
  }

  // Excluir plano de orçamento
  static async deleteBudgetPlan(id: string): Promise<void> {
    await apiClient.delete(`/finance/budgets/${id}`)
  }

  // Obter análise de fluxo de caixa
  static async getCashFlowAnalysis(params?: {
    startDate?: string
    endDate?: string
    period?: "daily" | "weekly" | "monthly"
  }): Promise<
    Array<{
      date: string
      income: number
      expenses: number
      balance: number
      cumulativeBalance: number
    }>
  > {
    const response = await apiClient.get<ApiResponse<any[]>>("/finance/cash-flow", params)
    return response.data
  }

  // Obter previsão financeira
  static async getFinancialForecast(months = 6): Promise<
    Array<{
      month: string
      predictedIncome: number
      predictedExpenses: number
      predictedProfit: number
      confidence: number
    }>
  > {
    const response = await apiClient.get<ApiResponse<any[]>>(`/finance/forecast?months=${months}`)
    return response.data
  }
}
