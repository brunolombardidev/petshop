import { apiClient } from "@/lib/api-client"

export interface Transaction {
  id: string
  type: "income" | "expense"
  category: string
  subcategory?: string
  amount: number
  description: string
  date: string
  paymentMethod: "cash" | "credit_card" | "debit_card" | "pix" | "transfer" | "check"
  status: "pending" | "completed" | "cancelled"
  attachments?: Array<{
    id: string
    name: string
    url: string
    type: string
  }>
  tags?: string[]
  recurring?: {
    frequency: "daily" | "weekly" | "monthly" | "yearly"
    endDate?: string
    nextDate: string
  }
  createdAt: string
  updatedAt: string
}

export interface CreateTransactionData {
  type: "income" | "expense"
  category: string
  subcategory?: string
  amount: number
  description: string
  date: string
  paymentMethod: "cash" | "credit_card" | "debit_card" | "pix" | "transfer" | "check"
  tags?: string[]
  recurring?: {
    frequency: "daily" | "weekly" | "monthly" | "yearly"
    endDate?: string
  }
}

export interface FinancialReport {
  period: {
    start: string
    end: string
  }
  summary: {
    totalIncome: number
    totalExpenses: number
    netProfit: number
    profitMargin: number
  }
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
  topExpenses: Transaction[]
  topIncomes: Transaction[]
}

export interface Category {
  id: string
  name: string
  type: "income" | "expense"
  subcategories: string[]
  color: string
  icon: string
}

class FinanceService {
  async getTransactions(params?: {
    page?: number
    limit?: number
    type?: "income" | "expense"
    category?: string
    startDate?: string
    endDate?: string
    search?: string
  }): Promise<{
    transactions: Transaction[]
    total: number
    page: number
    totalPages: number
  }> {
    const response = await apiClient.get("/finance/transactions", { params })
    return response.data
  }

  async getTransactionById(id: string): Promise<Transaction> {
    const response = await apiClient.get(`/finance/transactions/${id}`)
    return response.data
  }

  async createTransaction(data: CreateTransactionData): Promise<Transaction> {
    const response = await apiClient.post("/finance/transactions", data)
    return response.data
  }

  async updateTransaction(id: string, data: Partial<CreateTransactionData>): Promise<Transaction> {
    const response = await apiClient.put(`/finance/transactions/${id}`, data)
    return response.data
  }

  async deleteTransaction(id: string): Promise<void> {
    await apiClient.delete(`/finance/transactions/${id}`)
  }

  async uploadAttachment(
    transactionId: string,
    file: File,
  ): Promise<{
    id: string
    name: string
    url: string
    type: string
  }> {
    const formData = new FormData()
    formData.append("file", file)

    const response = await apiClient.post(`/finance/transactions/${transactionId}/attachments`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  }

  async deleteAttachment(transactionId: string, attachmentId: string): Promise<void> {
    await apiClient.delete(`/finance/transactions/${transactionId}/attachments/${attachmentId}`)
  }

  async getFinancialReport(startDate: string, endDate: string): Promise<FinancialReport> {
    const response = await apiClient.get("/finance/reports", {
      params: { startDate, endDate },
    })
    return response.data
  }

  async exportTransactions(params: {
    format: "csv" | "excel" | "pdf"
    startDate?: string
    endDate?: string
    type?: "income" | "expense"
    category?: string
  }): Promise<Blob> {
    const response = await apiClient.get("/finance/transactions/export", {
      params,
      responseType: "blob",
    })
    return response.data
  }

  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get("/finance/categories")
    return response.data
  }

  async createCategory(data: {
    name: string
    type: "income" | "expense"
    subcategories?: string[]
    color: string
    icon: string
  }): Promise<Category> {
    const response = await apiClient.post("/finance/categories", data)
    return response.data
  }

  async updateCategory(
    id: string,
    data: Partial<{
      name: string
      subcategories: string[]
      color: string
      icon: string
    }>,
  ): Promise<Category> {
    const response = await apiClient.put(`/finance/categories/${id}`, data)
    return response.data
  }

  async deleteCategory(id: string): Promise<void> {
    await apiClient.delete(`/finance/categories/${id}`)
  }

  async getDashboardStats(): Promise<{
    thisMonth: {
      income: number
      expenses: number
      profit: number
    }
    lastMonth: {
      income: number
      expenses: number
      profit: number
    }
    growth: {
      income: number
      expenses: number
      profit: number
    }
    recentTransactions: Transaction[]
  }> {
    const response = await apiClient.get("/finance/dashboard")
    return response.data
  }

  async importTransactions(file: File): Promise<{
    success: number
    errors: Array<{ row: number; error: string }>
  }> {
    const formData = new FormData()
    formData.append("file", file)

    const response = await apiClient.post("/finance/transactions/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  }
}

export const financeService = new FinanceService()
