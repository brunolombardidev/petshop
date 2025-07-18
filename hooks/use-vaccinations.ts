"use client"

import { useState, useEffect } from "react"
import { vaccinationService, type Vaccination, type CreateVaccinationRequest } from "@/services/vaccination.service"
import { toast } from "@/hooks/use-toast"

export function useVaccinations(petId?: string) {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadVaccinations = async (params?: { vacina?: string; dateFrom?: string; dateTo?: string }) => {
    try {
      setLoading(true)
      setError(null)
      const response = await vaccinationService.getVaccinations({
        petId,
        ...params,
      })
      setVaccinations(response.data)
    } catch (err) {
      setError("Erro ao carregar vacinas")
      console.error("Erro ao carregar vacinas:", err)
    } finally {
      setLoading(false)
    }
  }

  const createVaccination = async (data: CreateVaccinationRequest) => {
    try {
      setLoading(true)
      const response = await vaccinationService.createVaccination(data)
      setVaccinations((prev) => [response.data, ...prev])
      toast({
        title: "Sucesso!",
        description: "Vacina registrada com sucesso.",
      })
      return response.data
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao registrar vacina. Tente novamente.",
        variant: "destructive",
      })
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteVaccination = async (id: string) => {
    try {
      setLoading(true)
      await vaccinationService.deleteVaccination(id)
      setVaccinations((prev) => prev.filter((vaccination) => vaccination.id !== id))
      toast({
        title: "Sucesso!",
        description: "Vacina excluída com sucesso.",
      })
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao excluir vacina. Tente novamente.",
        variant: "destructive",
      })
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadVaccinations()
  }, [petId])

  return {
    vaccinations,
    loading,
    error,
    loadVaccinations,
    createVaccination,
    deleteVaccination,
  }
}
