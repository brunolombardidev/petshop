"use client"

import { useState, useEffect } from "react"
import {
  SubscriptionService,
  type Plan,
  type Subscription,
  type Invoice,
  type SubscriptionStats,
} from "@/services/subscription.service"
import { toast } from "@/hooks/use-toast"

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubscription = async () => {
    try {
      setLoading(true)
      const data = await SubscriptionService.getMySubscription()
      setSubscription(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar assinatura")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscription()
  }, [])

  const changePlan = async (newPlanId: string) => {
    if (!subscription) return

    try {
      const updatedSubscription = await SubscriptionService.changePlan(subscription.id, newPlanId)
      setSubscription(updatedSubscription)
      toast({
        title: "Plano alterado com sucesso!",
        description: "Seu plano foi atualizado.",
      })
      return updatedSubscription
    } catch (error) {
      toast({
        title: "Erro ao alterar plano",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde",
        variant: "destructive",
      })
      throw error
    }
  }

  const cancelSubscription = async () => {
    if (!subscription) return

    try {
      const cancelledSubscription = await SubscriptionService.cancelSubscription(subscription.id)
      setSubscription(cancelledSubscription)
      toast({
        title: "Assinatura cancelada",
        description: "Sua assinatura foi cancelada com sucesso.",
      })
      return cancelledSubscription
    } catch (error) {
      toast({
        title: "Erro ao cancelar assinatura",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde",
        variant: "destructive",
      })
      throw error
    }
  }

  const reactivateSubscription = async () => {
    if (!subscription) return

    try {
      const reactivatedSubscription = await SubscriptionService.reactivateSubscription(subscription.id)
      setSubscription(reactivatedSubscription)
      toast({
        title: "Assinatura reativada",
        description: "Sua assinatura foi reativada com sucesso.",
      })
      return reactivatedSubscription
    } catch (error) {
      toast({
        title: "Erro ao reativar assinatura",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde",
        variant: "destructive",
      })
      throw error
    }
  }

  const createSubscription = async (planId: string) => {
    try {
      const newSubscription = await SubscriptionService.createSubscription(planId)
      setSubscription(newSubscription)
      toast({
        title: "Assinatura criada!",
        description: "Sua assinatura foi criada com sucesso.",
      })
      return newSubscription
    } catch (error) {
      toast({
        title: "Erro ao criar assinatura",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde",
        variant: "destructive",
      })
      throw error
    }
  }

  return {
    subscription,
    loading,
    error,
    refetch: fetchSubscription,
    changePlan,
    cancelSubscription,
    reactivateSubscription,
    createSubscription,
  }
}

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPlans = async () => {
    try {
      setLoading(true)
      const data = await SubscriptionService.getPlans()
      setPlans(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar planos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  const createPlan = async (planData: Omit<Plan, "id" | "createdAt" | "updatedAt">) => {
    try {
      const newPlan = await SubscriptionService.createPlan(planData)
      setPlans((prev) => [...prev, newPlan])
      toast({
        title: "Plano criado!",
        description: "O plano foi criado com sucesso.",
      })
      return newPlan
    } catch (error) {
      toast({
        title: "Erro ao criar plano",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde",
        variant: "destructive",
      })
      throw error
    }
  }

  const updatePlan = async (id: string, planData: Partial<Plan>) => {
    try {
      const updatedPlan = await SubscriptionService.updatePlan(id, planData)
      setPlans((prev) => prev.map((plan) => (plan.id === id ? updatedPlan : plan)))
      toast({
        title: "Plano atualizado!",
        description: "O plano foi atualizado com sucesso.",
      })
      return updatedPlan
    } catch (error) {
      toast({
        title: "Erro ao atualizar plano",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde",
        variant: "destructive",
      })
      throw error
    }
  }

  const deletePlan = async (id: string) => {
    try {
      await SubscriptionService.deletePlan(id)
      setPlans((prev) => prev.filter((plan) => plan.id !== id))
      toast({
        title: "Plano excluído!",
        description: "O plano foi excluído com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro ao excluir plano",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde",
        variant: "destructive",
      })
      throw error
    }
  }

  const togglePlanStatus = async (id: string) => {
    try {
      const updatedPlan = await SubscriptionService.togglePlanStatus(id)
      setPlans((prev) => prev.map((plan) => (plan.id === id ? updatedPlan : plan)))
      toast({
        title: "Status alterado!",
        description: `Plano ${updatedPlan.isActive ? "ativado" : "desativado"} com sucesso.`,
      })
      return updatedPlan
    } catch (error) {
      toast({
        title: "Erro ao alterar status",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde",
        variant: "destructive",
      })
      throw error
    }
  }

  return {
    plans,
    loading,
    error,
    refetch: fetchPlans,
    createPlan,
    updatePlan,
    deletePlan,
    togglePlanStatus,
  }
}

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  const fetchInvoices = async (params?: { page?: number; limit?: number; status?: string }) => {
    try {
      setLoading(true)
      const data = await SubscriptionService.getMyInvoices(params)
      setInvoices(data.data)
      setPagination({
        page: data.page,
        limit: data.limit,
        total: data.total,
        totalPages: data.totalPages,
      })
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar faturas")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInvoices()
  }, [])

  const downloadInvoice = async (invoiceId: string, fileName?: string) => {
    try {
      const blob = await SubscriptionService.downloadInvoice(invoiceId)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = fileName || `fatura-${invoiceId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Download iniciado!",
        description: "A fatura está sendo baixada.",
      })
    } catch (error) {
      toast({
        title: "Erro ao baixar fatura",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde",
        variant: "destructive",
      })
    }
  }

  return {
    invoices,
    loading,
    error,
    pagination,
    refetch: fetchInvoices,
    downloadInvoice,
  }
}

export function useSubscriptionStats() {
  const [stats, setStats] = useState<SubscriptionStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      const data = await SubscriptionService.getSubscriptionStats()
      setStats(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar estatísticas")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  }
}
