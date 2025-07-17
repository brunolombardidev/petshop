"use client"

import { useState, useEffect } from "react"
import type { Pet } from "@/types/api"
import { PetService } from "@/services/pet.service"
import { toast } from "@/hooks/use-toast"

export function usePets(ownerId?: string) {
  const [pets, setPets] = useState<Pet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  const fetchPets = async (page = 1, limit = 10) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await PetService.getPets({
        page,
        limit,
        ownerId,
      })

      setPets(response.data)
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        totalPages: response.totalPages,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao carregar pets"
      setError(errorMessage)
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const createPet = async (petData: Omit<Pet, "id" | "createdAt" | "updatedAt">) => {
    try {
      const newPet = await PetService.createPet(petData)
      setPets((prev) => [newPet, ...prev])

      toast({
        title: "Pet cadastrado com sucesso!",
        description: `${newPet.name} foi adicionado à sua lista de pets.`,
      })

      return newPet
    } catch (error) {
      console.error("Create pet error:", error)
      throw error
    }
  }

  const updatePet = async (id: string, petData: Partial<Pet>) => {
    try {
      const updatedPet = await PetService.updatePet(id, petData)
      setPets((prev) => prev.map((pet) => (pet.id === id ? updatedPet : pet)))

      toast({
        title: "Pet atualizado com sucesso!",
        description: `As informações de ${updatedPet.name} foram atualizadas.`,
      })

      return updatedPet
    } catch (error) {
      console.error("Update pet error:", error)
      throw error
    }
  }

  const deletePet = async (id: string) => {
    try {
      await PetService.deletePet(id)
      setPets((prev) => prev.filter((pet) => pet.id !== id))

      toast({
        title: "Pet removido com sucesso!",
        description: "O pet foi removido da sua lista.",
      })
    } catch (error) {
      console.error("Delete pet error:", error)
      throw error
    }
  }

  useEffect(() => {
    fetchPets()
  }, [ownerId])

  return {
    pets,
    isLoading,
    error,
    pagination,
    fetchPets,
    createPet,
    updatePet,
    deletePet,
    refetch: () => fetchPets(pagination.page, pagination.limit),
  }
}

export function usePet(id: string) {
  const [pet, setPet] = useState<Pet | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPet = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const petData = await PetService.getPetById(id)
      setPet(petData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao carregar pet"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchPet()
    }
  }, [id])

  return {
    pet,
    isLoading,
    error,
    refetch: fetchPet,
  }
}
