import { apiClient } from "@/lib/api-client"

export interface Subscription {
  id: string
  userId: string
  planId: string
  plan: {
    id: string
    name: string
    price: number
    features: string[]
    billingCycle: "monthly" | "yearly"
  }
  status: "active" | "cancelled" | "expired" | "pending"
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  createdAt: string
  updatedAt: string
}

export interface Plan {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  features: string[]
  billingCycle: "monthly" | "yearly"
  isPopular: boolean
  isActive: boolean
}

export interface Invoice {
  id: string
  subscriptionId: string
  amount: number
  status: "pending" | "paid" | "failed" | "cancelled"
  dueDate: string
  paidAt?: string
  paymentMethod?: string
  downloadUrl?: string
  createdAt: string
}

export interface PaymentMethod {
  id: string
  type: "credit_card" | "debit_card" | "pix" | "boleto"
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

class SubscriptionService {
  async getSubscription(): Promise<Subscription | null> {
    try {
      const response = await apiClient.get("/subscription")
      return response.data
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null
      }
      throw error
    }
  }

  async getPlans(): Promise<Plan[]> {
    const response = await apiClient.get("/plans")
    return response.data
  }

  async subscribeToPlan(planId: string, paymentMethodId?: string): Promise<Subscription> {
    const response = await apiClient.post("/subscription", {
      planId,
      paymentMethodId,
    })
    return response.data
  }

  async changePlan(planId: string): Promise<Subscription> {
    const response = await apiClient.put("/subscription/plan", { planId })
    return response.data
  }

  async cancelSubscription(cancelAtPeriodEnd = true): Promise<Subscription> {
    const response = await apiClient.delete("/subscription", {
      data: { cancelAtPeriodEnd },
    })
    return response.data
  }

  async reactivateSubscription(): Promise<Subscription> {
    const response = await apiClient.post("/subscription/reactivate")
    return response.data
  }

  async getInvoices(): Promise<Invoice[]> {
    const response = await apiClient.get("/subscription/invoices")
    return response.data
  }

  async getInvoiceById(id: string): Promise<Invoice> {
    const response = await apiClient.get(`/subscription/invoices/${id}`)
    return response.data
  }

  async downloadInvoice(id: string): Promise<void> {
    const response = await apiClient.get(`/subscription/invoices/${id}/download`, {
      responseType: "blob",
    })

    const blob = new Blob([response.data], { type: "application/pdf" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `invoice-${id}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const response = await apiClient.get("/payment-methods")
    return response.data
  }

  async addPaymentMethod(data: {
    type: "credit_card" | "debit_card"
    cardNumber: string
    expiryMonth: number
    expiryYear: number
    cvv: string
    holderName: string
  }): Promise<PaymentMethod> {
    const response = await apiClient.post("/payment-methods", data)
    return response.data
  }

  async deletePaymentMethod(id: string): Promise<void> {
    await apiClient.delete(`/payment-methods/${id}`)
  }

  async setDefaultPaymentMethod(id: string): Promise<PaymentMethod> {
    const response = await apiClient.patch(`/payment-methods/${id}/set-default`)
    return response.data
  }

  async validateCoupon(code: string): Promise<{
    valid: boolean
    discount: number
    type: "percentage" | "fixed"
    description?: string
  }> {
    const response = await apiClient.post("/coupons/validate", { code })
    return response.data
  }

  async applyCoupon(code: string): Promise<Subscription> {
    const response = await apiClient.post("/subscription/apply-coupon", { code })
    return response.data
  }
}

export const subscriptionService = new SubscriptionService()
