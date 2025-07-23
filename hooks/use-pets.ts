"use client"

import { useState, useEffect } from "react"
import {
  petService,
  type Pet,
  type CreatePetRequest,
  type UpdatePetRequest,
  type PetFilters,
} from "@/services/pet.service"
import { toast } from "@/hooks/use-toast"

export function usePets(filters?: PetFilters) {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPets = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await petService.getPets(filters)
      setPets(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao carregar pets"
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

  useEffect(() => {
    fetchPets()
  }, [JSON.stringify(filters)])

  const createPet = async (data: CreatePetRequest): Promise<Pet | null> => {
    try {
      const newPet = await petService.createPet(data)
      setPets((prev) => [...prev, newPet])
      toast({
        title: "Sucesso",
        description: "Pet cadastrado com sucesso!",
      })
      return newPet
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao cadastrar pet"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      return null
    }
  }

  const updatePet = async (id: string, data: UpdatePetRequest): Promise<Pet | null> => {
    try {
      const updatedPet = await petService.updatePet(id, data)
      setPets((prev) => prev.map((pet) => (pet.id === id ? updatedPet : pet)))
      toast({
        title: "Sucesso",
        description: "Pet atualizado com sucesso!",
      })
      return updatedPet
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao atualizar pet"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      return null
    }
  }

  const deletePet = async (id: string): Promise<boolean> => {
    try {
      await petService.deletePet(id)
      setPets((prev) => prev.filter((pet) => pet.id !== id))
      toast({
        title: "Sucesso",
        description: "Pet removido com sucesso!",
      })
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao remover pet"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      return false
    }
  }

  const refreshPets = () => {
    fetchPets()
  }

  return {
    pets,
    loading,
    error,
    createPet,
    updatePet,
    deletePet,
    refreshPets,
  }
}

export function usePet(id: string) {
  const [pet, setPet] = useState<Pet | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPet = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await petService.getPet(id)
      setPet(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao carregar pet"
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

  useEffect(() => {
    if (id) {
      fetchPet()
    }
  }, [id])

  const updatePet = async (data: UpdatePetRequest): Promise<Pet | null> => {
    if (!pet) return null

    try {
      const updatedPet = await petService.updatePet(pet.id, data)
      setPet(updatedPet)
      toast({
        title: "Sucesso",
        description: "Pet atualizado com sucesso!",
      })
      return updatedPet
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao atualizar pet"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      return null
    }
  }

  const refreshPet = () => {
    if (id) {
      fetchPet()
    }
  }

  return {
    pet,
    loading,
    error,
    updatePet,
    refreshPet,
  }
}
