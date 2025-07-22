"use client"

import { useState, useEffect } from "react"
import { toast } from "@/hooks/use-toast"

export interface Campaign {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  budget: number
  status: "draft" | "active" | "paused" | "completed"
  targetAudience: string
  metrics?: {
    impressions: number
    clicks: number
    conversions: number
    cost: number
  }
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface CreateCampaignRequest {
  title: string
  description: string
  startDate: string
  endDate: string
  budget: number
  targetAudience: string
}

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulação de dados - substituir pela chamada real da API
      const mockCampaigns: Campaign[] = [
        {
          id: "1",
          title: "Campanha de Vacinação",
          description: "Promoção especial para vacinação de pets",
          startDate: "2024-01-15",
          endDate: "2024-02-15",
          budget: 5000,
          status: "active",
          targetAudience: "Donos de pets",
          metrics: {
            impressions: 12500,
            clicks: 850,
            conversions: 45,
            cost: 2300,
          },
          createdBy: "admin",
          createdAt: "2024-01-10T10:00:00Z",
          updatedAt: "2024-01-15T14:30:00Z",
        },
        {
          id: "2",
          title: "Black Friday Pet",
          description: "Descontos especiais em produtos para pets",
          startDate: "2024-11-24",
          endDate: "2024-11-30",
          budget: 10000,
          status: "completed",
          targetAudience: "Todos os clientes",
          metrics: {
            impressions: 25000,
            clicks: 1200,
            conversions: 89,
            cost: 8500,
          },
          createdBy: "admin",
          createdAt: "2024-11-01T09:00:00Z",
          updatedAt: "2024-12-01T16:00:00Z",
        },
      ]

      setCampaigns(mockCampaigns)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao carregar campanhas"
      setError(errorMessage)
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createCampaign = async (data: CreateCampaignRequest) => {
    try {
      // Simulação - substituir pela chamada real da API
      const newCampaign: Campaign = {
        id: Date.now().toString(),
        ...data,
        status: "draft",
        createdBy: "current-user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setCampaigns((prev) => [newCampaign, ...prev])

      toast({
        title: "Sucesso",
        description: "Campanha criada com sucesso!",
      })

      return newCampaign
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao criar campanha"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw error
    }
  }

  const updateCampaign = async (id: string, data: Partial<Campaign>) => {
    try {
      setCampaigns((prev) =>
        prev.map((campaign) =>
          campaign.id === id ? { ...campaign, ...data, updatedAt: new Date().toISOString() } : campaign,
        ),
      )

      toast({
        title: "Sucesso",
        description: "Campanha atualizada com sucesso!",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar campanha"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw error
    }
  }

  const deleteCampaign = async (id: string) => {
    try {
      setCampaigns((prev) => prev.filter((campaign) => campaign.id !== id))

      toast({
        title: "Sucesso",
        description: "Campanha excluída com sucesso!",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao excluir campanha"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw error
    }
  }

  const pauseCampaign = async (id: string) => {
    await updateCampaign(id, { status: "paused" })
  }

  const resumeCampaign = async (id: string) => {
    await updateCampaign(id, { status: "active" })
  }

  const completeCampaign = async (id: string) => {
    await updateCampaign(id, { status: "completed" })
  }

  useEffect(() => {
    fetchCampaigns()
  }, [])

  return {
    campaigns,
    loading,
    error,
    refetch: fetchCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    pauseCampaign,
    resumeCampaign,
    completeCampaign,
  }
}
