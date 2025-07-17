"use client"

import { useState, useEffect } from "react"
import { campaignService, type Campaign, type CreateCampaignRequest } from "@/services/campaign.service"
import { toast } from "@/hooks/use-toast"

interface UseCampaignsParams {
  search?: string
  categoria?: string
  status?: string
  autoFetch?: boolean
}

export function useCampaigns(params: UseCampaignsParams = {}) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalRaised: 0,
    totalGoal: 0,
  })

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await campaignService.getCampaigns({
        search: params.search,
        categoria: params.categoria,
        status: params.status,
      })

      setCampaigns(response.data)
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

  const fetchStats = async () => {
    try {
      const response = await campaignService.getCampaignStats()
      setStats(response.data)
    } catch (err) {
      console.error("Erro ao carregar estatísticas:", err)
    }
  }

  const createCampaign = async (data: CreateCampaignRequest) => {
    try {
      setLoading(true)
      const response = await campaignService.createCampaign(data)

      setCampaigns((prev) => [response.data, ...prev])

      toast({
        title: "Sucesso",
        description: "Campanha criada com sucesso!",
      })

      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao criar campanha"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateCampaign = async (id: string, data: Partial<CreateCampaignRequest>) => {
    try {
      setLoading(true)
      const response = await campaignService.updateCampaign({ id, ...data })

      setCampaigns((prev) => prev.map((campaign) => (campaign.id === id ? response.data : campaign)))

      toast({
        title: "Sucesso",
        description: "Campanha atualizada com sucesso!",
      })

      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao atualizar campanha"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteCampaign = async (id: string) => {
    try {
      setLoading(true)
      await campaignService.deleteCampaign(id)

      setCampaigns((prev) => prev.filter((campaign) => campaign.id !== id))

      toast({
        title: "Sucesso",
        description: "Campanha excluída com sucesso!",
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao excluir campanha"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw err
    } finally {
      setLoading(false)
    }
  }

  const donateToCampaign = async (campaignId: string, amount: number) => {
    try {
      setLoading(true)
      await campaignService.donateToCampaign(campaignId, amount)

      // Atualizar a campanha com o novo valor arrecadado
      setCampaigns((prev) =>
        prev.map((campaign) =>
          campaign.id === campaignId ? { ...campaign, arrecadado: campaign.arrecadado + amount } : campaign,
        ),
      )

      toast({
        title: "Sucesso",
        description: "Doação realizada com sucesso!",
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao realizar doação"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.autoFetch !== false) {
      fetchCampaigns()
      fetchStats()
    }
  }, [params.search, params.categoria, params.status])

  return {
    campaigns,
    loading,
    error,
    stats,
    fetchCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    donateToCampaign,
    refetch: fetchCampaigns,
  }
}
