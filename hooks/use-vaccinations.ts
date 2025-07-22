"use client"

import { useState, useEffect } from "react"
import { toast } from "@/hooks/use-toast"

export interface Vaccination {
  id: string
  petId: string
  vaccineName: string
  date: string
  nextDueDate?: string
  veterinarian?: string
  clinic?: string
  batchNumber?: string
  notes?: string
  cost?: number
  isRequired: boolean
  status: "completed" | "overdue" | "upcoming"
  createdAt: string
  updatedAt: string
}

export interface CreateVaccinationRequest {
  petId: string
  vaccineName: string
  date: string
  nextDueDate?: string
  veterinarian?: string
  clinic?: string
  batchNumber?: string
  notes?: string
  cost?: number
  isRequired?: boolean
}

export function useVaccinations(petId?: string) {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVaccinations = async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulação de dados - substituir pela chamada real da API
      const mockVaccinations: Vaccination[] = [
        {
          id: "1",
          petId: petId || "1",
          vaccineName: "V10 (Múltipla)",
          date: "2024-01-10",
          nextDueDate: "2025-01-10",
          veterinarian: "Dr. João Silva",
          clinic: "Clínica Veterinária Central",
          batchNumber: "VAC2024001",
          notes: "Primeira dose da vacina múltipla",
          cost: 120.0,
          isRequired: true,
          status: "completed",
          createdAt: "2024-01-10T10:00:00Z",
          updatedAt: "2024-01-10T10:00:00Z",
        },
        {
          id: "2",
          petId: petId || "1",
          vaccineName: "Antirrábica",
          date: "2023-12-15",
          nextDueDate: "2024-12-15",
          veterinarian: "Dra. Maria Santos",
          clinic: "Clínica Veterinária Central",
          batchNumber: "RAB2023045",
          notes: "Vacina antirrábica anual",
          cost: 80.0,
          isRequired: true,
          status: "upcoming",
          createdAt: "2023-12-15T14:30:00Z",
          updatedAt: "2023-12-15T14:30:00Z",
        },
        {
          id: "3",
          petId: petId || "1",
          vaccineName: "Gripe Canina",
          date: "2023-11-20",
          nextDueDate: "2024-11-20",
          veterinarian: "Dr. João Silva",
          clinic: "Clínica Veterinária Central",
          batchNumber: "GRP2023012",
          notes: "Vacina contra gripe canina",
          cost: 90.0,
          isRequired: false,
          status: "upcoming",
          createdAt: "2023-11-20T09:15:00Z",
          updatedAt: "2023-11-20T09:15:00Z",
        },
      ]

      // Filtrar por petId se fornecido
      const filteredVaccinations = petId
        ? mockVaccinations.filter((vaccination) => vaccination.petId === petId)
        : mockVaccinations

      // Atualizar status baseado na data
      const updatedVaccinations = filteredVaccinations.map((vaccination) => {
        if (vaccination.nextDueDate) {
          const today = new Date()
          const dueDate = new Date(vaccination.nextDueDate)
          const daysDiff = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24))

          let status: Vaccination["status"] = "completed"
          if (daysDiff < 0) {
            status = "overdue"
          } else if (daysDiff <= 30) {
            status = "upcoming"
          }

          return { ...vaccination, status }
        }
        return vaccination
      })

      setVaccinations(updatedVaccinations)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao carregar vacinações"
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

  const createVaccination = async (data: CreateVaccinationRequest) => {
    try {
      // Simulação - substituir pela chamada real da API
      const newVaccination: Vaccination = {
        id: Date.now().toString(),
        ...data,
        isRequired: data.isRequired ?? false,
        status: "completed",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setVaccinations((prev) => [newVaccination, ...prev])

      toast({
        title: "Sucesso",
        description: "Vacinação registrada com sucesso!",
      })

      return newVaccination
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao registrar vacinação"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw error
    }
  }

  const updateVaccination = async (id: string, data: Partial<Vaccination>) => {
    try {
      setVaccinations((prev) =>
        prev.map((vaccination) =>
          vaccination.id === id ? { ...vaccination, ...data, updatedAt: new Date().toISOString() } : vaccination,
        ),
      )

      toast({
        title: "Sucesso",
        description: "Vacinação atualizada com sucesso!",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar vacinação"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw error
    }
  }

  const deleteVaccination = async (id: string) => {
    try {
      setVaccinations((prev) => prev.filter((vaccination) => vaccination.id !== id))

      toast({
        title: "Sucesso",
        description: "Vacinação removida com sucesso!",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao remover vacinação"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw error
    }
  }

  const getVaccinationsByStatus = (status: Vaccination["status"]) => {
    return vaccinations.filter((vaccination) => vaccination.status === status)
  }

  const getRequiredVaccinations = () => {
    return vaccinations.filter((vaccination) => vaccination.isRequired)
  }

  const getUpcomingVaccinations = (days = 30) => {
    const today = new Date()
    const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000)

    return vaccinations.filter((vaccination) => {
      if (!vaccination.nextDueDate) return false
      const dueDate = new Date(vaccination.nextDueDate)
      return dueDate >= today && dueDate <= futureDate
    })
  }

  const getOverdueVaccinations = () => {
    return vaccinations.filter((vaccination) => vaccination.status === "overdue")
  }

  useEffect(() => {
    fetchVaccinations()
  }, [petId])

  return {
    vaccinations,
    loading,
    error,
    refetch: fetchVaccinations,
    createVaccination,
    updateVaccination,
    deleteVaccination,
    getVaccinationsByStatus,
    getRequiredVaccinations,
    getUpcomingVaccinations,
    getOverdueVaccinations,
  }
}
